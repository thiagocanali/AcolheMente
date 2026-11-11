<script setup lang="ts">
import { nextTick, ref } from 'vue'

const menuToggle = ref<HTMLButtonElement | null>(null)

const menuOpen = ref(false)

const closeMenu = () => {
  menuOpen.value = false
}

const navigateToSection = async (event: MouseEvent) => {
  // Preserve native new-tab and modified-click behavior.
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return
  const link = event.currentTarget as HTMLAnchorElement
  const target = document.getElementById(link.hash.slice(1))
  closeMenu()
  await nextTick()
  target?.focus({ preventScroll: true })
}

const closeMenuAndFocus = async () => {
  if (!menuOpen.value) return

  closeMenu()
  await nextTick()
  menuToggle.value?.focus()
}
</script>

<template>
  <header class="site-header" @keydown.esc="closeMenuAndFocus">
    <a class="brand" href="#inicio" aria-label="AcolheMente, início" @click="navigateToSection">
      <span class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none">
          <path d="M20 33.2C16.5 29.8 7 23.7 7 15.9C7 11.5 10.2 8.5 14.1 8.5C16.7 8.5 18.7 9.9 20 12C21.3 9.9 23.3 8.5 25.9 8.5C29.8 8.5 33 11.5 33 15.9C33 23.7 23.5 29.8 20 33.2Z" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12.5 20.5H17L19.2 16.5L22.1 24L24.2 20.5H27.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="brand-name">acolhe<span>mente</span></span>
    </a>

    <button
      ref="menuToggle"
      class="menu-toggle"
      type="button"
      :aria-expanded="menuOpen"
      aria-controls="primary-navigation"
      :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
      @click="menuOpen = !menuOpen"
    >
      <span aria-hidden="true"></span><span aria-hidden="true"></span>
    </button>

    <nav
      id="primary-navigation"
      class="main-nav"
      :class="{ 'is-open': menuOpen }"
      aria-label="Navegação principal"
    >
      <a href="#proposito" @click="navigateToSection">Nosso propósito</a>
      <a href="#como-funciona" @click="navigateToSection">Como funciona</a>
      <a href="#cuidado" @click="navigateToSection">Nosso cuidado</a>
      <a class="nav-cta" href="#novidades" @click="navigateToSection">Acompanhe o projeto <span aria-hidden="true">↗</span></a>
    </nav>
  </header>
</template>
