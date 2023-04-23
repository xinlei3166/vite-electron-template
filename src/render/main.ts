import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import './styles/index.less'

const app = createApp(App)

app.use(router)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

app.mount('#app')
