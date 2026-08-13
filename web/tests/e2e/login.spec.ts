import { test, expect } from '@playwright/test'

test('login navigates to products on success', async ({ page, baseURL }) => {
  const email = 'thang@gmmail.com'
  const password = 'Thang123'

  // use baseURL configured in playwright.config.ts
  await page.goto('/login')
  await page.fill('input#email', email)
  await page.fill('input#password', password)
  await page.click('button:has-text("Sign in")')

  // wait for SPA navigation to /products
  await page.waitForURL('**/products', { timeout: 10000 })

  await expect(page).toHaveURL(/\/products/)
  await expect(page.getByRole('heading', { name: /Products/i })).toBeVisible()
})
