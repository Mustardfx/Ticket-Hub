<template>
  <section class="mt-10">
    <h2 class="text-2xl font-semibold mb-4">Отзывы посетителей</h2>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="review in randomReviews"
        :key="review.id"
        class="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
      >
        <p class="text-gray-700 italic mb-2">
          "{{ review.text.length > 150 ? review.text.slice(0, 150) + '...' : review.text }}"
        </p>
        <div class="flex items-center gap-2">
          <div
            class="bg-indigo-100 text-indigo-600 w-8 h-8 flex items-center justify-center rounded-full font-bold"
          >
            {{ review.name[0] }}
          </div>
          <div>
            <p class="font-medium text-gray-800">{{ review.name }}</p>
            <p class="text-sm text-gray-500">{{ review.location }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { mockReviews } from '@/mock/reviews'

// Можно случайно перемешать отзывы, чтобы были разные при каждой загрузке
const randomReviews = computed(() => {
  return [...mockReviews].sort(() => 0.5 - Math.random()).slice(0, 3)
})
</script>
