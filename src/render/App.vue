<template>
  <t-config-provider :global-config="globalConfig">
    <router-view />
  </t-config-provider>
</template>

<script lang="ts" setup>
import type { GlobalConfigProvider } from 'tdesign-vue-next'
import zhConfig from 'tdesign-vue-next/es/locale/zh_CN'

const globalConfig: GlobalConfigProvider = zhConfig as any
</script>

<style lang="less" scoped></style>
