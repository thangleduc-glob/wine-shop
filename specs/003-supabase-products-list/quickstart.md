# quickstart.md — Supabase Products List

Purpose: Steps to validate the feature end-to-end in a local dev environment.

Prerequisites
- Local repo checked out and dependencies installed (frontend: npm install).
- SUPABASE_URL and SUPABASE_ANON_KEY set in .env or environment for the running dev server.
- The Supabase project contains a `products` table with required fields and is exposed for public SELECT or the dev environment uses a proxy.

Run the app
1. From repo root: cd web && npm run dev
2. Confirm dev server listening on http://localhost:5173 (or adjust PLAYWRIGHT_BASE_URL).

Manual validation steps
1. Visit http://localhost:5173/supabase
2. Expected: page loads and shows up to 50 product items, each showing name, truncated description (<=200 chars), formatted price, and stock number.
3. If no products exist: an empty state with a link back to the landing page is visible.
4. To test error handling: temporarily revoke anon SELECT on the `products` table or block network requests; the page should show an error message with a Retry control.

Quick automated validation (Playwright example)
- Use an E2E test that navigates to /supabase and asserts that either:
  - At least one product card is visible and contains name + price, or
  - The empty state is visible.

Constitution & Security checklist before merging
- Update /supabase/supabase.md documenting the products table schema and the exact RLS policy granting public SELECT (or document the proxy alternative). This is mandatory per the project's constitution.
- Avoid exposing any sensitive fields in the public product response. Limit columns returned to the contract schema.

Notes
- If the project prefers not to expose the table publicly, switch to a server-side proxy and update these quickstart steps accordingly.
