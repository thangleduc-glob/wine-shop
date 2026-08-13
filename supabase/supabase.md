# supabase/supabase.md

This file is the single Source-of-Truth for schema and RLS policy changes for the project. Any change that modifies runtime schema or RLS policies must update this file and include a corresponding migration in the same PR.

Feature: specs/003-supabase-products-list — Products listing
Date: 2026-08-13

## Table: public.products
Purpose: Public product catalog used by frontend route `/supabase`. Only read (SELECT) access is required for this feature.

Canonical schema (recommended)

```sql
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price_cents integer NOT NULL CHECK (price_cents >= 0),
  currency char(3) NOT NULL DEFAULT 'USD',
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- index for ordering
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_created_at ON public.products (created_at DESC);
```

Notes on fields
- id: prefer uuid; integer accepted if legacy schema exists.
- price_cents: integer in smallest currency unit to avoid floating point issues.
- currency: ISO 4217 3-letter code; optional if single-currency app.

## RLS / Data API exposure

Per project constitution, any public exposure must be documented and accompany a migration.

Recommended minimal migration steps to allow anonymous SELECT (public listing):

```sql
-- enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated roles to SELECT all rows (public listing)
CREATE POLICY "allow_public_select_products"
  ON public.products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Grant table-level SELECT to anon & authenticated (ensures Data API visibility)
GRANT SELECT ON public.products TO anon, authenticated;
```

Security considerations
- This policy intentionally exposes all product rows to public reads. Ensure no sensitive columns (cost_of_goods, supplier_contact, internal_notes, etc.) are present in the table or returned by queries.
- Prefer to restrict the columns returned by the frontend query (select only id, name, description, price_cents, currency, stock, created_at).
- Document and review this exposure with maintainers; if public exposure is not acceptable, use a server-side proxy instead and DO NOT apply the policy above.

## Migration guidance
- Create an imperative migration using the Supabase CLI or SQL migration tooling. Example flow:
  1. supabase migration new create_products_table
  2. Edit the migration file to include the CREATE TABLE / INDEX / RLS POLICY / GRANT statements.
  3. Run supabase db push / apply locally as needed and run `supabase db advisors`.
  4. Include the migration file and this supabase/supabase.md update in the same PR.

## Frontend query contract
- Frontend should explicitly request these columns:
  SELECT id, name, description, price_cents, currency, stock, created_at
- Limit: `limit: 50`, order: `order: created_at.desc()`
- Example supabase-js call (frontend):

```ts
const { data, error } = await supabase
  .from('products')
  .select('id,name,description,price_cents,currency,stock,created_at')
  .order('created_at', { ascending: false })
  .limit(50);
```

## Acceptance & review checklist (before merge)
- [ ] Migration file creates table/index and RLS policy as documented above (or documents proxy alternative).
- [ ] This file is updated and included in the same PR as the migration.
- [ ] `supabase db advisors` run and any high-confidence advisories addressed.
- [ ] Reviewers confirmed no sensitive columns are exposed.
- [ ] Playwright quickstart validated: /supabase loads and shows products or empty state.

## Rollback
- If public exposure must be revoked, remove the SELECT GRANT and drop the policy (or tighten the USING clause), and redeploy migration to revert to previous state.

Authored-by: speckit-plan
