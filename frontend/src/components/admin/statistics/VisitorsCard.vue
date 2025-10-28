<script setup lang="ts">
const props = defineProps<{ count: number; title: string }>()
</script>

<template>
  <div class="p-4 bg-white shadow rounded-xl text-center">
    <h3 class="text-lg font-semibold">{{ props.title }}</h3>
    <p class="text-2xl font-bold">{{ props.count.toLocaleString() }}</p>
  </div>
</template>
