import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

if (import.meta.env.DEV && new URLSearchParams(window.location.search).get('preview') === 'profile') {
  import('./components/ProfessionalProfile.vue').then(({ default: ProfessionalProfile }) => {
    createApp(ProfessionalProfile).mount('#app')
  })
} else {
  createApp(App).mount('#app')
}
