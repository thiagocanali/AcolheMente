import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

const preview = import.meta.env.DEV
  ? new URLSearchParams(window.location.search).get('preview')
  : null

if (preview === 'profile') {
  import('./components/ProfessionalProfile.vue').then(({ default: ProfessionalProfile }) => {
    createApp(ProfessionalProfile).mount('#app')
  })
} else if (preview === 'admin') {
  import('./components/AdminWorkflowPreview.vue').then(({ default: AdminWorkflowPreview }) => {
    createApp(AdminWorkflowPreview).mount('#app')
  })
} else {
  createApp(App).mount('#app')
}
