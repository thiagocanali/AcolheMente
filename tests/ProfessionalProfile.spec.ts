import { createApp } from 'vue'
import { describe, expect, it } from 'vitest'
import ProfessionalProfile from '../src/components/ProfessionalProfile.vue'

function render(profile?: { name: string; registration: string; introduction: string; modality?: string }) {
  const host = document.createElement('div')
  document.body.append(host)
  const app = createApp(ProfessionalProfile, { profile })
  app.mount(host)
  return { host, cleanup: () => { app.unmount(); host.remove() } }
}

describe('professional profile review', () => {
  it('shows an explicit pending state without invented credentials or contact actions', () => {
    const view = render()
    try {
      expect(view.host.querySelector('h1')?.textContent).toBe('Conteúdo profissional pendente')
      expect(view.host.querySelectorAll('form, input, button, a:not([href^="#"])')).toHaveLength(0)
    } finally { view.cleanup() }
  })

  it('renders supplied text safely and omits unconfirmed practical information', () => {
    const view = render({ name: 'Perfil fictício de teste', registration: 'Identificação fictícia', introduction: '<img src=x onerror=alert(1)>' })
    try {
      expect(view.host.textContent).toContain('<img src=x onerror=alert(1)>')
      expect(view.host.querySelector('img')).toBeNull()
      expect(view.host.querySelector('dl')).toBeNull()
    } finally { view.cleanup() }
  })

  it('shows only the supplied attendance fields and keeps a focusable main landmark', () => {
    const view = render({ name: 'Perfil fictício de teste', registration: 'Identificação fictícia', introduction: 'Apresentação fictícia.', modality: 'Modalidade fictícia' })
    try {
      expect(view.host.querySelector('dl')?.textContent).toContain('Modalidade fictícia')
      expect(view.host.querySelectorAll('dt')).toHaveLength(1)
      expect(view.host.querySelector('main')?.getAttribute('tabindex')).toBe('-1')
    } finally { view.cleanup() }
  })
})
