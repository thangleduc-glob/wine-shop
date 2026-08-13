# Evidence reported by thang.leduc@globant.com
# Wine Shop — A Spec-Driven Development Demo with Spec Kit


This repository is a demo project built to demonstrate spec-driven development using speckit and iterative AI collaboration. It intentionally showcases decisions, trade-offs, and a repeatable workflow rather than being a production system.

> Important: this is a demo project used to demonstrate process and capability. It is not production-ready.

## What this demo contains
- Email/password auth flow (Supabase-backed) and a products listing at `/supabase`.
- Supabase schema, migration and seed SQL in `supabase/` (supabase.md, migrations/, seed/). Database changes were applied to the demo Supabase project using the Supabase MCP server to run migrations and seed data.
- Frontend pages and components in `web/src/` (product UI, ProductCard, SupabaseProductsPage).
- Playwright E2E test for the products page: `web/tests/e2e/products.spec.ts`.

## Key themes demonstrated
- Interaction — Structured iterative AI collaboration
  - Work was driven by speckit specs, clarify/plan/tasks/implement cycles. Each change was proposed, reviewed, and refined across small, verifiable commits and tasks.

- Evaluation — Explicit assessment and validation of outputs
  - Tests (Playwright) verify the product listing loads, renders thumbnails, and shows a Buy button. Playwright is the test gate: features are accepted when Playwright E2E tests pass in the demo/CI pipeline. Migrations and seed SQL allow quick validation of DB state. `supabase/supabase.md` documents acceptance criteria.

- Refinement — Meaningful improvement over AI generations
  - UI and behavior were iteratively improved: product card polish, deterministic randomized thumbnails (picsum), responsive grid, and accessibility tweaks applied after reviews.

- Operationalization — AI embedded into repeatable workflows
  - Tasks and artifacts (specs/, plan.md, tasks.md) describe an executable workflow. Migrations + seed scripts and Playwright tests make the flow repeatable for demos or CI.

- Judgment — Intentional tradeoffs and governance decisions
  - Public anonymous SELECT is used for simplicity and demo speed; this is documented in `supabase/supabase.md` with security notes and recommended alternatives (proxy or authenticated endpoints) for production.

## How a feature is implemented (step-by-step)
This section documents the standard flow used in this project when building a feature — it shows the governance and practical steps used during the demo work.

1. Constitution (governance)
   - Start with the repository constitution and guidelines (in `.specify` / `specs/` or `supabase/supabase.md`). The constitution defines what belongs in a PR (migrations + docs together), security guardrails (RLS rules), and review expectations.

2. Create the specification (spec.md)
   - Write a concise feature spec describing user intent, acceptance criteria, routes, API contracts, and UX expectations. Specs live under `specs/` and are the single source of truth for the feature.

3. Clarify (speckit-clarify)
   - Run targeted clarification questions to resolve ambiguities (e.g., public vs authenticated reads, thumbnails vs stored images). Capture answers in the spec and update constraints.

4. Plan (plan.md)
   - Produce an implementation plan with phases, architecture notes, and quickstart steps. The plan identifies required infra changes (migrations), client code, and tests.

5. Task breakdown (tasks.md)
   - Convert the plan into small, verifiable tasks (T001..TNN). Tasks include file paths, acceptance checks, and explicit dependencies. Tasks are intentionally small to allow iterative commits and rollbacks.

6. Implement (speckit-implement)
   - Execute tasks in order. For database changes, add migrations under `supabase/migrations/` and corresponding docs in `supabase/supabase.md`.
   - For frontend changes, create small components/pages and tests. Commit frequently with clear messages tied to task IDs.

7. Evaluate & validate
   - Run Playwright and unit tests, validate migrations by seeding and querying the DB, and manually inspect pages. Capture test assertions in the spec's acceptance criteria.

8. Refine
   - Based on test failures, UX review, or code review feedback, iterate on the implementation (small PRs). UI polish (product cards, responsive grid) is a typical refinement step.

9. Operationalize
   - Add scripts, seed data, and CI-friendly tests so reviewers or demo runs can reproduce results quickly. Document quickstart steps in `quickstart.md` or README.

10. Governance & judgment calls
   - When tradeoffs are needed (e.g., enabling public SELECT for demo speed), document the decision, risk, and recommended mitigation in `supabase/supabase.md`. These intentional tradeoffs are surfaced to reviewers and can be reverted before production.

### Example: Authentication troubleshooting
During implementation, auth may fail in ways that block other tasks (E2E flakiness, missing keys, or redirect loops). Typical remediation steps used in this project:
- Reproduce locally with the same env and minimal repro (inspect network calls and JWTs).
- Add temporary debug logs and tight acceptance checks in tests to surface the exact failure point.
- If using Supabase, inspect policies and ensure anon key has appropriate permissions for the demo flow.
- Iterate: fix policy or client config, re-run seed/migrations if necessary, and rerun tests.
- Document the fix and permanent remediation in `supabase/supabase.md` and the related task so reviewers understand context.

## Step-by-step when I implemented a feature (example: Authentication)
Below is the concrete sequence followed when implementing the authentication feature, from governance to delivery. Each step shows what was done, the commands used, and the primary files created or updated.

1) Constitution (governance)
- What: Read repository constitution to decide PR composition, security gates, and reviewer expectations.
- Commands: (read) `cat .specify/memory/constitution.md` (or open in editor)
- Files/refs: `.specify/memory/constitution.md`, `specs/002-user-auth/spec.md` (notes)

2) Specification
- What: Drafted a spec with user journeys, acceptance criteria, and redirects.
- Commands: `/speckit-specify` (or create `specs/002-user-auth/spec.md` manually)
- Files: `specs/002-user-auth/spec.md`

3) Clarify
- What: Asked focused questions to resolve ambiguities (email verification, public vs private reads).
- Commands: `/speckit-clarify`
- Files: updates to `specs/002-user-auth/spec.md` (answers recorded)

4) Plan
- What: Produced an implementation plan (phases, infra needs, quickstart steps).
- Commands: `/speckit-plan`
- Files: `specs/002-user-auth/plan.md`, `specs/002-user-auth/tasks.md`

5) Task breakdown
- What: Broke the plan into small, verifiable tasks (T001..T00N) with clear acceptance checks.
- Commands: `/speckit-tasks`
- Files: `specs/002-user-auth/tasks.md`

6) Implement — DB & infra
- What: Author migrations, RLS policy notes, and apply them to the demo project.
- Commands: create `supabase/migrations/<timestamp>_create_auth_tables.sql` then apply using the Supabase MCP server or locally with `supabase db push` / `psql -f supabase/migrations/...`.
- Files: `supabase/migrations/*`, `supabase/supabase.md` (policy & migration notes)

7) Implement — Client & UI
- What: Implement Supabase client, auth forms/pages, and header session state.
- Commands: `/speckit-implement` to run tasks, git commits (`git add/commit/push`)
- Files: `web/src/lib/supabaseClient.ts`, `web/src/components/AuthForm.tsx`, `web/src/pages/AuthPage.tsx`, `web/src/components/Header.tsx`

8) Tests (test gate)
- What: Write Playwright E2E tests that perform signup/login and assert post-login redirect/state.
- Commands: `npx playwright test web/tests/e2e/login.spec.ts`
- Files: `web/tests/e2e/login.spec.ts` (test), Playwright config

9) Diagnose & fix
- What: Debug failing tests or runtime issues (JWTs, redirect loops, missing keys). Add logs, fix policies/config, re-seed if needed.
- Commands/tools: browser devtools, Supabase Studio, re-run migration/seed via MCP or CLI
- Files updated: `supabase/supabase.md` (notes), `web/src/lib/supabaseClient.ts`, tests and task notes

10) Acceptance & delivery
- What: When Playwright tests and manual checks pass, prepare PR containing migrations, docs, code, and tests.
- Commands: `git tag` / PR creation via `gh` or GitHub UI
- Files in PR: migrations, `supabase/supabase.md`, modified frontend files, tests, specs/tasks for traceability

Notes
- Every change is tied to a task ID and small commit for traceability. Migrations and documentation are submitted together to make reviews straightforward.
- Playwright is the acceptance gate: the feature is considered implemented when E2E tests pass and the spec's acceptance criteria are satisfied.

Branching strategy
- Branch names follow the feature/task convention so agents and reviewers can immediately infer context. Use: `<TASK-ID>-short-slug` or `feature/<username>/<TASK-ID>-short-slug`.
  - Example: `012-products-list`.
- The branch name always includes the task ID and a brief slug; automated agents read the branch to understand the current task and scope during implementation and CI.

## Quickstart (local)
1. Ensure you have Node and supabase configured for the demo project (or set SUPABASE_URL/SUPABASE_ANON_KEY in `web/src/lib/supabaseClient.ts`).
2. Start app:
   - cd web
   - npm install
   - npm run dev
   - Open http://localhost:5173/products
3. Run E2E test (dev server must be running):
   - cd web
   - npx playwright test web/tests/e2e/products.spec.ts

## Where to look next
- Specs: `specs/003-supabase-products-list/`
- Schema & migration: `supabase/supabase.md`, `supabase/migrations/`
- Frontend: `web/src/pages/SupabaseProductsPage.tsx`, `web/src/components/products/ProductCard.tsx`
- Tests: `web/tests/e2e/products.spec.ts`

## Important note
This is a demo project intended to show the speckit-driven process and AI-assisted implementation. It is not production-ready — particularly the public-read RLS policy and use of a public anon key. See `supabase/supabase.md` for security recommendations.

If you want, a PR-ready checklist and a short demo script can be added to make this artifact easy to present to reviewers.
