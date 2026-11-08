import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SiteHeader from '../src/components/SiteHeader.vue'

describe('SiteHeader', () => {
  it('starts with the mobile menu closed', () => {
    const wrapper = mount(SiteHeader)
    const button = wrapper.get('button[aria-controls="primary-navigation"]')

    expect(button.attributes('aria-expanded')).toBe('false')
    expect(wrapper.get('nav').classes()).not.toContain('is-open')
  })

  it('opens and closes the navigation when the toggle is activated', async () => {
    const wrapper = mount(SiteHeader)
    const button = wrapper.get('button[aria-controls="primary-navigation"]')

    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('true')
    expect(wrapper.get('nav').classes()).toContain('is-open')

    await button.trigger('click')
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(wrapper.get('nav').classes()).not.toContain('is-open')
  })

  it('closes the navigation after selecting a section', async () => {
    const wrapper = mount(SiteHeader)
    await wrapper.get('button[aria-controls="primary-navigation"]').trigger('click')
    await wrapper.get('a[href="#cuidado"]').trigger('click')

    expect(wrapper.get('button').attributes('aria-expanded')).toBe('false')
    expect(wrapper.get('nav').classes()).not.toContain('is-open')
  })

  it('closes the navigation when Escape is pressed inside it and restores focus', async () => {
    const wrapper = mount(SiteHeader, { attachTo: document.body })
    await wrapper.get('button[aria-controls="primary-navigation"]').trigger('click')
    await wrapper.get('nav').trigger('keydown', { key: 'Escape' })

    const button = wrapper.get('button[aria-controls="primary-navigation"]')
    expect(button.attributes('aria-expanded')).toBe('false')
    expect(wrapper.get('nav').classes()).not.toContain('is-open')
    expect(document.activeElement).toBe(button.element)
    wrapper.unmount()
  })
})
