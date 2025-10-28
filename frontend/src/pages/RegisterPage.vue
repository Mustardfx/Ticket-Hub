<template>
  <AuthLayout>
    <div class="flex-1 flex items-center justify-center bg-gray-50 px-4">
      <div class="bg-white shadow-md rounded-lg p-6 sm:p-8 w-full max-w-md">
        <h2 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-indigo-600">Регистрация</h2>

        <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
         <div class="relative">
            <input
              v-model="form.email"
              type="email"
              autocomplete="email"
              spellcheck="false"
              autocapitalize="off"
              required
              :class="['peer mt-1 p-2.5 block w-full rounded border shadow-sm placeholder-transparent text-sm sm:text-base',
                form.email && !emailValid ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500']"
              placeholder="Почта"
              id="email"
              aria-describedby="email-error"
              :aria-invalid="form.email && !emailValid ? 'true' : 'false'"
            />
            <label
              for="email"
              class="absolute left-2.5 -top-2.5 bg-white px-1 text-xs sm:text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-2.5 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-indigo-600"
            >
              Почта
            </label>
            <p v-if="form.email && !emailValid" id="email-error" class="text-xs sm:text-sm text-red-500 mt-1">Введите корректный email</p>
          </div>

          <div class="relative">
            <input
              v-model="form.username"
              type="text"
              autocomplete="username"
              required
              minlength="2"
              :class="['peer mt-1 p-2.5 block w-full rounded border shadow-sm placeholder-transparent text-sm sm:text-base',
                form.username && !usernameValid ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500']"
              placeholder="Имя пользователя"
              id="username"
              aria-describedby="username-error"
              :aria-invalid="form.username && !usernameValid ? 'true' : 'false'"
            />
            <label
              for="username"
              class="absolute left-2.5 -top-2.5 bg-white px-1 text-xs sm:text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-2.5 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-indigo-600"
            >
              Имя пользователя
            </label>
            <p v-if="form.username && !usernameValid" id="username-error" class="text-xs sm:text-sm text-red-500 mt-1">2–30 символов: буквы, цифры, точка, подчёркивание, дефис</p>
          </div>


          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="new-password"
              required
              minlength="6"
              class="peer mt-1 p-2.5 block w-full rounded border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border placeholder-transparent pr-10 text-sm sm:text-base"
              placeholder="Пароль"
              id="password"
              spellcheck="false"
              autocapitalize="off"
            />
            <button
              type="button"
              class="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              title="Минимум 6 символов. Рекомендуем смешивать буквы и цифры."
              tabindex="-1"
              aria-hidden="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0z" />
                <path fill="#fff" d="M9 8h2v6H9zM9 6h2v2H9z" />
              </svg>
            </button>
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              @click="showPassword = !showPassword"
              :aria-pressed="showPassword ? 'true' : 'false'"
              aria-label="Показать или скрыть пароль"
            >
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.01 9.964 7.178.07.213.07.431 0 .644C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.01-9.964-7.178z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.285 16.09 7.29 19.125 12 19.125c1.51 0 2.943-.292 4.243-.822M6.52 6.52A10.45 10.45 0 0112 4.875c4.71 0 8.715 3.035 10.066 7.125a10.522 10.522 0 01-2.314 3.651M6.52 6.52L3 3m3.52 3.52l3.53 3.53m7.43 7.43L21 21m-3.52-3.52l-3.53-3.53m0 0a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"/>
              </svg>
            </button>
            <label
              for="password"
              class="absolute left-2.5 -top-2.5 bg-white px-1 text-xs sm:text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-2.5 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-indigo-600"
            >
              Пароль
            </label>
          </div>

          <div class="relative">
            <input
              v-model="form.password2"
              :type="showPasswordConfirm ? 'text' : 'password'"
              autocomplete="new-password"
              required
              :class="['peer mt-1 p-2.5 block w-full rounded border shadow-sm placeholder-transparent pr-10 text-sm sm:text-base',
                form.password2 && !passwordsMatch ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500']"
              placeholder="Подтвердите пароль"
              id="password2"
              spellcheck="false"
              autocapitalize="off"
              :aria-invalid="form.password2 && !passwordsMatch ? 'true' : 'false'"
              aria-describedby="password-mismatch"
            />
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              @click="showPasswordConfirm = !showPasswordConfirm"
              :aria-pressed="showPasswordConfirm ? 'true' : 'false'"
              aria-label="Показать или скрыть подтверждение пароля"
            >
              <svg v-if="!showPasswordConfirm" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.01 9.964 7.178.07.213.07.431 0 .644C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.01-9.964-7.178z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.285 16.09 7.29 19.125 12 19.125c1.51 0 2.943-.292 4.243-.822M6.52 6.52A10.45 10.45 0 0112 4.875c4.71 0 8.715 3.035 10.066 7.125a10.522 10.522 0 01-2.314 3.651M6.52 6.52L3 3m3.52 3.52l3.53 3.53m7.43 7.43L21 21m-3.52-3.52l-3.53-3.53m0 0a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"/>
              </svg>
            </button>
            <label
              for="password2"
              class="absolute left-2.5 -top-2.5 bg-white px-1 text-xs sm:text-sm text-gray-600 transition-all peer-placeholder-shown:text-sm sm:peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2.5 peer-focus:-top-2.5 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-indigo-600"
            >
              Подтвердите пароль
            </label>
          </div>

          <p v-if="form.password2 && !passwordsMatch" id="password-mismatch" class="text-xs sm:text-sm text-red-500 -mt-2">Пароли не совпадают</p>

          <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

          <button :disabled="loading || !form.email || !form.username || !form.password || !passwordsMatch || !emailValid || !usernameValid"
            type="submit"
            class="w-full bg-indigo-600 text-white py-2.5 sm:py-3 rounded hover:bg-indigo-700 transition text-sm sm:text-base font-medium"
          >
            {{ loading ? 'Загрузка...' : 'Зарегистрироваться' }}
          </button>
        </form>

        <p class="text-xs sm:text-sm text-gray-500 text-center mt-4 sm:mt-6">
          Уже есть аккаунт?
          <router-link to="/login" class="text-indigo-600 hover:underline">Войти</router-link>
        </p>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api/axios'
import AuthLayout from '@/layouts/AuthLayout.vue'
const router = useRouter()

const form = ref({
  email: '',
  username: '',
  name: '',
  password: '',
  password2: '',
})

const error = ref('')
const loading = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const passwordsMatch = computed(() => form.value.password === form.value.password2)
const emailValid = computed(() => /.+@.+\..+/.test(form.value.email))
const usernameValid = computed(() => /^[A-Za-z0-9._-]{2,30}$/.test(form.value.username))


const handleSubmit = async () => {
  if (!passwordsMatch.value) {
    error.value = 'Пароли не совпадают'
    return
  }
  error.value = ''

  try {
    loading.value = true
    await api.post('/register/', {
      email: form.value.email,
      username: form.value.username,
      name: form.value.username,
      password: form.value.password,
    })

    const loginResp = await api.post('/token/', {
      email: form.value.email,
      password: form.value.password
    })

    localStorage.setItem('access', loginResp.data.access)
    localStorage.setItem('refresh', loginResp.data.refresh)

    router.push('/')
  } catch (err) {
    const maybeAxios = err as { response?: { data?: unknown } }
    const data = maybeAxios.response?.data as Record<string, string[] | string> | undefined
    if (typeof data === 'object') {
      error.value = Object.values(data).flat().join(', ')
    } else {
      error.value = 'Ошибка регистрации'
    }
  } finally {
    loading.value = false
  }
}

watch(() => form.value.username, (newVal) => {
  form.value.name = newVal
})


</script>
