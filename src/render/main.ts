import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'
import plugins from './plugins'
import router from './router'
import 'tdesign-vue-next/es/style/index.css'
import './styles/index.less'
import './styles/reset.less'
import 'animate.css'
import 'virtual:uno.css'

const app = createApp(App)

app.use(router)
const pinia = createPinia()
pinia.use(persistedState)
app.use(pinia)
app.use(plugins)

app.mount('#app')

if (import.meta.env.PROD) {
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
