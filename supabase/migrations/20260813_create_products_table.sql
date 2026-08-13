-- Migration: create_products_table
-- Date: 2026-08-13

BEGIN;

CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price_cents integer NOT NULL CHECK (price_cents >= 0),
  currency char(3) NOT NULL DEFAULT 'USD',
  stock integer NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- index for ordering created_at desc
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_products_created_at ON public.products (created_at DESC);

-- Enable RLS and add minimal policy for public SELECT (documented in supabase/supabase.md)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS allow_public_select_products
  ON public.products
  FOR SELECT
  TO anon, authenticated
  USING (true);

GRANT SELECT ON public.products TO anon, authenticated;

COMMIT;
