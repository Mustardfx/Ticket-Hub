<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
      <!-- Левая колонка -->
      <aside class="w-full md:w-1/4 space-y-6">
        <!-- Блок пользователя -->
        <div class="flex items-center gap-4 bg-white rounded-xl shadow p-4">
        <div class="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg font-bold">
          {{ (localForm.name?.[0] ?? '') }}{{ (localForm.surname?.[0] ?? '') }}
        </div>
          <div class="text-left">
            <p class="font-semibold">{{ localForm.name }} {{ localForm.surname }}</p>
            <p class="text-sm text-gray-500">{{ localForm.email }}</p>
          </div>
        </div>

        <!-- Меню -->
        <nav class="bg-white rounded-xl shadow p-4 space-y-2">
          <!-- Профиль -->
          <router-link
            to="/profile/settings"
            class="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
            active-class="bg-indigo-100 text-indigo-700 font-medium"
          >
            Профиль
          </router-link>
          <!-- Мои Билеты -->
          <router-link
            to="/profile/tickets"
            class="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
            active-class="bg-indigo-100 text-indigo-700 font-medium"
          >
            Мои билеты
          </router-link>
          <!-- Банковские карты -->
          <router-link
            to="/profile/bank-cards"
            class="block px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
            active-class="bg-indigo-100 text-indigo-700 font-medium"
          >
            Банковские карты
          </router-link>
        </nav>

        <!-- Кнопка выхода -->
        <button
          @click="handleLogout"
          class="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Выйти
        </button>
      </aside>

      <!-- Правая колонка (контент) -->
      <section class="w-full md:w-3/4">
        <div class="bg-white rounded-xl shadow p-6 min-h-[300px]">
          <slot />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfile } from '@/composables/useProfile';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const { profile, isLoaded, error, fetchProfile } = useProfile()
const localForm = reactive({ ...profile.value})
const router = useRouter()

function toISO(dateStr: string): string {
  // из 'дд.мм.гггг' в 'гггг-мм-дд'
  const [d, m, y] = dateStr.split('.');
  return `${y}-${m}-${d}`;
}

function toLocalFormat(dateStr: string): string {
  // Из 'гггг-мм-дд' в 'дд.мм.гггг'
  const [y, m, d] = dateStr.split('-');
  return `${d}.${m}.${y}`;
}

watch(profile, (newValue: any) => {
  Object.assign(localForm, {
    ...newValue,
    birthday: newValue.birthday ? toLocalFormat(newValue.birthday) : null
  });
})

const handleLogout = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  router.push('/login')
}
</script>
