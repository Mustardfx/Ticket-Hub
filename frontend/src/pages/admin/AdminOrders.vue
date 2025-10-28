<template>
        <div>
            <h2 class="text-2xl font-bold mb-4">Заказы</h2>
            <div v-if="isLoading">Загрузка...</div>
            <div v-else-if="error" class="text-red-500">{{ error }}</div>
            <div v-else-if="orders.length === 0" class="text-gray-500">Нет заказов.</div>
            <table v-else class="min-w-full bg-white border rounded shadow">
                <thead>
                    <tr>
                        <th class="px-4 py-2 border">ID</th>
                        <th class="px-4 py-2 border">Пользователь</th>
                        <th class="px-4 py-2 border">Сумма</th>
                        <th class="px-4 py-2 border">Статус</th>
                        <th class="px-4 py-2 border">Дата</th>
                        <th class="px-4 py-2 border">Билеты</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.id">
                        <td class="px-4 py-2 border">{{ order.id }}</td>
                        <td class="px-4 py-2 border">{{ order.user }}</td>
                        <td class="px-4 py-2 border">{{ order.total_amount }} ₸</td>
                        <td class="px-4 py-2 border">{{ order.is_paid ? 'Оплачен' : 'Не оплачен' }}</td>
                        <td class="px-4 py-2 border">{{ order.created_at }}</td>
                        <td class="px-4 py-2 border">{{ order.tickets.length }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>

<script setup lang="ts">
import AdminLayout from '@/layouts/admin/AdminLayout.vue';
import { ref, onMounted } from 'vue'
import api from '@/api/axios'

interface Order {
  id: number
  user: number
  total_amount: number
  is_paid: boolean
  created_at: string
  tickets: any[]
}

const orders = ref<Order[]>([])
const isLoading = ref(true)
const error = ref('')

const fetchOrders = async () => {
  try {
    const res = await api.get('orders/')
    orders.value = res.data.results || res.data
  } catch (e) {
    error.value = 'Ошибка загрузки заказов'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchOrders)
</script>

<style scoped>

</style>