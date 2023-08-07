<template>
  <a-config-provider v-bind="configProvider">
    <TokenContextHolder />
    <router-view />
  </a-config-provider>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useTheme } from '@/hooks'
import TokenContextHolder from '@/components/token/TokenContextHolder.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const theme = useTheme()

const configProvider = reactive({
  locale: zhCN,
  theme: { token: theme.value.token }
})
</script>

<style></style>
