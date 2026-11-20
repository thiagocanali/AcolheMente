<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import {
  requestStatuses,
  transitionRequest,
  type RequestStatus,
} from '../domain/administrative-request'

type DemoRequest = { id: string; status: RequestStatus }
const labels: Record<RequestStatus, string> = {
  received: 'Recebida',
  reviewing: 'Em análise',
  contacted: 'Contato registrado',
  closed: 'Encerrada',
}

// Local, ephemeral fixtures: no personal data, persistence, API or login.
const requests = ref<DemoRequest[]>([
  { id: 'DEMO-001', status: 'received' },
  { id: 'DEMO-002', status: 'reviewing' },
  { id: 'DEMO-003', status: 'contacted' },
])
const filter = ref<'all' | RequestStatus>('all')
const message = ref('')
const statusFilter = ref<HTMLSelectElement | null>(null)
const visible = computed(() => requests.value.filter(item => filter.value === 'all' || item.status === filter.value))

async function move(id: string, next: RequestStatus, event: MouseEvent) {
  const trigger = event.currentTarget as HTMLButtonElement
  const card = trigger.closest<HTMLElement>('.admin-card')
  const hadFocus = document.activeElement === trigger
  const item = requests.value.find(request => request.id === id)
  if (!item) return
  const result = transitionRequest(item.status, next)
  if (!result.ok) {
    message.value = 'Transição não permitida.'
    return
  }
  requests.value = requests.value.map(request =>
    request.id === id ? { ...request, status: result.status } : request,
  )
  message.value = 'Estado atualizado apenas nesta prévia local.'
  await nextTick()
  // Restore context only when this action removed the focused control.
  // Preserve a focus change made elsewhere while the view was updating.
  if (!hadFocus || trigger.isConnected || document.activeElement !== document.body) return
  if (card?.isConnected) {
    (card.querySelector<HTMLButtonElement>('button') ?? card).focus()
  } else {
    statusFilter.value?.focus()
  }
}

function allowed(status: RequestStatus): RequestStatus[] {
  return requestStatuses.filter(next => transitionRequest(status, next).ok)
}

function reset() {
  requests.value = [
    { id: 'DEMO-001', status: 'received' },
    { id: 'DEMO-002', status: 'reviewing' },
    { id: 'DEMO-003', status: 'contacted' },
  ]
  filter.value = 'all'
  message.value = 'Dados fictícios restaurados.'
}
</script>

<template>
  <div class="admin-preview">
    <a href="#painel" class="skip-link">Pular para o painel</a>
    <header class="admin-header">
      <strong>AcolheMente</strong>
      <span>Protótipo local · sem autenticação ou dados reais</span>
    </header>
    <main id="painel" tabindex="-1" class="admin-main">
      <p class="admin-kicker">Homologação de interface</p>
      <h1>Solicitações administrativas</h1>
      <p>Esta prévia funciona somente no servidor de desenvolvimento. Os registros são fictícios e as alterações desaparecem ao recarregar a página. Não é um painel pronto para produção.</p>
      <div class="admin-controls">
        <label for="status-filter">Filtrar por situação</label>
        <select id="status-filter" ref="statusFilter" v-model="filter">
          <option value="all">Todas</option>
          <option v-for="status in requestStatuses" :key="status" :value="status">{{ labels[status] }}</option>
        </select>
        <button type="button" @click="reset">Restaurar demonstração</button>
      </div>
      <p role="status" aria-live="polite">{{ message }}</p>
      <p v-if="visible.length === 0" class="admin-empty" role="status" aria-live="polite">Nenhuma solicitação fictícia neste filtro.</p>
      <ul v-else class="admin-list" aria-label="Solicitações fictícias">
        <li v-for="item in visible" :key="item.id" class="admin-card" tabindex="-1" :aria-labelledby="`request-title-${item.id}`" :aria-describedby="`request-status-${item.id}`">
          <div><strong :id="`request-title-${item.id}`">{{ item.id }}</strong><span :id="`request-status-${item.id}`" class="admin-status">{{ labels[item.status] }}</span></div>
          <div class="admin-actions">
            <button v-for="next in allowed(item.status)" :key="next" type="button" :aria-label="`Mover para ${labels[next].toLowerCase()} (solicitação ${item.id})`" @click="move(item.id, next, $event)">
              Mover para {{ labels[next].toLowerCase() }}
            </button>
            <span v-if="allowed(item.status).length === 0">Estado final</span>
          </div>
        </li>
      </ul>
      <aside class="admin-note">Não inserir nomes, contatos, informações clínicas ou dados reais nesta prévia. Os estados ainda dependem de aprovação profissional e de privacidade.</aside>
    </main>
  </div>
</template>

<style scoped>
.admin-preview { min-height: 100vh; }
.admin-header, .admin-main { width: min(100% - 36px, 980px); margin-inline: auto; }
.admin-header { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between; padding: 24px 0; border-bottom: 1px solid #cbd8cd; }
.admin-header strong { font-size: 22px; }
.admin-header span { color: #58685f; font-size: 13px; }
.admin-main { padding: 54px 0 80px; }
.admin-main h1 { font-size: clamp(32px, 5vw, 52px); }
.admin-main p { max-width: 760px; line-height: 1.7; }
.admin-kicker { color: #315c4c; font-weight: 700; }
.admin-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin: 28px 0 10px; }
.admin-controls label { font-weight: 700; }
.admin-preview select, .admin-preview button { padding: 11px 14px; border: 1px solid #9fb7a4; border-radius: 9px; background: white; color: #23352f; cursor: pointer; }
.admin-preview button:hover { background: #e7eee4; }
.admin-preview button:focus-visible, .admin-preview select:focus-visible, .admin-card:focus-visible { outline: 3px solid #d18f6c; outline-offset: 3px; }
.admin-list { padding: 0; list-style: none; display: grid; gap: 15px; }
.admin-card { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 18px; align-items: center; padding: 20px; background: #fff; border: 1px solid #d9e3d9; border-radius: 14px; }
.admin-card > div:first-child { display: flex; flex-direction: column; gap: 8px; }
.admin-status { font-size: 13px; color: #315c4c; }
.admin-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.admin-empty, .admin-note { padding: 20px; background: #e7eee4; border-radius: 12px; }
.admin-note { margin-top: 32px; line-height: 1.7; }
@media (max-width: 480px) {
  .admin-main { padding-top: 36px; }
  .admin-controls { align-items: stretch; flex-direction: column; }
  .admin-controls select, .admin-controls button { width: 100%; min-height: 44px; }
  .admin-card { padding: 16px; }
  .admin-actions { width: 100%; flex-direction: column; }
  .admin-actions button { width: 100%; min-height: 44px; text-align: left; }
  .admin-card strong, .admin-status { overflow-wrap: anywhere; }
}
@media (prefers-reduced-motion: reduce) {
  .admin-preview * { scroll-behavior: auto; }
}
</style>
