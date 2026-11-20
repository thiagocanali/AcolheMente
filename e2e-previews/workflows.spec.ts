import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const previews = [
  { query: 'profile', heading: 'Conteúdo profissional pendente', skip: 'Pular para o conteúdo' },
  { query: 'profile-demo', heading: 'Perfil demonstrativo', skip: 'Pular para o conteúdo' },
  { query: 'admin', heading: 'Solicitações administrativas', skip: 'Pular para o painel' },
]

test('profiles distinguish pending content from the explicitly fictional demonstration', async ({ page }) => {
  await page.goto('/?preview=profile')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Conteúdo profissional pendente')
  await expect(page.locator('.profile-demo-notice, dl')).toHaveCount(0)
  await page.goto('/?preview=profile-demo')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Perfil demonstrativo')
  await expect(page.locator('.profile-demo-notice')).toContainText('Não representa uma profissional real')
  await expect(page.locator('dt')).toHaveCount(4)
  await expect(page.locator('form, input, button, a:not([href^="#"])')).toHaveCount(0)
})

test('all previews support the skip link and keyboard focus', async ({ page }) => {
  for (const preview of previews) {
    await page.goto(`/?preview=${preview.query}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(preview.heading)
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: preview.skip })).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('main')).toBeFocused()
    if (preview.query === 'admin') {
      await page.keyboard.press('Tab')
      await expect(page.getByLabel('Filtrar por situação')).toBeFocused()
      await page.keyboard.press('Tab')
      await expect(page.getByRole('button', { name: 'Restaurar demonstração' })).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(page.getByText('Dados fictícios restaurados.', { exact: true })).toBeVisible()
    }
  }
})

test('admin transitions affect only the selected record and reload restores fixtures', async ({ page }) => {
  await page.goto('/?preview=admin')
  const first = page.getByRole('listitem').filter({ hasText: 'DEMO-001' })
  const second = page.getByRole('listitem').filter({ hasText: 'DEMO-002' })
  await page.getByRole('button', { name: 'Mover para em análise (solicitação DEMO-001)', exact: true }).click()
  await expect(first.locator('.admin-status')).toHaveText('Em análise')
  await expect(second.locator('.admin-status')).toHaveText('Em análise')
  await page.getByRole('button', { name: 'Mover para contato registrado (solicitação DEMO-001)', exact: true }).click()
  await expect(first.locator('.admin-status')).toHaveText('Contato registrado')
  await expect(second.locator('.admin-status')).toHaveText('Em análise')
  await page.getByRole('button', { name: 'Mover para encerrada (solicitação DEMO-001)', exact: true }).click()
  await expect(first.locator('.admin-status')).toHaveText('Encerrada')
  await expect(first.getByRole('button')).toHaveCount(0)
  await expect(first.getByText('Estado final', { exact: true })).toBeVisible()
  await page.reload()
  await expect(first.locator('.admin-status')).toHaveText('Recebida')
  await expect(second.locator('.admin-status')).toHaveText('Em análise')
})

test('admin empty filter is announced and reset restores all records and the filter', async ({ page }) => {
  await page.goto('/?preview=admin')
  const filter = page.getByLabel('Filtrar por situação')
  await filter.selectOption('closed')
  const empty = page.getByRole('status').filter({ hasText: 'Nenhuma solicitação fictícia neste filtro.' })
  await expect(empty).toBeVisible()
  await expect(empty).toHaveAttribute('aria-live', 'polite')
  await expect(page.getByRole('listitem')).toHaveCount(0)
  await page.getByRole('button', { name: 'Restaurar demonstração', exact: true }).click()
  await expect(filter).toHaveValue('all')
  await expect(page.getByRole('listitem')).toHaveCount(3)
  await expect(empty).toHaveCount(0)
})

test('previews have no automatic accessibility violations, overflow or runtime errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  for (const preview of previews) {
    await page.goto(`/?preview=${preview.query}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(preview.heading)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    expect(results.violations).toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  expect(errors).toEqual([])
})

test('all previews remain usable at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 })
  for (const preview of previews) {
    await page.goto(`/?preview=${preview.query}`)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(preview.heading)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.getByRole('button', { name: 'Restaurar demonstração' }).click()
  await expect(page.getByText('Dados fictícios restaurados.', { exact: true })).toBeVisible()
})
