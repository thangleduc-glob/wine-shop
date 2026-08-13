import { test, expect } from '@playwright/test'

test('login navigates to products on success (or shows an error)', async ({ page }) => {
  const email = 'thang@gmmail.com'
  const password = 'Thang123'

  await page.goto('/login')
  await page.fill('input#email', email)
  await page.fill('input#password', password)
  await page.click('button:has-text("Sign in")')

  // Wait up to 10s for either navigation to /products or an auth error to appear
  const maxAttempts = 20
  let success = false
  for (let i = 0; i < maxAttempts; i++) {
    await page.waitForTimeout(500)
    const url = page.url()
    if (url.includes('/products')) { success = true; break }
    const errEl = await page.$('.form-error, [role="alert"]')
    if (errEl) {
      const txt = (await errEl.innerText()).slice(0, 400)
      await page.screenshot({ path: 'tests/e2e/artifacts/login-error.png' }).catch(()=>{})
      throw new Error(`Login failed: ${txt}`)
    }
  }

  if (!success) {
    await page.screenshot({ path: 'tests/e2e/artifacts/login-timeout.png' }).catch(()=>{})
    throw new Error('Timed out waiting for navigation to /products; check auth config or server logs')
  }

  await expect(page).toHaveURL(/\/products/)
  await expect(page.getByRole('heading', { name: /Products/i })).toBeVisible()
})
