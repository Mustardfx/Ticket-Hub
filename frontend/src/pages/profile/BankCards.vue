<template>
  <DefaultLayout>
    <ProfileLayout>
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">Банковские карты</h2>
                <button
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          @click="redirectToPaymentService"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Добавить карту
        </button>
      </div>

      <!-- Состояние загрузки -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Состояние ошибки -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <p class="text-gray-600">{{ error }}</p>
      </div>

      <!-- Пустое состояние -->
      <div v-else-if="bankCards.length === 0" class="text-center py-12">
        <div class="relative inline-block mb-6">
          <svg class="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
          </svg>
          <div class="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">У вас пока нет сохраненных карт</h3>
      </div>

      <!-- Список карт -->
      <div v-else class="space-y-4">
        <div
          v-for="card in bankCards"
          :key="card.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded flex items-center justify-center">
                <svg class="w-6 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <p class="font-medium">•••• •••• •••• {{ card.card_mask.slice(-4)}}</p>
                <p class="text-sm text-gray-500">{{ card.card_type }} • Истекает {{ card.card_expire}}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span v-if="card.is_default" class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Основная
              </span>
              <button
                @click="deleteCard(card.id)"
                class="text-red-600 hover:text-red-800 p-1"
                title="Удалить карту"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ProfileLayout from '@/layouts/ProfileLayout.vue'
import { ref, onMounted, computed } from 'vue'
import api from '@/api/axios'
import type { BankCard } from '@/types/profile'

const bankCards = ref<BankCard[]>([])
const isLoading = ref(true)
const error = ref('')

const fetchBankCards = async () => {
  try {
    isLoading.value = true
    error.value = ''

    const response = await api.get('/payments/cards/')
    bankCards.value = response.data
  } catch (err) {
    console.error('Ошибка загрузки карт:', err)
    error.value = 'Не удалось загрузить список карт'
  } finally {
    isLoading.value = false
  }
}

const deleteCard = async (cardId: number) => {
  if (!confirm('Вы уверены, что хотите удалить эту карту?')) {
    return
  }

  try {
    // TODO: Заменить на реальный API endpoint
    await api.delete(`/profile/bank-cards/${cardId}/`)
    await fetchBankCards()
  } catch (err) {
    console.error('Ошибка удаления карты:', err)
    alert('Не удалось удалить карту')
  }
}

const redirectToPaymentService = async () => {
  try {
    isLoading.value = true
    error.value = ''

    const response = await api.post('/payments/cards/save/')
    const redirectUrl = response.data.redirect_url

    if (redirectUrl) {
      window.location.href = redirectUrl
    } else {
      error.value = 'Не удалось получить ссылку на добавление карты'
    }
  } catch (err) {
    console.error('Ошибка при получении redirect_url:', err)
    error.value = 'Произошла ошибка при инициализации добавления карты'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchBankCards)
</script>
