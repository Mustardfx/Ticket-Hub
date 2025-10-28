<template>
  <AuthLayout>
    <div class="flex-1 flex items-center justify-center bg-gray-50 px-4">
      <div class="bg-white p-6 sm:p-8 rounded shadow-md w-full max-w-md">
        <h2 class="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-indigo-600">Вход</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full border rounded px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Пароль</label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full border rounded px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

          <button type="submit" class="w-full bg-indigo-600 text-white py-2.5 sm:py-3 rounded hover:bg-indigo-700 text-sm sm:text-base font-medium">
            Войти
          </button>
        </form>

        <p class="mt-4 sm:mt-6 text-sm text-center">
          Нет аккаунта?
          <router-link to="/register" class="text-indigo-600 hover:underline">Зарегистрироваться</router-link>
        </p>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import api from '../api/axios'
import { tryRefreshToken } from '../utils/token'

const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const error = ref('')

onMounted(async () => {
  const success = await tryRefreshToken()
  if (success) {
    router.push('/')
  }
})

const handleLogin = async () => {
  try {
    const res = await api.post('/token/', {
      email: form.value.email,
      password: form.value.password
    })

    // Сохраняем токены
    localStorage.setItem('access', res.data.access)
    localStorage.setItem('refresh', res.data.refresh)

    // Перенаправляем на личный кабинет
    router.push('/')
  } catch (err: any) {
    error.value = err.response?.data?.detail || 'Ошибка входа'
  }
}
</script>
