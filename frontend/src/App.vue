<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useUserStore } from './stores/useStores'
import { computed, onMounted } from 'vue'
import { tryRefreshToken } from '@/utils/token'

const { t } = useI18n({ useScope: 'global' })
const route = useRoute()
const userStore = useUserStore()

// Layout определяется по meta-данным
const layout = computed(() => {
  if (route.meta.requiresAdmin && !userStore.isAdmin) {
    return 'DefaultLayout'
  }
  const layoutName = route.meta.layout || 'default'
  return `${layoutName}Layout`
})

// Попытка обновить токен при монтировании
onMounted(() => {
  tryRefreshToken()
})
</script>

<style scoped>
/* Добавь свои стили тут */
</style>
