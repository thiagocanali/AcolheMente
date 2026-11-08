import { createApp, type Component } from 'vue'
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
