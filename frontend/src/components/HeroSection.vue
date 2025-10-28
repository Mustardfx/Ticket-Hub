<template>
  <section class="bg-gray-100/70 min-h-[60vh] sm:min-h-0 sm:py-8 sm:py-10 md:py-14">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 text-center py-8 sm:py-10 md:py-14 flex flex-col justify-center min-h-[60vh] sm:min-h-0">
      <h1 class="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
        {{ title }}
        <span v-if="accent" class="block text-indigo-600">{{ accent }}</span>
      </h1>
      <p v-if="subtitle" class="mt-4 sm:mt-4 text-gray-600 max-w-3xl mx-auto text-lg sm:text-lg px-2 leading-relaxed">{{ subtitle }}</p>
      <div class="mt-4 sm:mt-6">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title: string; accent?: string; subtitle?: string }>()
</script>


