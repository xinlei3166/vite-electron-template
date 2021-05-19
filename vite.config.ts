import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import path from 'path'
import { injectHtml } from 'vite-plugin-html'

const outDir = path.resolve(__dirname, 'dist/render')
const renderDir = path.resolve(__dirname, 'src/render')
const publicDir = path.resolve(__dirname, 'src/render/public')

// @ts-ignore
export default ({ mode }) => {
  // const env = loadEnv(mode, process.cwd())
  // const base = env.VITE_APP_ENV === 'production' ? CDN_PATH : '/'
  return defineConfig({
    publicDir,
    base: './',
    plugins: [
      vue(),
      styleImport({
        libs: [
          {
            libraryName: 'ant-design-vue',
            esModule: true,
            resolveStyle: name => {
              return `ant-design-vue/es/${name}/style/css`
            }
          }
        ]
      })
      // injectHtml({
      //   injectData: {
      //     VITE_DEPLOY_ENV: env.VITE_DEPLOY_ENV
      //   }
      // })
    ],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "./src/render/styles/index.less";`
        }
      }
    },
    build: {
      outDir,
      emptyOutDir: true
    },
    define: {
      'process.env': {}
    },
    resolve: {
      alias: {
        '@': renderDir
      }
    }
  })
}
