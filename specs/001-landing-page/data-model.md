# Data Model: Landing Page (Frontend-only)

Date: 2026-08-13

NOTE: This feature explicitly uses no database or backend API. The data model below describes the in-memory/frontend shape used for rendering and testing with local fixtures.

## Entities (Frontend representation)

### LandingContent
Site-level content for the landing page stored as a local fixture for v1.
- hero_title: string
- hero_subtitle: string
- hero_cta_label: string
- cta_target: string (URL or page anchor)

Behavioral notes:
- If hero content is missing, the UI MUST show a default marketing message and a neutral CTA.
- For v1, the fixture files under `web/src/mocks/` (e.g., `landing.json`) are the authoritative source for the landing page state; no persistence or remote schema is required.

## Data Flow (v1)
- Frontend reads `web/src/mocks/landing.json` to populate the landing page.
- No API calls, database queries, or migrations are part of this feature.

