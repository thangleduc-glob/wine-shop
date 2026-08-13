import { test, expect } from '@playwright/test'

test('landing basic accessibility attributes', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('hero-title')).toBeVisible()
  const cta = page.getByTestId('hero-cta')
  await expect(cta).toHaveAttribute('aria-label', 'Explore Wines')
})
