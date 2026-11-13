<script setup lang="ts">
defineProps<{
  profile?: {
    name: string
    registration: string
    introduction: string
    services?: string
    modality?: string
    location?: string
    availability?: string
  }
}>()
</script>

<template>
  <div class="profile-preview">
    <a class="skip-link" href="#perfil">Pular para o conteúdo</a>
    <header class="profile-header">
      <strong>AcolheMente</strong>
      <p>Prévia local para revisão — publicação pendente</p>
    </header>
    <main id="perfil" tabindex="-1" class="profile-main">
      <template v-if="profile">
        <p class="section-kicker">Perfil profissional</p>
        <h1>{{ profile.name }}</h1>
        <p>{{ profile.registration }}</p>
        <section aria-labelledby="apresentacao">
          <h2 id="apresentacao">Apresentação</h2>
          <p class="profile-text">{{ profile.introduction }}</p>
        </section>
        <section
          v-if="profile.services || profile.modality || profile.location || profile.availability"
          aria-labelledby="atendimento"
        >
          <h2 id="atendimento">Sobre o atendimento</h2>
          <dl>
            <template v-if="profile.services"><dt>Serviços e público</dt><dd>{{ profile.services }}</dd></template>
            <template v-if="profile.modality"><dt>Modalidade</dt><dd>{{ profile.modality }}</dd></template>
            <template v-if="profile.location"><dt>Localização</dt><dd>{{ profile.location }}</dd></template>
            <template v-if="profile.availability"><dt>Disponibilidade</dt><dd>{{ profile.availability }}</dd></template>
          </dl>
        </section>
      </template>
      <template v-else>
        <p class="section-kicker">Preparação do perfil</p>
        <h1>Conteúdo profissional pendente</h1>
        <p>A estrutura está preparada para receber as informações confirmadas pela profissional.</p>
        <section aria-labelledby="pendencias">
          <h2 id="pendencias">Informações necessárias</h2>
          <ul>
            <li>Nome profissional e CRP conferido.</li>
            <li>Apresentação e serviços revisados.</li>
            <li>Modalidade, localização e disponibilidade autorizadas.</li>
          </ul>
        </section>
      </template>
      <aside aria-label="Revisão para publicação" class="profile-note">
        O conteúdo e o canal de contato precisam ser aprovados pela profissional antes da publicação.
      </aside>
    </main>
    <footer class="profile-footer">Este site é institucional e não realiza atendimento psicológico ou emergencial.</footer>
  </div>
</template>

<style scoped>
.profile-preview { min-height: 100vh; }
.profile-header, .profile-main, .profile-footer { width: min(100% - 40px, 900px); margin-inline: auto; }
.profile-header { padding-block: 24px; border-bottom: 1px solid #cbd8cd; }
.profile-header strong { font-size: 24px; }
.profile-header p, .profile-footer { font-size: 14px; }
.profile-main { padding-block: 56px; }
h1 { font-size: clamp(36px, 6vw, 60px); overflow-wrap: anywhere; }
h2 { font-size: 28px; letter-spacing: -1px; }
section { margin-block: 36px; }
p, li, dd, aside { line-height: 1.8; overflow-wrap: anywhere; }
.profile-text { white-space: pre-line; }
dt { font-weight: 700; margin-top: 18px; }
dd { margin-left: 0; }
.profile-note { padding: 24px; background: #e7eee4; border-radius: 16px; }
.profile-footer { padding-block: 24px; border-top: 1px solid #cbd8cd; }
</style>
