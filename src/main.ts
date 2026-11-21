import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { showPreviewStatus } from './preview/previewStatus'

const preview = import.meta.env.DEV
  ? new URLSearchParams(window.location.search).get('preview')
  : null

if (preview === 'profile' || preview === 'profile-demo') {
  showPreviewStatus()
  Promise.all([
    import('./components/ProfessionalProfile.vue'),
    preview === 'profile-demo' ? import('./preview/profileDemo') : Promise.resolve(undefined),
  ]).then(([{ default: ProfessionalProfile }, demo]) => {
    createApp(ProfessionalProfile, { profile: demo?.profileDemo, demonstration: !!demo }).mount('#app')
  }).catch(() => showPreviewStatus(true))
} else if (preview === 'admin') {
  showPreviewStatus()
  import('./components/AdminWorkflowPreview.vue').then(({ default: AdminWorkflowPreview }) => {
    createApp(AdminWorkflowPreview).mount('#app')
  }).catch(() => showPreviewStatus(true))
} else {
  createApp(App).mount('#app')
}
