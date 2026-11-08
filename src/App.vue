<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref(false)

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>

    <header class="site-header">
      <a class="brand" href="#inicio" aria-label="AcolheMente, início" @click="closeMenu">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M20 33.2C16.5 29.8 7 23.7 7 15.9C7 11.5 10.2 8.5 14.1 8.5C16.7 8.5 18.7 9.9 20 12C21.3 9.9 23.3 8.5 25.9 8.5C29.8 8.5 33 11.5 33 15.9C33 23.7 23.5 29.8 20 33.2Z" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 20.5H17L19.2 16.5L22.1 24L24.2 20.5H27.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="brand-name">acolhe<span>mente</span></span>
      </a>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="primary-navigation"
        :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="menuOpen = !menuOpen"
      >
        <span aria-hidden="true"></span><span aria-hidden="true"></span>
      </button>

      <nav id="primary-navigation" class="main-nav" :class="{ 'is-open': menuOpen }" aria-label="Navegação principal" @keydown.esc="closeMenu">
        <a href="#proposito" @click="closeMenu">Nosso propósito</a>
        <a href="#como-funciona" @click="closeMenu">Como funciona</a>
        <a href="#cuidado" @click="closeMenu">Nosso cuidado</a>
        <a class="nav-cta" href="#novidades" @click="closeMenu">Acompanhe o projeto <span aria-hidden="true">↗</span></a>
      </nav>
    </header>

    <main id="conteudo">
      <section id="inicio" class="hero section-wrap">
        <div class="hero-copy">
          <div class="eyebrow"><span class="eyebrow-dot"></span> Um novo jeito de se aproximar do cuidado</div>
          <h1>Cuidar da mente também é <em>um ato de coragem.</em></h1>
          <p class="hero-description">
            Acreditamos que encontrar acolhimento deve ser um caminho mais simples.
            Estamos construindo um espaço para aproximar pessoas e profissionais de Psicologia,
            com respeito, informação e cuidado em cada etapa.
          </p>
          <div class="hero-actions">
            <a class="button button-primary" href="#proposito">Conheça nosso propósito <span aria-hidden="true">↗</span></a>
            <a class="text-link" href="#como-funciona">Entenda a ideia <span aria-hidden="true">↓</span></a>
          </div>
          <div class="hero-note">
            <span class="note-icon" aria-hidden="true">✳</span>
            <span>Um projeto em construção, pensado para pessoas de verdade.</span>
          </div>
        </div>

        <div class="hero-art" aria-label="Ilustração abstrata de formas orgânicas que representam acolhimento e conexão" role="img">
          <div class="art-orbit orbit-one"></div>
          <div class="art-orbit orbit-two"></div>
          <div class="art-sun"></div>
          <div class="art-leaf leaf-one"></div>
          <div class="art-leaf leaf-two"></div>
          <div class="art-stem"></div>
          <div class="art-card">
            <span class="art-card-mark">✳</span>
            <span>Você não precisa<br />ter todas as respostas.</span>
          </div>
          <span class="art-caption">Cuidado que aproxima.</span>
        </div>
        <div class="hero-bottom"><span>01 / 03</span><span class="hero-line"></span><span>ACOLHIMENTO · RESPEITO · CONEXÃO</span></div>
      </section>

      <section id="proposito" class="purpose-section">
        <div class="section-wrap purpose-grid">
          <div class="section-kicker">01 — Nosso propósito</div>
          <div class="purpose-content">
            <h2>Todo mundo merece encontrar um espaço onde possa <em>ser ouvido.</em></h2>
            <p>
              O AcolheMente nasce da vontade de tornar a jornada em busca de cuidado psicológico
              mais humana e acessível. Queremos aproximar pessoas de profissionais, com informações
              claras e uma experiência que respeite o tempo, a história e a individualidade de cada um.
            </p>
            <div class="values-row">
              <div class="value-item"><span>01</span><strong>Acolhimento</strong><small>Escuta sem julgamentos.</small></div>
              <div class="value-item"><span>02</span><strong>Respeito</strong><small>Cada história importa.</small></div>
              <div class="value-item"><span>03</span><strong>Acessibilidade</strong><small>Cuidado que inclui.</small></div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" class="steps-section section-wrap">
        <div class="section-kicker">02 — Como queremos ajudar</div>
        <div class="steps-heading">
          <h2>Um caminho mais claro para chegar ao <em>cuidado.</em></h2>
          <p>Estamos começando pelo essencial. Sem pressa de fazer tudo, com compromisso de fazer bem.</p>
        </div>
        <div class="steps-grid">
          <article class="step-card">
            <span class="step-number">01</span>
            <div class="step-icon icon-search" aria-hidden="true"><span></span></div>
            <h3>Informação que orienta</h3>
            <p>Conhecer profissionais, suas modalidades de atendimento e como trabalham, com clareza e transparência.</p>
          </article>
          <article class="step-card">
            <span class="step-number">02</span>
            <div class="step-icon icon-message" aria-hidden="true"><span></span></div>
            <h3>Contato sem complicação</h3>
            <p>Um primeiro passo simples para tirar dúvidas e entender como iniciar uma conversa com o profissional.</p>
          </article>
          <article class="step-card">
            <span class="step-number">03</span>
            <div class="step-icon icon-heart" aria-hidden="true"><span>♡</span></div>
            <h3>Respeito em cada etapa</h3>
            <p>Uma experiência que valoriza privacidade, autonomia, acessibilidade e responsabilidade profissional.</p>
          </article>
        </div>
      </section>

      <section id="cuidado" class="care-section">
        <div class="section-wrap care-grid">
          <div class="care-art" aria-hidden="true">
            <div class="care-circle circle-large"></div>
            <div class="care-circle circle-small"></div>
            <div class="care-quote">“</div>
            <div class="care-quote-text">O cuidado começa quando existe espaço para acolher.</div>
            <span class="care-spark spark-a">✳</span><span class="care-spark spark-b">✳</span>
          </div>
          <div class="care-copy">
            <div class="section-kicker">03 — Nosso compromisso</div>
            <h2>Tecnologia com sensibilidade. <em>Pessoas no centro.</em></h2>
            <p>
              A tecnologia deve facilitar encontros, não substituir a escuta humana.
              Por isso, privacidade, acessibilidade e responsabilidade profissional fazem
              parte das decisões desde o primeiro passo.
            </p>
            <ul class="care-list">
              <li><span aria-hidden="true">✓</span> Respeito à privacidade e aos dados pessoais</li>
              <li><span aria-hidden="true">✓</span> Acessibilidade e linguagem inclusiva</li>
              <li><span aria-hidden="true">✓</span> Autonomia e responsabilidade dos profissionais</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="novidades" class="closing-section section-wrap">
        <div class="closing-card">
          <div class="closing-decoration" aria-hidden="true">✳</div>
          <div class="section-kicker">Estamos começando</div>
          <h2>Um passo de cada vez. <em>Com cuidado em todos eles.</em></h2>
          <p>O AcolheMente está em desenvolvimento. Em breve, compartilharemos novidades sobre a plataforma e os próximos passos.</p>
          <a class="button button-light" href="https://github.com/thiagocanali/AcolheMente" target="_blank" rel="noreferrer">
            Acompanhe a construção <span aria-hidden="true">↗</span>
          </a>
          <small>Este site é institucional e não realiza atendimento psicológico ou emergencial.</small>
        </div>
      </section>
    </main>

    <footer class="site-footer section-wrap">
      <a class="brand footer-brand" href="#inicio">
        <span class="brand-mark" aria-hidden="true">✳</span>
        <span class="brand-name">acolhe<span>mente</span></span>
      </a>
      <p>Cuidado que aproxima.</p>
      <span class="footer-copy">© {{ new Date().getFullYear() }} AcolheMente. Projeto em desenvolvimento.</span>
    </footer>
  </div>
</template>
