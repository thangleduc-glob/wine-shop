# Quickstart: Landing Page (Validation Guide)

Date: 2026-08-13

Purpose: Steps to validate the landing page feature end-to-end in local development and CI.

Prerequisites
- Node.js (v16+) installed
- npm available (or use pnpm/yarn and adapt commands)

Local development
1. From repository root, install dependencies for the frontend scaffold (when created):

   npm ci --workspace=web

2. Start the dev server (Vite):

   cd web
   npm run dev

   The dev server should start on port 5173 by default. Confirm by visiting http://localhost:5173

3. Validate landing page manually: open http://localhost:5173 and confirm hero and CTA render.

E2E validation (Playwright)
1. Ensure dev server is running (background) or use the Playwright test runner's built-in server start step.
2. Run Playwright tests from repo root (example):

   npx playwright test --project=chromium

3. Expected outcome: Playwright tests for P1 scenarios pass (hero visible, CTA works, navigation flows correct).

CI notes
- CI job must: install, start dev server (background), wait for health-check (e.g., curl http://localhost:5173/ or /health), run `npx playwright test`, and collect Playwright reports/artifacts on failure.

