<template>
  <DefaultLayout>
    <div
      class="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center bg-gray-50 px-4 py-12"
    >
      <h1 class="text-[8rem] font-extrabold text-indigo-600 mb-4 animate-float">404</h1>
      <h2 class="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
        Страница не найдена
      </h2>
      <p class="text-gray-600 max-w-xl mb-6">
        Возможно, вы перешли по устаревшей ссылке или такой страницы не существует.
      </p>

      <button
        @click="router.push('/')"
        class="px-6 py-3 bg-indigo-600 text-white font-medium rounded-full shadow-md hover:bg-indigo-700 transition"
      >
        На главную
      </button>

      <div class="mt-8 w-[300px]">
        <div class="h-1 bg-indigo-100 rounded relative overflow-hidden">
          <div class="absolute top-0 left-0 h-full bg-indigo-600 animate-timer w-0"></div>
        </div>
        <p class="mt-2 text-sm text-gray-500">
          Автоматическое возвращение через {{ countdown }} сек...
        </p>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = useRouter()
const countdown = ref(8)
let intervalId: ReturnType<typeof setInterval>

onMounted(() => {
  intervalId = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value--
    } else {
      clearInterval(intervalId)
      router.push('/')
    }
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(-10px); }
  50% { transform: translateY(10px); }
}

@keyframes timer {
  to { width: 100%; }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-timer {
  animation: timer 8s linear forwards;
}
</style>
