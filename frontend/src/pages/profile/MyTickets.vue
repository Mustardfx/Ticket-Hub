<template>
  <DefaultLayout>
    <ProfileLayout>
      <h2 class="text-2xl font-semibold mb-6">Мои билеты</h2>

      <!-- Состояние загрузки -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>

      <!-- Состояние ошибки -->
      <div v-else-if="ticketError" class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
          </svg>
        </div>
        <p class="text-gray-600">{{ ticketError }}</p>
      </div>

      <!-- Пустое состояние -->
      <div v-else-if="tickets.length === 0" class="text-center py-12">
        <div class="relative inline-block mb-6">
          <svg class="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
          </svg>
          <div class="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
        </div>
        <h3 class="text-xl font-medium text-gray-900 mb-2">У вас пока нет купленных билетов</h3>
        <p class="text-gray-500">Откройте для себя культурные объекты и приобретите билеты на интересные мероприятия</p>
      </div>

      <!-- Список билетов -->
      <div v-else class="space-y-4">
        <div
          v-for="ticket in tickets"
          :key="ticket.id"
          class="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded flex items-center justify-center">
                  <svg class="w-6 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ ticket.cultural_object_name }}</h3>
                  <p class="text-sm text-gray-500">
                    {{ ticket.visit_date }} в {{ ticket.visit_time }}
                  </p>
                </div>
              </div>

              <div class="flex items-center gap-4 mb-4">
                                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                  <span class="text-gray-700 font-medium">
                    {{ formatPrice(ticket.cultural_object?.price) }} ₸
                  </span>
                </div>

                <div v-if="ticket.qr_code" class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V6a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1zm12 0h2a1 1 0 001-1V6a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1zM5 20h2a1 1 0 001-1v-1a1 1 0 00-1-1H5a1 1 0 00-1 1v1a1 1 0 001 1z"/>
                  </svg>
                  <span class="text-xs text-gray-500">QR: {{ ticket.qr_code }}</span>
                </div>
              </div>

              <div class="flex items-center gap-3">
                <span
                  v-if="ticket.is_used"
                  class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  Использован
                </span>
                <span
                  v-else-if="ticket.is_refunded"
                  class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                >
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  Возвращён
                </span>
                <span
                  v-else
                  class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  Активен
                </span>
              </div>
            </div>

            <div class="flex flex-col items-end gap-2">
              <button
                v-if="!ticket.is_refunded && !ticket.is_used"
                @click="refundTicket(ticket.id)"
                class="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                title="Вернуть билет"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
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
import {ref, onMounted} from 'vue'
import api from '@/api/axios';
import type { Ticket } from '@/types/ticket';
const tickets = ref<Ticket[]>([])
const isLoading = ref(true)
const ticketError = ref<string | null>(null)

const fetchTickets = async () => {
  try {
    const res = await api.get('profile/tickets/')
    tickets.value = res.data.results
  } catch {
    ticketError.value = 'Не удалось загрузить билеты'
  } finally {
    isLoading.value = false
  }
}

// форматирование цены
const formatPrice = (price: string | number | undefined) => {
  if (!price) return ''
  return Math.round(Number(price)).toLocaleString('ru-RU')
}

const refundTicket = async (ticketId: number) => {
  if (!confirm('Вы уверены, что хотите вернуть билет?')) return
  try {
    await api.delete(`profile/tickets/${ticketId}/`)
    tickets.value = tickets.value.map(t => t.id === ticketId ? { ...t, is_refunded: true } : t)
    alert('Билет успешно возвращён!')
  } catch (e: unknown) {
    if (e && typeof e === 'object' && 'response' in e && e.response && typeof e.response === 'object' && 'status' in e.response && e.response.status === 401) {
      alert('Сессия истекла. Пожалуйста, войдите снова.')
      window.location.href = '/login'
    } else {
      alert('Ошибка возврата билета')
    }
  }
}

onMounted(() => {
  fetchTickets()
})

</script>
