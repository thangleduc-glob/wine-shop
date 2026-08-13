---
description: "Task list for the landing page feature (re-tasked to bootstrap a brand-new React app via Vite)"
---

# Tasks: Landing Page (001-landing-page)

**Input**: Design documents from `specs/001-landing-page/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md

## Phase 1: Setup (Bootstrap)

**Purpose**: Create a brand-new React + TypeScript app under `web/` using Vite (do not handcraft files).

- [X] T001 Bootstrap the app using Vite: run `npm create vite@latest web -- --template react-ts` (document exact command in `specs/001-landing-page/tasks.md`)
- [X] T002 [P] Install dependencies in `web/`: run `cd web && npm install` and add Playwright as devDependency (`npm i -D @playwright/test`)
- [X] T003 [P] Ensure TypeScript strict mode: set `compilerOptions.strict = true` in `web/tsconfig.json` (file: `web/tsconfig.json`)
- [X] T004 [P] Add linting and formatting: add ESLint config `.eslintrc.cjs` and Prettier `.prettierrc` (files: repo root and `web/` as needed)
- [X] T005 [P] Add .gitignore entries for `web/node_modules` and Playwright artifacts (file: `.gitignore`)

---

## Phase 2: Foundational (Configure runtime & tests)

**Purpose**: Configure app runtime, mocks, health-check, and E2E test runner.

- [X] T006 Create a minimal app entry for the landing page if Vite scaffold didn't include a clean route: verify `web/src/main.tsx` and `web/src/App.tsx` (file check and minor edits allowed)
- [X] T007 Add frontend fixture `web/src/mocks/landing.json` with LandingContent (hero_title, hero_subtitle, hero_cta_label, cta_target)
- [X] T008 Add a lightweight health-check endpoint/page: `web/public/health.html` and document path `/health`
- [X] T009 Configure Playwright: add `playwright.config.ts` at `web/playwright.config.ts` and create `web/tests/e2e` folder
- [X] T010 Add npm scripts in `web/package.json`: `dev`, `build`, `start`, `test:e2e` (ensure `test:e2e` runs Playwright tests)

**Checkpoint**: Dev server starts and Playwright can run against it.

---

## Phase 3: User Stories (Priority order)

### Phase 3A: US3 - Start Frontend Codebase (P1)

**Goal**: Developers can run and test the app locally and in CI.

- [X] T011 [US3] Add `web/README.md` documenting bootstrap command, install, start, and E2E commands (include expected dev port 5173)
- [X] T012 [US3] Add a sample GitHub Actions job `.github/workflows/playwright.yml` that: installs, starts dev server (background), waits for `/health`, runs `npx playwright test`, and uploads artifacts on failures
- [X] T013 [US3] Verify dev server health in CI by adding a small wait-and-retry script or use Playwright's built-in serverStart option (document approach in `web/README.md`)


### Phase 3B: US1 - View Landing Page (P1) 🎯 MVP

**Goal**: Render hero and CTA at `/` using fixture data.

- [X] T014 [US1] Implement `web/src/components/Hero.tsx` (typed props) or adapt scaffold component to serve hero UI
- [X] T015 [US1] Implement `web/src/pages/LandingPage.tsx` that reads `web/src/mocks/landing.json` and renders `Hero`
- [X] T016 [US1] Ensure route `/` renders `LandingPage` (file: `web/src/App.tsx`)
- [X] T017 [P] [US1] Add Playwright E2E test `web/tests/e2e/landing.spec.ts` verifying hero visible and CTA navigates or anchors
- [X] T018 [US1] Update `specs/001-landing-page/quickstart.md` with commands to validate US1 locally and in CI (file: `specs/001-landing-page/quickstart.md`)

### Phase 3C: US2 - Responsive & Accessible Landing (P2)

**Goal**: Ensure accessibility and responsive behavior.

- [X] T019 [US2] Add responsive CSS (file: `web/src/styles/main.css` or `web/src/styles/index.css`) and include in app
- [X] T020 [US2] Ensure interactive elements include ARIA attributes and images have alt text (file: `web/src/components/Hero.tsx`)
- [X] T021 [P] [US2] Add accessibility checks in Playwright E2E (use Playwright assertions or integrate `axe-core`) in `web/tests/e2e/landing.a11y.spec.ts`
- [X] T022 [US2] Add mobile viewport checks in E2E tests (file: `web/tests/e2e/landing.spec.ts`)

---

## Phase N: Polish & Cross-Cutting Concerns

- [ ] T023 [P] Update `project.md` and `specs/001-landing-page/` docs to reflect implementation and test guidance
- [ ] T024 [P] Ensure CI uploads Playwright reports/artifacts on failures (`.github/workflows/playwright.yml`)
- [ ] T025 [P] Run Quickstart validation and mark US1/US3 done in `specs/001-landing-page/tasks.md`

---

## Phase 4: Playwright Verification (Post-Feature)

**Purpose**: Final verification and artifact capture once feature implementation is complete and merged to a release branch.

- [ ] T026 Run full Playwright E2E suite in CI against the deployed preview or release branch and capture pass/fail status (CI job: `.github/workflows/playwright.yml`)
- [ ] T027 [P] Collect and upload Playwright artifacts and traces to `web/playwright-reports/` and ensure CI uploads them as job artifacts on failure (file paths: `web/playwright-report/*`)
- [ ] T028 Create a Playwright verification report in `specs/001-landing-page/playwright-verification.md` summarizing test outcomes, flaky tests, and remediation notes; link to artifacts and failing traces
- [ ] T029 If Playwright failures are detected, create a draft PR with remediation attempts or mark the feature as blocked in `specs/001-landing-page/tasks.md` and notify maintainers

**Checkpoint**: A Playwright verification report exists and artifacts are uploaded. Feature is either marked verified or blocked with remediation PR(s).

---

## Dependencies & Execution Order

- Bootstrap (T001-T005) → Configure (T006-T010) → User Stories (T011-T022) → Polish (T023-T025) → Playwright Verification (T026-T029)
- Parallel opportunities: T002, T003, T004, T009, T017, T021, T023-T025, T027

---

## Notes

- This re-task replaces handcrafting files with bootstrapping a Vite React TypeScript app and then adapting/configuring it. Do NOT create app files manually when a Vite bootstrap is appropriate.
- Per project governance, NO database or Supabase migrations are added for this feature; use local fixtures.

---
