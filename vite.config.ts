import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import { createStyleImportPlugin, AndDesignVueResolve } from 'vite-plugin-style-import'
import { createHtmlPlugin } from 'vite-plugin-html'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

const root = path.resolve(__dirname, 'src/render')
const publicDir = path.resolve(__dirname, 'src/render/public')
const outDir = path.resolve(__dirname, 'dist/render')

// @ts-ignore
export default ({ mode, command }) => {
  console.log('mode', mode)
  const env = loadEnv(mode, process.cwd())
  console.log('env', env)

  return defineConfig({
    define: {
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE),
      'process.env': {}
    },
    build: {
      outDir: env.VITE_OUTDIR || outDir,
      emptyOutDir: true
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            // 'primary-color': '#0077FA'
          },
          additionalData: `@import "./src/render/styles/index.less";`
        }
      }
    },
    plugins: [
      vue(),
      jsx(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: false
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false // css in js
          })
        ]
      }),
      createHtmlPlugin({
        inject: {
          data: {
            // title: 'title',
            // injectScript: `<script src="./inject.js"></script>`
          }
        }
      }),
      createStyleImportPlugin({
        resolves: [AndDesignVueResolve()]
      })
    ],
    root,
    base: './',
    publicDir,
    resolve: {
      alias: {
        '@': root
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.vue', '.json', '.less', '.scss', '.css']
    },
    esbuild: {
      drop: command === 'build' ? ['console', 'debugger'] : []
    },
    server: {
      proxy: {
        [env.VITE_API_URL]: {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
          secure: false
          // rewrite: path => path.replace(new RegExp(`^${env.VITE_API_URL}`), '')
        }
      }
    }
  })
}
