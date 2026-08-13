# Tasks: Supabase Products List

**Input**: Design documents from `specs/003-supabase-products-list/` (spec.md, plan.md, data-model.md, contracts/, research.md, quickstart.md)

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Migrations, RLS, and documentation that MUST be in place before the frontend relies on public SELECT.

- [X] T001 Create imperative migration SQL to create `public.products`, index, and RLS policy per supabase/supabase.md — supabase/migrations/20260813_create_products_table.sql
- [X] T002 Ensure supabase/supabase.md documents the schema and RLS policy and is included in the same PR as the migration — supabase/supabase.md
- [x] T003 Run `supabase db advisors` locally and record/address any high-confidence advisories (repeat until clean) — repo root (run command)  # see supabase/scripts/run_advisors.sh helper
- [X] T004 [P] Add minimal seed data script for local dev to populate a few product rows for quickstart validation — supabase/seed/seed_products.sql

---

## Phase 2: User Story 1 - Browse products (Priority: P1) 🎯 MVP

Goal: Implement the /supabase page that fetches up to 50 products and renders product cards with name, truncated description (<=200 chars), formatted price, and stock number. Provide loading, error (with Retry), and empty states.

Independent Test: Start dev server, visit /supabase, assert that either at least one product card is visible containing name+price, or the empty state is visible.

- [X] T005 [US1] Create products client wrapper that imports existing Supabase client and performs the query: web/src/lib/productsClient.ts
- [X] T006 [US1] Create ProductCard component to render a single product (name, truncated description, formatted price, stock) — web/src/components/products/ProductCard.tsx
- [X] T007 [US1] Create SupabaseProductsPage component that queries productsClient and renders the list — web/src/pages/SupabaseProductsPage.tsx
- [X] T008 [US1] Wire the /supabase route in the router and add navigation (if applicable) — web/src/App.tsx
- [X] T009 [P] [US1] Add styles for product list and cards — web/src/styles/products.css
- [X] T010 [US1] Implement loading, error (with Retry control), and empty states in SupabaseProductsPage.tsx — web/src/pages/SupabaseProductsPage.tsx
- [X] T011 [US1] Ensure price formatting uses Intl.NumberFormat and derives value from price_cents — web/src/components/products/ProductCard.tsx

---

## Phase 3: Testing & Validation

- [x] T012 [US1] Add Playwright E2E test that navigates to /supabase and asserts presence of product cards or empty state — web/tests/e2e/products.spec.ts
- [x] T013 [US1] Add test helpers or fixtures to point Playwright to seeded local data or mocked responses if needed — web/tests/e2e/helpers/setupProducts.ts
- [x] T014 [ ] Run quickstart validation and update quickstart.md with any tweaks observed during validation — specs/003-supabase-products-list/quickstart.md

---

## Dependencies & Execution Order

- Foundational Phase (T001-T004) MUST complete before User Story 1 tasks (T005-T011) run against a real Supabase instance exposing public SELECT.
- User Story implementation tasks (T005-T011) may be split among developers; ProductCard and productsClient can be developed in parallel (mark T006 and T005 as parallelizable where safe).
- Testing tasks (T012-T013) depend on T005-T011 and on having either seeded local data (T004) or a test database.

## Estimated task counts
- Total tasks listed: 17
- Tasks for User Story 1: 7 (T005-T011)
- Parallel opportunities: T004, T009, T016

## Suggested MVP scope
- Complete Phase 1 + Phase 2 + T012 (deliver /supabase page with E2E validation)


---

Implementation notes
- Reuse existing `web/src/lib/supabaseClient.ts` from the repository; productsClient should import and reuse it.
- Keep frontend query columns limited to the contract: id,name,description,price_cents,currency,stock,created_at.
- Ensure all added files are TypeScript (.tsx/.ts) and follow project coding conventions.


Authored-by: speckit-tasks
