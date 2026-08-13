# research.md — Supabase Products List

Decision: Frontend will query Supabase directly using the anon key (anonymous client-side reads) to fetch up to 50 products.

Rationale: Public product listings are a common pattern; allowing anon SELECT keeps the UI simple and responsive, avoids introducing a backend proxy, and keeps iteration velocity high. This matches the user's earlier request to display products client-side and the project’s existing Supabase client usage.

Alternatives considered:
- Server-side proxy endpoint: safer (keeps keys secret) and allows business logic, but adds backend surface area and deployment complexity.
- Require authentication: tighter access control but harms public browsing UX and requires users to sign in before viewing catalog.

Risks & Mitigations:
- Risk: Exposing anon SELECT for products increases public visibility of the table. Mitigation: limit returned fields to non-sensitive columns; enable RLS and document policy; add /supabase/supabase.md entry and migration before merging.
- Risk: Price representation mismatch (decimal vs integer cents). Mitigation: Recommend storing price in integer cents and document in data-model.md; adapt frontend formatting.

Unknowns resolved:
- Access pattern chosen: anonymous read (resolved during clarify session).

Next steps derived from research:
- Update /supabase/supabase.md documenting the exposure and RLS policy.
- Create data-model.md with precise field types and validation rules.
- Implement UI that queries supabase-js client and limits to 50 rows ordered by created_at desc.
- Add quickstart.md with run/validate steps and guidance for DB exposure.
