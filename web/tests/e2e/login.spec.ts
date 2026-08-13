import { test, expect } from '@playwright/test'

test('login navigates to products on success', async ({ page }) => {
  const email = 'thang@gmmail.com'
  const password = 'Thang123'

  await page.goto('/login')
  await page.fill('input#email', email)
  await page.fill('input#password', password)
  await Promise.all([
    page.waitForNavigation({ url: /\/products/ }),
    page.click('button:has-text("Sign in")')
  ])

  await expect(page).toHaveURL(/\/products/)
  await expect(page.getByRole('heading', { name: /Products/i })).toBeVisible()
})
