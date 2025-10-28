<template>
  <div class="flex items-center gap-2">
    <input
      type="number"
      :value="min"
      @input="$emit('update:min', ($event.target as HTMLInputElement).valueAsNumber || null)"
      min="0"
      placeholder="0"
      class="w-20 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:border-indigo-500 text-base"
    />
    <span class="text-gray-500">₸</span>
    <span class="text-gray-600 text-base ml-2">до:</span>
    <input
      type="number"
      :value="max"
      @input="$emit('update:max', ($event.target as HTMLInputElement).valueAsNumber || null)"
      min="0"
      placeholder=""
      class="w-20 px-2 py-1 border rounded-lg focus:outline-none focus:ring focus:border-indigo-500 text-base"
    />
    <span class="text-gray-500">₸</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  min: number | null
  max: number | null
}>()
const emit = defineEmits<{
  (e: 'update:min', value: number | null): void
  (e: 'update:max', value: number | null): void
}>()
</script>
