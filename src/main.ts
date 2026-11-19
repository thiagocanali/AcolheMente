import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const preview = import.meta.env.DEV
  ? new URLSearchParams(window.location.search).get('preview')
  : null

if (preview === 'profile' || preview === 'profile-demo') {
  Promise.all([
    import('./components/ProfessionalProfile.vue'),
    preview === 'profile-demo' ? import('./preview/profileDemo') : Promise.resolve(undefined),
  ]).then(([{ default: ProfessionalProfile }, demo]) => {
    createApp(ProfessionalProfile, { profile: demo?.profileDemo, demonstration: !!demo }).mount('#app')
  })
} else if (preview === 'admin') {
  import('./components/AdminWorkflowPreview.vue').then(({ default: AdminWorkflowPreview }) => {
    createApp(AdminWorkflowPreview).mount('#app')
  })
} else {
  createApp(App).mount('#app')
}
