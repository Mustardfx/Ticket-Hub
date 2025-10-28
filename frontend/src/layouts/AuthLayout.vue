<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div
        class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 flex flex-wrap justify-between items-center gap-y-2 sm:gap-y-4"
      >
        <!-- Левая часть: логотип и город -->
        <div class="flex items-center gap-2 sm:gap-4">
          <router-link
            to="/"
            class="text-lg sm:text-xl font-bold text-indigo-600 hover:bg-gray-100 px-2 sm:px-4 py-2 rounded transition"
          >
            TicketHub
          </router-link>
        </div>

        <!-- Правая часть: навигация -->
        <div class="flex items-center gap-1 sm:gap-2 text-gray-600">
          <div class="h-10 flex items-center px-2 sm:px-1 rounded hover:bg-gray-100 transition">
            <LanguageSwitcher />
          </div>

          <router-link
            to="/profile/settings"
            class="h-10 w-10 flex items-center justify-center rounded hover:bg-gray-100 transition"
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
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-1 flex items-center justify-center bg-gray-50">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white shadow text-center text-xs sm:text-sm text-gray-500 py-3 sm:py-4">
      &copy; 2025 TicketHub. Все права защищены.
    </footer>
  </div>
</template>

<script setup lang="ts">
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
</script>
