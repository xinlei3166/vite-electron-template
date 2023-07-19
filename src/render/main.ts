import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import './styles/index.less'
import 'animate.css'
import 'virtual:uno.css'

const app = createApp(App)

app.use(router)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)

app.mount('#app')

if (import.meta.env.MODE !== 'development') {
  app.config.errorHandler = (err, vm, info) => {
    console.group('vue_global_error')
    console.log('捕获到异常：', { err, vm, info })
    console.groupEnd()
  }

  window.onerror = function (message, source, lineno, colno, error) {
    console.group('window_global_error')
    console.log('捕获到异常：', { message, source, lineno, colno, error })
    console.groupEnd()
  }
}
