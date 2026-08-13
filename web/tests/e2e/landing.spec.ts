import { test, expect } from '@playwright/test'

test('landing shows hero title and CTA', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('hero-title')).toHaveText('Welcome to Wine Shop')
  await expect(page.getByTestId('hero-cta')).toHaveAttribute('href', '/#shop')
})

test('mobile viewport layout', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await expect(page.getByTestId('hero-title')).toBeVisible()
})
