import { createApp, nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import AdminWorkflowPreview from '../src/components/AdminWorkflowPreview.vue'

function mount() {
  const host = document.createElement('div')
  document.body.append(host)
  const app = createApp(AdminWorkflowPreview)
  app.mount(host)
  return { host, cleanup: () => { app.unmount(); host.remove() } }
}

describe('local-only administrative preview', () => {
  it('renders fictional records without inputs for personal data', () => {
    const view = mount()
    try {
      expect(view.host.textContent).toContain('DEMO-001')
      expect(view.host.textContent).toContain('DEMO-002')
      expect(view.host.querySelectorAll('input, textarea, form, a:not([href^="#"])')).toHaveLength(0)
      expect(view.host.textContent).toContain('sem autenticação ou dados reais')
    } finally { view.cleanup() }
  })

  it('allows valid transitions and disables actions on closed records', async () => {
    const view = mount()
    try {
      const first = view.host.querySelector('.admin-card')!
      const close = [...first.querySelectorAll('button')].find(button => button.textContent?.includes('encerrada'))!
      close.click()
      await nextTick()
      expect(view.host.querySelector('.admin-card')?.textContent).toContain('Estado final')
      expect(view.host.querySelector('[role="status"]')?.textContent).toContain('apenas nesta prévia')
    } finally { view.cleanup() }
  })

  it('filters and resets in-memory demo state', async () => {
    const view = mount()
    try {
      const select = view.host.querySelector('select')!
      select.value = 'closed'
      select.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()
      expect(view.host.textContent).toContain('Nenhuma solicitação fictícia')
      select.value = 'all'
      select.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()
      const first = view.host.querySelector('.admin-card')!
      ;[...first.querySelectorAll('button')].find(button => button.textContent?.includes('encerrada'))!.click()
      await nextTick()
      const reset = [...view.host.querySelectorAll('button')].find(button => button.textContent?.includes('Restaurar'))!
      reset.click()
      await nextTick()
      expect(view.host.querySelector('.admin-card')?.textContent).toContain('Recebida')
    } finally { view.cleanup() }
  })
  it('provides accessible landmarks, labels and a live status message', async () => {
    const view = mount()
    try {
      const main = view.host.querySelector('main#painel')
      expect(main?.getAttribute('tabindex')).toBe('-1')
      expect(view.host.querySelector('a.skip-link')?.getAttribute('href')).toBe('#painel')
      expect(view.host.querySelector('label[for="status-filter"]')).not.toBeNull()
      expect(view.host.querySelector('select#status-filter')).not.toBeNull()
      const status = view.host.querySelector('[role="status"]')
      expect(status?.getAttribute('aria-live')).toBe('polite')
      const first = view.host.querySelector('.admin-card')!
      const next = [...first.querySelectorAll('button')].find(button => button.textContent?.includes('em análise'))!
      next.click()
      await nextTick()
      expect(status?.textContent).toContain('Estado atualizado')
      expect(first.textContent).toContain('Em análise')
    } finally { view.cleanup() }
  })

  it('keeps controls as native keyboard-accessible elements', () => {
    const view = mount()
    try {
      expect(view.host.querySelectorAll('.admin-actions button[type="button"]').length).toBeGreaterThan(0)
      expect(view.host.querySelectorAll('button:not([type="button"])')).toHaveLength(0)
      expect(view.host.querySelectorAll('[tabindex="-1"]')).toHaveLength(1)
      expect(view.host.querySelectorAll('[onclick], [onkeydown]')).toHaveLength(0)
    } finally { view.cleanup() }
  })

  it('provides a working skip link target and focusable native controls', () => {
    const view = mount()
    try {
      const skip = view.host.querySelector<HTMLAnchorElement>('a.skip-link')!
      const target = view.host.querySelector<HTMLElement>(skip.getAttribute('href')!)!
      expect(target).not.toBeNull()
      expect(target.tagName).toBe('MAIN')
      expect(target.tabIndex).toBe(-1)

      const filter = view.host.querySelector<HTMLSelectElement>('#status-filter')!
      filter.focus()
      expect(document.activeElement).toBe(filter)

      const reset = [...view.host.querySelectorAll<HTMLButtonElement>('button')].find(
        button => button.textContent?.includes('Restaurar'),
      )!
      reset.focus()
      expect(document.activeElement).toBe(reset)
      expect(reset.disabled).toBe(false)
    } finally { view.cleanup() }
  })

  it('announces empty results and returns to the full list when filtering', async () => {
    const view = mount()
    try {
      const filter = view.host.querySelector<HTMLSelectElement>('#status-filter')!
      filter.value = 'closed'
      filter.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()
      expect(view.host.querySelector('.admin-empty')?.textContent).toContain('Nenhuma solicitação')
      expect(view.host.querySelectorAll('.admin-card')).toHaveLength(0)

      filter.value = 'all'
      filter.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()
      expect(view.host.querySelector('.admin-empty')).toBeNull()
      expect(view.host.querySelectorAll('.admin-card')).toHaveLength(3)
    } finally { view.cleanup() }
  })

})
