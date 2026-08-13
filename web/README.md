# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

---

# Quickstart (added for Landing Page feature)

This project provides a small landing page app (Vite + React + TypeScript) used by the landing-page feature.

Commands

- Install dependencies:
  cd web && npm install

- Start dev server (recommended port 5173):
  PORT=5173 npm run dev

- Health endpoint (used by CI):
  http://localhost:5173/health

- Run Playwright E2E locally:
  cd web
  npx playwright install
  npm run test:e2e

CI notes

- CI workflow `.github/workflows/playwright.yml` starts the dev server and waits for `/health` before running Playwright.
- A helper script `web/scripts/wait-for-health.sh` is provided; CI uses it to wait for readiness.

Port: 5173 (update both README and CI if changed)
