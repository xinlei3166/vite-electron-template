import type { Ref } from 'vue'
import { ref } from 'vue'

export interface Theme {
  theme: 'dark' | 'light'
  layout: 'side' | 'mix'
  mode: 'normal' | 'popup'
  width: string
  height: string
  collapsed: boolean
  collapsedWidth: string
  headerTheme: boolean
  showBreadcrumb: boolean
  themeColor: string
}

const theme = ref<Theme>({
  theme: 'light', // light, dark
  layout: 'mix', // side, mix
  mode: 'normal',
  width: '240px',
  height: '64px',
  collapsed: false,
  collapsedWidth: '64px',
  headerTheme: false,
  showBreadcrumb: false, // 是否显示面包屑
  themeColor: '#0077fa'
})

export const useTheme = function (): Ref<Theme> {
  return theme
}
