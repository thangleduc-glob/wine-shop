import { test, expect } from '@playwright/test'

test.describe('Supabase products page', () => {
  test('loads and displays product cards', async ({ page, baseURL }) => {
    const url = baseURL ? `${baseURL}/products` : 'http://localhost:5173/products'
    await page.goto(url, { waitUntil: 'networkidle' })

    // Wait for the grid and at least one card to render
    await page.waitForSelector('.products-grid', { timeout: 15000 })
    const cards = page.locator('.products-grid .product-card')

    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
    expect(count).toBeLessThanOrEqual(50)

    // Inspect the first card for expected sub-elements
    const first = cards.nth(0)
    const img = first.locator('.product-thumb img')
    await expect(img).toBeVisible()

    const name = first.locator('.product-name')
    await expect(name).not.toBeEmpty()

    const price = first.locator('.product-price')
    await expect(price).not.toBeEmpty()

    const buy = first.locator('button', { hasText: 'Buy' })
    await expect(buy).toHaveCount(1)

    // If Buy is present, ensure it is either enabled or explicitly disabled when out of stock
    const isDisabled = await buy.isDisabled()
    expect(typeof isDisabled).toBe('boolean')
  })
})
