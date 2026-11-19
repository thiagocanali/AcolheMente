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

  it('does not persist status changes after unmounting and remounting', async () => {
    const firstMount = mount()
    try {
      const first = firstMount.host.querySelector('.admin-card')!
      const close = [...first.querySelectorAll('button')].find(button => button.textContent?.includes('encerrada'))!
      close.click()
      await nextTick()
      expect(firstMount.host.querySelector('.admin-card')?.textContent).toContain('Encerrada')
    } finally { firstMount.cleanup() }

    const secondMount = mount()
    try {
      const cards = [...secondMount.host.querySelectorAll('.admin-card')]
      expect(cards).toHaveLength(3)
      expect(cards[0].textContent).toContain('DEMO-001')
      expect(cards[0].textContent).toContain('Recebida')
      expect(cards[0].textContent).not.toContain('Encerrada')
    } finally { secondMount.cleanup() }
  })

  it('filters by every proposed status without changing the underlying records', async () => {
    const view = mount()
    try {
      const select = view.host.querySelector('select')!
      for (const [status, expected] of [
        ['received', 'DEMO-001'],
        ['reviewing', 'DEMO-002'],
        ['contacted', 'DEMO-003'],
      ] as const) {
        select.value = status
        select.dispatchEvent(new Event('change', { bubbles: true }))
        await nextTick()
        const cards = [...view.host.querySelectorAll('.admin-card')]
        expect(cards).toHaveLength(1)
        expect(cards[0].textContent).toContain(expected)
      }
      select.value = 'closed'
      select.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()
      expect(view.host.querySelectorAll('.admin-card')).toHaveLength(0)
      expect(view.host.textContent).toContain('Nenhuma solicitação fictícia')
      select.value = 'all'
      select.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()
      expect(view.host.querySelectorAll('.admin-card')).toHaveLength(3)
    } finally { view.cleanup() }
  })

  it('announces empty filtered results to assistive technology', async () => {
    const view = mount()
    try {
      const filter = view.host.querySelector<HTMLSelectElement>('#status-filter')!
      filter.value = 'closed'
      filter.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()
      const empty = view.host.querySelector('.admin-empty')
      expect(empty?.getAttribute('role')).toBe('status')
      expect(empty?.getAttribute('aria-live')).toBe('polite')
      expect(empty?.textContent).toContain('Nenhuma solicitação fictícia')
      filter.value = 'all'
      filter.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()
      expect(view.host.querySelector('.admin-empty')).toBeNull()
    } finally { view.cleanup() }
  })

  it('restores all demo records and clears the status filter', async () => {
    const view = mount()
    try {
      const filter = view.host.querySelector<HTMLSelectElement>('#status-filter')!
      filter.value = 'closed'
      filter.dispatchEvent(new Event('change', { bubbles: true }))
      await nextTick()
      expect(view.host.querySelectorAll('.admin-card')).toHaveLength(0)
      const reset = [...view.host.querySelectorAll<HTMLButtonElement>('button')].find(button => button.textContent?.includes('Restaurar'))!
      reset.click()
      await nextTick()
      expect(filter.value).toBe('all')
      expect(view.host.querySelectorAll('.admin-card')).toHaveLength(3)
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

  it('updates only the selected fictional record when changing its status', async () => {
    const view = mount()
    try {
      const cards = [...view.host.querySelectorAll<HTMLElement>('.admin-card')]
      const first = cards[0]
      const action = [...first.querySelectorAll<HTMLButtonElement>('button')].find(
        button => button.textContent?.includes('em análise'),
      )!
      action.click()
      await nextTick()
      const updated = [...view.host.querySelectorAll<HTMLElement>('.admin-card')]
      expect(updated[0].textContent).toContain('Em análise')
      expect(updated[1].textContent).toContain('DEMO-002')
      expect(updated[1].textContent).toContain('Em análise')
      expect(updated[2].textContent).toContain('DEMO-003')
      expect(updated[2].textContent).toContain('Contato registrado')
    } finally { view.cleanup() }
  })

  it('supports the complete proposed workflow without allowing reopening', async () => {
    const view = mount()
    try {
      const first = () => view.host.querySelector<HTMLElement>('.admin-card')!
      const moveTo = async (label: string) => {
        const action = [...first().querySelectorAll<HTMLButtonElement>('button')].find(
          button => button.textContent?.includes(label),
        )
        expect(action).toBeDefined()
        action!.click()
        await nextTick()
      }
      await moveTo('em análise')
      expect(first().textContent).toContain('Em análise')
      await moveTo('contato registrado')
      expect(first().textContent).toContain('Contato registrado')
      await moveTo('encerrada')
      expect(first().textContent).toContain('Encerrada')
      expect(first().textContent).toContain('Estado final')
      expect(first().querySelectorAll('button')).toHaveLength(0)
    } finally { view.cleanup() }
  })

})
