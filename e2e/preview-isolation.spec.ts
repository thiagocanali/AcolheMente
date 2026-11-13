import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('production preview isolation', () => {
  for (const preview of ['admin', 'profile']) {
    test(`does not expose ${preview} preview in production build`, async ({ page }) => {
      await page.goto(`/?preview=${preview}`)
      await expect(page.locator('main')).toHaveCount(1)
      await expect(page.getByText('Protótipo local · sem autenticação ou dados reais')).toHaveCount(0)
      await expect(page.getByText('Conteúdo profissional pendente')).toHaveCount(0)
      await expect(page.locator('.admin-card')).toHaveCount(0)
      await expect(page.locator('.profile-preview')).toHaveCount(0)
      await expect(page.locator('body')).not.toContainText('DEMO-001')
      const results = await new AxeBuilder({ page }).analyze()
      expect(results.violations).toEqual([])
    })
  }

  test('institutional page remains usable with unexpected preview parameter', async ({ page }) => {
    await page.goto('/?preview=unexpected')
    await expect(page.locator('main')).toHaveCount(1)
    await expect(page.locator('h1')).toBeVisible()
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflow).toBe(false)
  })
})
