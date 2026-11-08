import { createApp, nextTick, type Component } from 'vue'
import { describe, expect, it } from 'vitest'
import SiteHeader from '../src/components/SiteHeader.vue'

function mountComponent(component: Component) {
  const host = document.createElement('div')
  document.body.append(host)

  const app = createApp(component)
  app.mount(host)

  const get = <T extends Element = HTMLElement>(selector: string): T => {
    const element = host.querySelector<T>(selector)
    if (!element) throw new Error(`Element not found: ${selector}`)
    return element
  }

  const click = async (selector: string) => {
    get(selector).dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()
  }

  const keydown = async (selector: string, key: string) => {
    get(selector).dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
    await nextTick()
  }

  return {
    get,
    click,
    keydown,
    unmount() {
      app.unmount()
      host.remove()
    },
  }
}

describe('SiteHeader', () => {
  it('starts with the mobile menu closed', () => {
    const wrapper = mountComponent(SiteHeader)
    const button = wrapper.get<HTMLButtonElement>('button[aria-controls="primary-navigation"]')

    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(wrapper.get('nav').classList.contains('is-open')).toBe(false)
    wrapper.unmount()
  })

  it('opens and closes the navigation when the toggle is activated', async () => {
    const wrapper = mountComponent(SiteHeader)
    const buttonSelector = 'button[aria-controls="primary-navigation"]'

    await wrapper.click(buttonSelector)
    expect(wrapper.get(buttonSelector).getAttribute('aria-expanded')).toBe('true')
    expect(wrapper.get('nav').classList.contains('is-open')).toBe(true)

    await wrapper.click(buttonSelector)
    expect(wrapper.get(buttonSelector).getAttribute('aria-expanded')).toBe('false')
    expect(wrapper.get('nav').classList.contains('is-open')).toBe(false)
    wrapper.unmount()
  })

  it('closes the navigation after selecting a section', async () => {
    const wrapper = mountComponent(SiteHeader)
    await wrapper.click('button[aria-controls="primary-navigation"]')
    await wrapper.click('a[href="#cuidado"]')

    expect(wrapper.get('button').getAttribute('aria-expanded')).toBe('false')
    expect(wrapper.get('nav').classList.contains('is-open')).toBe(false)
    wrapper.unmount()
  })

  it('closes the navigation when Escape is pressed inside it and restores focus', async () => {
    const wrapper = mountComponent(SiteHeader)
    await wrapper.click('button[aria-controls="primary-navigation"]')
    await wrapper.keydown('nav', 'Escape')

    const button = wrapper.get<HTMLButtonElement>('button[aria-controls="primary-navigation"]')
    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(wrapper.get('nav').classList.contains('is-open')).toBe(false)
    expect(document.activeElement).toBe(button)
    wrapper.unmount()
  })

  it('closes the navigation when Escape is pressed while the toggle has focus', async () => {
    const wrapper = mountComponent(SiteHeader)
    const buttonSelector = 'button[aria-controls="primary-navigation"]'
    const button = wrapper.get<HTMLButtonElement>(buttonSelector)

    await wrapper.click(buttonSelector)
    button.focus()
    await wrapper.keydown(buttonSelector, 'Escape')

    expect(button.getAttribute('aria-expanded')).toBe('false')
    expect(wrapper.get('nav').classList.contains('is-open')).toBe(false)
    expect(document.activeElement).toBe(button)
    wrapper.unmount()
  })
})
