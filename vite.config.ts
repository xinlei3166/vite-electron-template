import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { loadEnv, defineConfig } from 'vite'

const root = path.resolve(__dirname, 'src/render')
const publicDir = path.resolve(__dirname, 'src/render/public')
const outDir = path.resolve(__dirname, 'dist/render')

// @ts-ignore
export default ({ mode, command }) => {
  const isBuild = command === 'build'
  console.log('mode', mode)
  const envDir = path.resolve(__dirname)
  const env = loadEnv(mode, envDir)
  console.log('env', env)

  return defineConfig({
    define: {
      __APP_TITLE__: JSON.stringify(env.VITE_APP_TITLE),
      'process.env': {}
    },
    envDir,
    build: {
      outDir,
      emptyOutDir: true,
      rolldownOptions: {
        output: {
          minify: {
            compress: {
              dropConsole: isBuild,
              dropDebugger: isBuild
            }
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        //   less: {
        //     javascriptEnabled: true,
        //     modifyVars: {
        //       '@brand-color': '#0077FA'
        //     },
        //     additionalData: `@import "./src/render/styles/theme.less";`
        //   }
      }
    },
    plugins: [
      vue(),
      jsx(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        resolvers: [
          TDesignResolver({
            library: 'vue-next'
          })
        ],
        dts: false
      }),
      Components({
        resolvers: [
          TDesignResolver({
            library: 'vue-next'
          })
        ]
      })
      // {
      //   name: 'html-transform',
      //   transformIndexHtml(html) {
      //     return {
      //       html: html.replace('%title%', env.VITE_APP_TITLE),
      //       tags: [
      //         {
      //           tag: 'script',
      //           attrs: { src: './inject.js' },
      //           injectTo: 'head'
      //         }
      //       ]
      //     }
      //   }
      // }
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
    server: {
      proxy: {
        [env.VITE_API_URL]: {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_API_URL}`), '')
        }
      }
    }
  })
}
