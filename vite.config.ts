import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { loadEnv, defineConfig, lazyPlugins } from 'vite-plus'

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
    fmt: {
      printWidth: 100,
      semi: false,
      singleQuote: true,
      proseWrap: 'never',
      arrowParens: 'avoid',
      bracketSpacing: true,
      htmlWhitespaceSensitivity: 'ignore',
      jsxBracketSameLine: false,
      jsxSingleQuote: false,
      trailingComma: 'none',
      vueIndentScriptAndStyle: false,
      embeddedLanguageFormatting: 'auto',
      sortPackageJson: true,
      sortImports: {
        newlinesBetween: false,
        groups: [
          'type-import',
          ['value-builtin', 'value-external'],
          'package-scoped',
          'type-internal',
          'value-internal',
          ['type-parent', 'type-sibling', 'type-index'],
          ['value-parent', 'value-sibling', 'value-index'],
          'unknown'
        ],
        customGroups: [
          {
            groupName: 'package-scoped',
            elementNamePattern: ['@packages/**']
          }
        ]
      },
      ignorePatterns: [
        'dist',
        'public',
        'node_modules',
        'iconfont.js',
        'packages/docs/.vitepress/cache',
        'components.d.ts'
      ]
    },
    lint: {
      plugins: ['typescript', 'vue'],
      categories: {
        correctness: 'warn'
      },
      env: {
        builtin: true
      },
      rules: {
        'no-var': 'error',
        'prefer-const': 'warn',
        eqeqeq: 'warn',
        'no-unused-vars': 'warn',
        'vite-plus/prefer-vite-plus-imports': 'error'
      },
      ignorePatterns: [
        'dist',
        'public',
        'node_modules',
        'iconfont.js',
        'packages/docs/.vitepress/cache',
        'components.d.ts'
      ],
      options: {
        typeAware: true,
        typeCheck: true
      },
      jsPlugins: [
        {
          name: 'vite-plus',
          specifier: 'vite-plus/oxlint-plugin'
        }
      ]
    },
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
    plugins: lazyPlugins(() => [
      vue(),
      jsx(),
      vueDevTools(),
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
    ]),
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
