<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Header - фиксированный -->
    <header class="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div
        class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex flex-wrap justify-between items-center gap-y-2 sm:gap-y-4"
      >
        <!-- Левая часть: кнопка назад, логотип и город -->
        <div class="flex items-center gap-2 sm:gap-4">
          <!-- Кнопка назад — именованный слот -->
          <slot name="backButton" />

          <router-link
            to="/"
            class="text-lg sm:text-xl font-bold text-indigo-600 hover:bg-gray-100 px-2 sm:px-4 py-2 rounded transition"
          >
            TicketHub
          </router-link>

          <!-- Селектор города — именованный слот -->
          <slot name="citySelector" />
        </div>

        <!-- Правая часть: навигация -->
        <div class="flex items-center gap-1 sm:gap-2 text-gray-600">
          <router-link
            to="/profile/tickets"
            class="hidden sm:flex h-10 px-4 items-center gap-2 rounded hover:bg-gray-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
              />
            </svg>
            <span>Мои билеты</span>
          </router-link>

          <div class="h-10 flex items-center px-2 sm:px-1 rounded hover:bg-gray-100 transition">
            <LanguageSwitcher />
          </div>

          <div
          class="h-10 w-10 flex items-center justify-center rounded hover:bg-gray-100 transition"
          @click="goToProfile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content - с отступом сверху для фиксированной шапки -->
    <main class="flex-1 pt-[72px] sm:pt-[80px]">
      <slot name="fullWidthTop" />
      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 border-t border-gray-200 text-center text-xs sm:text-sm text-gray-500 py-3 sm:py-4">
      &copy; 2025 TicketHub. Все права защищены.
    </footer>
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import { useRouter } from 'vue-router';
import { jwtDecode } from 'jwt-decode'

const router = useRouter()

function isTokenValid(token: string | null): boolean {
  if (!token) return false
  try {
    const decoded = jwtDecode<{ exp: number }>(token)
    return decoded.exp > Date.now() / 1000
  } catch {
    return false
  }
}

const goToProfile = () => {
  const token = localStorage.getItem('access')
  const isValid = isTokenValid(token)

  const target = isValid ? '/profile/settings' : '/login'

  if (router.currentRoute.value.path !== target) {
    router.push(target)
  }
}

//

</script>
