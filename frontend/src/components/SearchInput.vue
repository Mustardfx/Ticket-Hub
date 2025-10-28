<template>
  <div class="relative w-full">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      type="text"
      :placeholder="placeholder || 'Поиск по названию...'"
      @keyup.enter="$emit('search')"
      :class="borderless
        ? 'w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-transparent border-0 outline-none focus:ring-0 text-sm sm:text-base'
        : flat
          ? 'w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 rounded-full bg-gray-100 border border-transparent focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base shadow-none'
          : 'w-full pl-8 sm:pl-10 pr-4 py-2.5 sm:py-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-indigo-500 text-sm sm:text-base'"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 pointer-events-none"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
  flat?: boolean
  borderless?: boolean
}>()
defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
}>()
</script>
