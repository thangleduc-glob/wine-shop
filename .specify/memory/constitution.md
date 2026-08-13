<!--
Sync Impact Report
- Version change: 1.2.0 -> 2.0.0
- Modified principles: "Database Design & Migrations" redefined: /supabase/supabase.md is now the project's single Source-of-Truth for intended schema and RLS policy; migrations must implement the documented state
- Added sections: none
- Removed sections: none
- Follow-up TODOs: RATIFICATION_DATE (TODO)
-->

# wine-shop Constitution

## Core Principles

### Type Safety (NON-NEGOTIABLE)
All production code MUST be written in TypeScript with strict mode enabled. Public APIs, component props, and database interfaces MUST have explicit types. Use type-first design: prefer typed interfaces and domain models over ad-hoc any/unknown. Rationale: prevents regressions, improves tooling and refactor safety.

### Clean & Maintainable Architecture
Architecture MUST separate concerns into clear layers (UI, business logic, data access). Modules MUST have a single responsibility and be small enough to review. Rationale: reduces cognitive load and eases long-term maintenance.

### Component Reusability
UI components MUST be designed for reusability: accept typed props, avoid global state assumptions, document contracts, and expose minimal, testable surface area. Prefer composition over inheritance.

### Separation of UI, Business Logic, and Data Access
UI components MUST not contain business rules or raw SQL. Business logic belongs in services/hooks with no direct DOM or framework side-effects. Data access (Supabase queries) MUST be encapsulated behind a data layer with typed DTOs.

### Database Design & Migrations (DOCUMENTATION-FIRST)
- The file /supabase/supabase.md is the single Source-of-Truth for the project's intended database schema and authoritative RLS policies. It MUST be human-readable, version-controlled, and maintained with every schema change.
- Migrations are the system-of-record for applying changes to runtime databases, but they MUST implement the state declared in /supabase/supabase.md. In cases of conflict, the documentation in /supabase/supabase.md MUST be reconciled with the migration artifacts before merging.
- Developer/agent responsibilities when changing schema or RLS:
  1. Edit /supabase/supabase.md to describe the intended schema change and the exact RLS policy text (include rationale and migration reference placeholder).
  2. Generate or author versioned Supabase migrations that implement the documented state in /supabase/supabase.md.
  3. Include both the updated /supabase/supabase.md and the migration files in the same PR.
  4. Run advisors and local schema checks to ensure the migration results in the documented runtime schema.
- NEVER rely on manual edits in the Supabase dashboard as authoritative. Direct dashboard edits are still prohibited unless accompanied by an immediate migration and documentation update in the same PR; ad-hoc dashboard changes without repo artifacts are not allowed.
- Reviewers MUST ensure the supabase.md entry, migrations, and runtime checks are consistent before approving PRs. Discrepancies MUST be resolved in the PR discussion.
Rationale: Making /supabase/supabase.md the documentation-first source improves reviewer clarity, accelerates audits, and centralizes the project's intended schema policy. Requiring migrations to implement the documented state preserves deployability and audit trails.

### Authentication & Authorization
Use Supabase Auth for identity. Authorization rules MUST be enforced server-side (RLS policies) and mirrored in application checks. Least-privilege principle applies: PUBLIC roles only get read access where explicitly allowed.

### Data Validation
Inputs from users and external systems MUST be validated both client-side (for UX) and server-side (for security). Use shared validation schemas (e.g., Zod) to keep client and server aligned.

### Security
Follow secure defaults: avoid embedding secrets in code, use environment variables, enable RLS on sensitive tables, and run dependency vulnerability scans regularly. All network access to third-party services MUST use HTTPS.

### Testing (Quality Gates)
Automated tests MUST cover critical business flows: unit tests for logic, component tests for UI contract, and integration tests for Supabase interactions. CI MUST run tests and block merges on failures.

### Code Quality
Code reviews are mandatory for all production changes. Enforce linters, formatter, and commit message guidelines. Failing static checks in CI MUST block merges.

### Accessibility
All user-facing UI MUST meet WCAG 2.1 AA where practicable. Components MUST include semantic HTML, keyboard navigation, and accessible labels.

### Responsive Design
UI MUST be responsive and usable on common mobile and desktop breakpoints. Key flows (browsing, checkout) MUST be validated on mobile viewports.

## Technology Constraints
The project technology stack is: React, TypeScript, Supabase (Postgres + Auth). Libraries that duplicate core stack functionality MUST be justified in PRs. Prefers small, actively maintained dependencies.

## Project Overview
A concise project overview is maintained at ./project.md (root). This file is the canonical project overview and MUST be kept up to date to describe user flows, pages, and high-level roles. PRs that introduce or materially change features MUST update project.md to reflect those changes.

## Development Workflow
- Branching: feature/bugfix branches named with a clear ticket reference.
- Pull Requests: include description, testing notes, and migration effects. Reviewers MUST verify type coverage and RLS changes and confirm /supabase/supabase.md and migration files are present and consistent for DB changes.
- CI: run lint, typecheck, tests, and deploy previews for PRs.

## Governance
All governance changes require a documented amendment PR describing rationale, migration impact, and at least one approving maintainer.
Versioning policy: semantic versioning for the constitution document. BUMP rules: MAJOR for principle redefinitions, MINOR for adding principles or material expansions, PATCH for clarifications.
Compliance: PRs touching core architecture or security features MUST include a short compliance checklist referencing relevant principles.

**Version**: 2.0.0 | **Ratified**: TODO(RATIFICATION_DATE): provide adoption date | **Last Amended**: 2026-08-13
