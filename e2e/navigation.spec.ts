import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('skip link moves keyboard focus to the main content', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
})

test('section navigation retains focus and supports Escape on mobile', async ({ page }, testInfo) => {
  await page.goto('/')
  if (testInfo.project.name === 'mobile') {
    const toggle = page.getByRole('button', { name: 'Abrir menu' })
    await toggle.click()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Nosso propósito', exact: true })).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(toggle).toBeFocused()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
  }
  const link = page.getByRole('navigation').getByRole('link', { name: 'Nosso cuidado' })
  await link.focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#cuidado$/)
  await expect(page.locator('#cuidado')).toBeFocused()
  if (testInfo.project.name === 'mobile') {
    await expect(page.getByRole('navigation')).toBeHidden()
  }
})

test('page has no automatic accessibility violations, overflow or runtime errors', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/')
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  expect(results.violations).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Abrir menu' }).click()
    const menuResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    expect(menuResults.violations).toEqual([])
  }
  expect(errors).toEqual([])
})
