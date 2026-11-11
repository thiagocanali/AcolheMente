import { createApp, nextTick, type Component } from 'vue'
import { describe, expect, it } from 'vitest'
import App from '../src/App.vue'

function mountComponent(component: Component) {
  const host = document.createElement('div')
  document.body.append(host)
  const app = createApp(component)
  app.mount(host)

  return {
    host,
    unmount() {
      app.unmount()
      host.remove()
    },
  }
}

describe('App accessibility landmarks', () => {
  it('provides a skip link whose main landmark can receive keyboard focus', () => {
    const wrapper = mountComponent(App)
    const skipLink = wrapper.host.querySelector<HTMLAnchorElement>('.skip-link')
    const main = wrapper.host.querySelector<HTMLElement>('main#conteudo')

    expect(skipLink?.getAttribute('href')).toBe('#conteudo')
    expect(main?.getAttribute('tabindex')).toBe('-1')
    expect(wrapper.host.querySelectorAll('h1')).toHaveLength(1)
    wrapper.unmount()
  })

  it('keeps every in-page navigation link connected to an existing section', () => {
    const wrapper = mountComponent(App)
    const links = [...wrapper.host.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]

    expect(links.length).toBeGreaterThan(0)
    for (const link of links) {
      const target = link.getAttribute('href')?.slice(1)
      expect(target).toBeTruthy()
      expect([...wrapper.host.querySelectorAll<HTMLElement>('[id]')].some((element) => element.id === target)).toBe(true)
      expect(link.textContent?.trim().length).toBeGreaterThan(0)
    }
    wrapper.unmount()
  })

  it('moves focus out of the collapsed mobile navigation to the selected section', async () => {
    const wrapper = mountComponent(App)
    try {
      const toggle = wrapper.host.querySelector<HTMLButtonElement>('.menu-toggle')!
      toggle.click()
      await nextTick()
      const link = wrapper.host.querySelector<HTMLAnchorElement>('nav a[href="#cuidado"]')!
      link.focus()
      link.click()
      await nextTick()
      expect(toggle.getAttribute('aria-expanded')).toBe('false')
      expect(document.activeElement).toBe(wrapper.host.querySelector('#cuidado'))
    } finally {
      wrapper.unmount()
    }
  })

  it('announces the external GitHub destination and its new-tab behavior', () => {
    const wrapper = mountComponent(App)
    const externalLink = wrapper.host.querySelector<HTMLAnchorElement>(
      'a[href="https://github.com/thiagocanali/AcolheMente"]',
    )

    expect(externalLink?.getAttribute('aria-label')).toBe(
      'Acompanhe a construção no GitHub (abre em nova aba)',
    )
    expect(externalLink?.getAttribute('target')).toBe('_blank')
    expect(externalLink?.getAttribute('rel')).toContain('noopener')
    wrapper.unmount()
  })

  it('marks the decorative external-link icon as hidden from assistive technology', () => {
    const wrapper = mountComponent(App)
    const externalLink = wrapper.host.querySelector<HTMLAnchorElement>(
      'a[href="https://github.com/thiagocanali/AcolheMente"]',
    )

    expect(externalLink?.getAttribute('rel')).toContain('noopener')
    expect(externalLink?.querySelector('[aria-hidden="true"]')).not.toBeNull()
    wrapper.unmount()
  })
})
