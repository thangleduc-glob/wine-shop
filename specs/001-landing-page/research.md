# Research: Landing Page (Phase 0)

Date: 2026-08-13

## Decisions

- Frontend scaffold: Vite + React + TypeScript (fast dev server, small bundle, easy Playwright integration).
- E2E testing: Playwright is required by project policy; tests will run against the local dev server/preview environment.
- Data handling for v1: NO database or backend API will be used. The frontend will consume local JSON fixtures only (e.g., `web/src/mocks/landing.json`).
- Accessibility: Use Playwright's accessibility checks or axe-core in CI to validate critical a11y requirements.
- CI: CI must support starting the frontend dev server, running Playwright with headless browsers, and exposing ports for tests. Recommend GitHub Actions with a job that runs 'npm ci', 'npm run dev' (background), then 'npx playwright test'.

## Open Questions / Research Tasks

1. CI playbook for Playwright (broad): research GitHub Actions job templates for Vite + Playwright and recommended timeouts and service setup.
   - Task: "Research Playwright + Vite CI workflow (GitHub Actions) and provide example workflow file".

2. Mock data approach: decide between static JSON fixtures vs msw (mock service worker) for local dev and E2E; recommend static JSON for v1 to avoid runtime dependencies.
   - Task: "Recommend JSON fixture approach for v1 and document path and format".

3. Accessibility tooling: decide on a11y gate in CI (axe CLI vs Playwright accessibility checks).
   - Task: "Recommend specific a11y tool and sample check commands for inclusion in CI".

4. Port and dev server conventions: standardize dev port (default 5173 for Vite) and health-check endpoint for CI readiness.
   - Task: "Confirm dev server port (default 5173) and health-check path for CI readiness checks".

## Findings / Notes

- Vite provides a stable dev server with fast HMR and simple start scripts; Playwright integrates well with it.
- Using static JSON fixtures for the first iteration minimizes dependencies and keeps E2E deterministic.

## Outcome / Recommendation

- Implement initial scaffold with Vite + React + TypeScript and a fixtures-based mock for featured products located at `web/src/mocks/featured.json`.
- Do NOT introduce any database, API contracts, or Supabase migrations for this feature. Any future backend integration is explicitly out of scope for the landing page feature and will be planned separately.
- Add a Playwright CI job sample in `.github/workflows/playwright.yml` as part of implementation tasks.

