import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('production preview isolation', () => {
  for (const preview of ['admin', 'profile', 'profile-demo']) {
    test(`does not expose ${preview} preview in production build`, async ({ page }) => {
      await page.goto(`/?preview=${preview}`)
      await expect(page.locator('main')).toHaveCount(1)
      await expect(page.getByText('Protótipo local · sem autenticação ou dados reais')).toHaveCount(0)
      await expect(page.getByText('Conteúdo profissional pendente')).toHaveCount(0)
      await expect(page.locator('.admin-card')).toHaveCount(0)
      await expect(page.locator('.profile-preview')).toHaveCount(0)
      await expect(page.getByRole('button', { name: 'Tentar novamente', exact: true })).toHaveCount(0)
      await expect(page.getByText('Carregando prévia local…', { exact: true })).toHaveCount(0)
      await expect(page.getByText('Demonstração com conteúdo fictício.')).toHaveCount(0)
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
  test('keeps production landing accessible at 320px with preview parameters', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 })
    for (const url of ['/', '/?preview=admin', '/?preview=profile', '/?preview=profile-demo']) {
      await page.goto(url)
      await expect(page.locator('main#conteudo')).toBeVisible()
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(page.locator('.admin-preview')).toHaveCount(0)
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
      }))
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport)
    }
  })

  test('does not expose development views through query-string variants', async ({ page }) => {
    const variants = [
      '/?preview=admin&preview=profile',
      '/?preview=profile&preview=admin',
      '/?preview=%61dmin',
      '/?PREVIEW=admin',
      '/?preview=admin#painel',
      '/?preview=admin%00',
      '/?preview=profile-demo&preview=admin',
      '/?preview=%70rofile-demo',
    ]
    for (const url of variants) {
      await page.goto(url)
      await expect(page.locator('main#conteudo')).toBeVisible()
      await expect(page.locator('.admin-preview, .profile-preview')).toHaveCount(0)
      await expect(page.locator('body')).not.toContainText('DEMO-001')
    }
  })
})
