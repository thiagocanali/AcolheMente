import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const failures = [
  { preview: 'admin', module: /\/src\/components\/AdminWorkflowPreview\.vue(?:\?|$)/, heading: 'Solicitações administrativas' },
  { preview: 'profile', module: /\/src\/components\/ProfessionalProfile\.vue(?:\?|$)/, heading: 'Conteúdo profissional pendente' },
  { preview: 'profile-demo', module: /\/src\/preview\/profileDemo\.ts(?:\?|$)/, heading: 'Perfil demonstrativo' },
]

for (const scenario of failures) {
  test(`${scenario.preview} recovers from a failed module with a keyboard retry`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    let failed = false
    await page.route(scenario.module, async route => {
      if (!failed) {
        failed = true
        await route.abort()
      } else {
        await route.continue()
      }
    })
    await page.goto(`/?preview=${scenario.preview}`)
    const heading = page.getByRole('heading', { name: 'Não foi possível abrir a prévia', exact: true })
    await expect(heading).toBeFocused()
    await expect(page.getByRole('alert')).toContainText('O carregamento foi interrompido.')
    await expect(page.getByRole('main')).not.toContainText('/src/')
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    expect(results.violations).toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Tentar novamente', exact: true })).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(scenario.heading)
    await expect(page.getByRole('alert')).toHaveCount(0)
    expect(errors).toEqual([])
  })
}

test('shows loading feedback while a module is pending and replaces it on success', async ({ page }) => {
  let release!: () => void
  const gate = new Promise<void>(resolve => { release = resolve })
  await page.route(failures[0]!.module, async route => {
    await gate
    await route.continue()
  })
  try {
    await page.goto('/?preview=admin', { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('status')).toHaveText('Carregando prévia local…')
    release()
    await expect(page.getByRole('heading', { name: 'Solicitações administrativas', exact: true })).toBeVisible()
    await expect(page.getByText('Carregando prévia local…', { exact: true })).toHaveCount(0)
  } finally {
    release()
  }
})

test('failure screen offers a keyboard return to the institutional site', async ({ page }) => {
  await page.route(failures[0]!.module, route => route.abort())
  await page.goto('/?preview=admin')
  await expect(page.getByRole('heading', { name: 'Não foi possível abrir a prévia' })).toBeFocused()
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Voltar ao site institucional' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cuidar da mente também é um ato de coragem.')
})
