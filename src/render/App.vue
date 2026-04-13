<template>
  <t-config-provider :global-config="globalConfig">
    <router-view />
  </t-config-provider>
</template>

<script lang="ts" setup>
import type { GlobalConfigProvider } from 'tdesign-vue-next'

const globalConfig: GlobalConfigProvider = {}
</script>

<style lang="less" scoped></style>
