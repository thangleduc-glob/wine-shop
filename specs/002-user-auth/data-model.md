# data-model.md — User Authentication (user-auth)

Summary

This feature relies on Supabase Auth for identity management. No new application-level persistent tables are required for this iteration; the product list page renders an empty state and requires no product schema changes.

Entities

- User (managed by Supabase Auth)
  - id: uuid (provider-managed)
  - email: string (unique, validated by provider)
  - created_at: timestamp (provider-managed)

Validation rules (derived from spec and clarifications)

- email: must be a syntactically valid email address
- password: minimum 8 characters; must include at least one letter and one number (client-side enforcement). Server-side password handling is managed by Supabase Auth — do not store raw passwords in the application database.

Notes on storage and RLS

- No application-side user table is created as part of this feature. If future features require storing user profiles or additional attributes, update /supabase/supabase.md and add migrations per the project's Database Design & Migrations principle.
- All access rules for user-owned data must follow least-privilege and RLS patterns when such data is introduced.
