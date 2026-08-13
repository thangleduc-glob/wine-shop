# 003-supabase-products-list — Supabase Products List

Short name: supabase-products-list

Summary

Add a products listing page at route /supabase that shows the first 50 products from the database. Each product must show name, short description, price, and available stock number. This feature reads product rows only (no write operations) and paginates or limits to the first 50 items for the initial view.

Actors

- Anonymous visitor (site visitor)
- Authenticated user (if present — same view for this feature)

Background & Constraints

- Product data is stored in the project's Supabase Postgres database in a `products` table.
- The feature displays read-only data; RLS and Data API exposure must permit SELECT for the unauthenticated/anonymous path used by the frontend (or requests must be proxied by a backend if anon access is not allowed).
- Show up to 50 products ordered by created_at (descending) by default.

User Scenarios (primary flows)

1) Browse products
   - Visitor navigates to /supabase.
   - Page fetches up to the first 50 products from the database.
   - Each product row displays: name, short description (<= 200 chars), price (formatted), and stock number.
   - If no products exist, the page shows a clear empty state with guidance.

2) Pagination / load more (non-mandatory enhancement)
   - Visitor clicks "Load more" to fetch the next page of products (beyond the first 50).
   - Implementation: optional — documented in Assumptions if deferred.

Functional Requirements (testable)

FR-1: Products endpoint usage
- Given the frontend requests product rows for the products page, when the API/DB call is made, then up to 50 product rows are returned ordered by created_at descending.
- Acceptance: Response contains at most 50 rows and includes fields: id, name, description, price, stock, created_at.

FR-2: Page rendering
- Given a successful product fetch, the /supabase page renders a list/grid where each item displays name, description (truncated to 200 chars), price, and stock.
- Acceptance: For each product row returned, the corresponding UI element contains those fields and price is visible and readable.

FR-3: Empty state
- Given zero products in the DB, the page shows an empty state message and a link to the shop landing page.
- Acceptance: Empty state is visible and descriptive.

FR-4: Error handling
- If the fetch fails (network or permission), the page shows a human-readable error with a retry control.
- Acceptance: Error message appears and retry attempts re-fetch data.

Success Criteria (measurable & verifiable)

- 95% of page loads successfully fetch and render up to 50 products within 2s on a local dev environment (measured in manual validation runs).
- The UI displays all required fields (name, description, price, stock) for 100% of returned rows in validation runs.
- Empty state and error flows are tested manually and observed to behave as specified.

Key Entities

- Product
  - id: uuid (or integer) — primary key
  - name: string
  - description: text
  - price: numeric (stored in cents or decimal; presentable by frontend)
  - stock: integer (available quantity)
  - created_at: timestamp

Assumptions

- Table name: `products` exists in the Supabase public schema. If the table is named differently, the integration tasks will adjust.
- The frontend will use anonymous client-side reads via the Supabase anon key (public SELECT) to fetch products. This requires the `products` table to be exposed for public SELECT through the Data API or an RLS policy that permits read-only access. If public exposure is not permitted for security reasons, the alternative is a server-side proxy endpoint that performs the query with a service role key.
- No product write operations (create/update/delete) are needed for this feature.
- Pagination beyond 50 items is out of scope for initial delivery; the UI will offer a non-functional "Load more" placeholder if desired.

Dependencies

- Supabase project with `products` table containing required fields.
- Frontend routing capable of serving /supabase route.
- RLS and Data API exposure configured to permit SELECT for the intended client (anon or authenticated).

Out of scope

- Product creation, editing, deletion, or inventory management.
- Full-text search, filtering, or sorting beyond created_at descending.
- Detailed price localization or currency conversions.

Acceptance Criteria (summary)

- Visiting /supabase shows up to 50 products from the database, each showing name, truncated description, price, and stock number.
- On fetch failure or no products, appropriate error or empty states appear with retry or navigation options.

Validation notes

- Marked as ready for planning. No [NEEDS CLARIFICATION] markers remain.

## Clarifications

### Session 2026-08-13

- Q: Which access pattern should the frontend use to fetch products from Supabase: anonymous client-side requests, authenticated requests only, or a server-side proxy endpoint? → A: Allow anonymous client-side reads (anon SELECT). The frontend will query Supabase directly with the anon key; the products table must be exposed for public SELECT via the Data API or an appropriate RLS policy. Per project constitution, update /supabase/supabase.md to document the exposure and RLS policy before merging.

Spec Author: speckit-specify
Date: 2026-08-13
