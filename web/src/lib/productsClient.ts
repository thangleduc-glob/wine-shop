import supabase from './supabaseClient'

export type Product = {
  id: string
  name: string
  description?: string | null
  price_cents: number
  currency?: string
  stock: number
  created_at: string
}

export async function fetchProducts(limit = 50) {
  const { data, error } = await supabase
    .from<'products', Product>('products')
    .select('id,name,description,price_cents,currency,stock,created_at')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data ?? []
}
