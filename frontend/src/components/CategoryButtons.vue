<template>
  <section class="mb-6 sm:mb-8">
    <div class="w-full max-w-6xl mx-auto">
      <div class="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center items-center gap-3 sm:gap-4 md:gap-6 px-2 overflow-x-auto sm:overflow-x-visible scrollbar-hide">
        <button
          v-for="category in CATEGORIES"
          :key="category.name"
          @click="selectCategory(category.name)"
          :class="[
            'flex items-center justify-center gap-2 sm:gap-2 px-4 sm:px-4 py-3 sm:py-2.5 min-w-[120px] sm:min-w-[120px] text-center rounded-xl border text-base sm:text-base font-medium transition-all duration-200 flex-shrink-0',
            activeCategory === category.name
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
              : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
          ]"
        >
          <span v-html="category.icon" class="w-5 h-5 sm:w-5 sm:h-5"></span>
          <span class="font-medium">{{ category.label }}</span>
        </button>
      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { CATEGORIES } from '@/data/ticket-hub'
import { ref } from 'vue'
// Emit to parent
const emit = defineEmits<{
  (e: 'select', categoryName: string): void
}>()

const activeCategory = ref('all')

const selectCategory = (categoryName: string) => {
  activeCategory.value = categoryName
  emit('select', categoryName)
}
</script>
