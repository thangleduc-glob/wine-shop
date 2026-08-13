<!--
Sync Impact Report
- Version change: 1.0.0 -> 1.2.0
- Modified principles: Expanded "Database Design & Migrations" to mandate keeping /supabase/supabase.md in sync with migrations and RLS changes; clarified role of migrations vs. supabase.md
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

### Database Design & Migrations (SOURCE OF TRUTH)
- Supabase migrations are the system-of-record for the runtime database schema. All schema changes that affect production MUST be implemented via versioned Supabase migrations checked into version control.
- The project MUST ALSO maintain a human-readable documentation file at /supabase/supabase.md that records, for every table, the intended public schema and the authoritative RLS policies.
- Whenever a table is created, edited, or deleted, or when RLS policies are added/changed/removed, the developer/agent MUST:
  1. Compare the migration or SQL change against /supabase/supabase.md to detect drift.
  2. Update /supabase/supabase.md to reflect the new schema and RLS policy text (include migration reference and date).
  3. Include the supabase.md update in the same PR as the migration so code review covers both the migration and its documentation.
- NEVER make schema or RLS changes solely through the Supabase dashboard without also authoring the corresponding migration and updating /supabase/supabase.md; direct dashboard edits are prohibited.
- Reviewers MUST verify that migrations, runtime behavior, and /supabase/supabase.md are consistent before approving PRs.
Rationale: Migrations are the auditable system-of-record, while /supabase/supabase.md is the project-maintained documentation-of-record for reviewers, auditors, and operational staff. Keeping both in sync prevents drift and reduces incident response time.

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

## Development Workflow
- Branching: feature/bugfix branches named with a clear ticket reference.
- Pull Requests: include description, testing notes, and migration effects. Reviewers MUST verify type coverage and RLS changes and confirm /supabase/supabase.md updates for DB changes.
- CI: run lint, typecheck, tests, and deploy previews for PRs.

## Governance
All governance changes require a documented amendment PR describing rationale, migration impact, and at least one approving maintainer.
Versioning policy: semantic versioning for the constitution document. BUMP rules: MAJOR for principle redefinitions, MINOR for adding principles or material expansions, PATCH for clarifications.
Compliance: PRs touching core architecture or security features MUST include a short compliance checklist referencing relevant principles.

**Version**: 1.2.0 | **Ratified**: TODO(RATIFICATION_DATE): provide adoption date | **Last Amended**: 2026-08-13
