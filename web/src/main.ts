import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

const savedRedirect = sessionStorage.getItem('spa-redirect')

if (savedRedirect) {
  sessionStorage.removeItem('spa-redirect')
  const redirectUrl = new URL(savedRedirect)
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '')

  if (redirectUrl.pathname === baseUrl || redirectUrl.pathname.startsWith(`${baseUrl}/`)) {
    const appPath = redirectUrl.pathname.slice(baseUrl.length) || '/'
    await router.replace(`${appPath}${redirectUrl.search}${redirectUrl.hash}`)
  }
}

await router.isReady()
app.mount('#app')
