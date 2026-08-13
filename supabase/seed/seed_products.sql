-- Seed products for local development
-- Insert a few example products

INSERT INTO public.products (name, description, price_cents, currency, stock)
VALUES
  ('Red Wine A', 'A fruity red wine with cherry notes.', 1999, 'USD', 12),
  ('White Wine B', 'Crisp and floral white wine.', 1599, 'USD', 8),
  ('Sparkling C', 'Bright sparkling wine for celebrations.', 2499, 'USD', 5)
ON CONFLICT DO NOTHING;
