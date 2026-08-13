# data-model.md — Supabase Products List

Entity: Product

Canonical fields (recommended):
- id: uuid (preferred) — primary key
- name: text (non-empty, max 255 chars)
- description: text (nullable) — frontend truncation to 200 chars for list view
- price_cents: integer (non-negative) — price stored in smallest currency unit (cents)
- currency: char(3) or text (ISO 4217) — optional, default 'USD' if single-currency app
- stock: integer (non-negative) — current available quantity
- created_at: timestamptz — default now()

Notes and validation rules:
- Price should be stored as integer cents to avoid floating point issues. Frontend formats to human-friendly currency using Intl.NumberFormat.
- name: required, trim whitespace, max length 255.
- stock: required, default 0, cannot be negative.
- description: optional; UI will truncate to 200 chars in the listing.

Indexes and performance
- Index: created_at DESC (for ordering) — create index on created_at for efficient sorting.
- Consider a composite index if future filters added (e.g., category, availability).

RLS / Data API exposure
- Because anonymous client-side reads are used, the `products` table must be exposed for public SELECT. Follow the project constitution: update /supabase/supabase.md with the exact RLS policy and grant required role access.
- Minimal policy recommendation: allow SELECT on non-sensitive columns to anon and authenticated roles, or grant table-level SELECT and enable RLS with a USING expression that returns true for all rows if public listing is intended. Maintain least-privilege principle and document rationale.

Schema migration guidance
- Add migration SQL that creates table with the canonical fields above and adds index on created_at. Include RLS policy statements and a documentation entry in /supabase/supabase.md as required by the constitution.

Example JSON product shape (frontend expectation):
{
  "id": "uuid or int",
  "name": "string",
  "description": "string|null",
  "price_cents": 1999,
  "currency": "USD",
  "stock": 12,
  "created_at": "2026-08-13T12:00:00Z"
}
