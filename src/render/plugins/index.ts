import type { App } from 'vue'
import bus from './bus'
import icon from './icon'

export default {
  install: (app: App) => {
    app.use(icon)
    app.use(bus)
  }
}
