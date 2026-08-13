import { test, expect } from '@playwright/test'

test('signup creates account and redirects to products', async ({ page }) => {
  const timestamp = Date.now()
  const email = `test+${timestamp}@example.com`
  const password = `Passw0rd!${timestamp.toString().slice(-4)}`

  await page.goto('/signup')
  await page.fill('input#email', email)
  await page.fill('input#password', password)
  await Promise.all([
    page.waitForNavigation({ url: /\/products/ }),
    page.click('button:has-text("Create account")')
  ])

  await expect(page).toHaveURL(/\/products/)
  await expect(page.getByRole('heading', { name: /Products/i })).toBeVisible()
})
