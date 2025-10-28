<script lang="ts">
import { computed, onMounted, ref } from 'vue'
import {TicketData, RevenueData} from '@/types/statistics'
import api from '@/api/axios'
import ChartTickets from '@/components/admin/statistics/ChartTickets.vue'
import VisitorsCard from '@/components/admin/statistics/VisitorsCard.vue'
import dayjs from "dayjs";
// Фильтры
const selectedCity = ref<string>('Все города')
const startDate = ref<string>(dayjs().subtract(7, 'day').format('YYYY-MM-DD'))
const endDate = ref<string>(dayjs().format('YYYY-MM-DD'))

// Список городов для фильтра
const cities = ref<string[]>([])

const ticketsByObject = ref<TicketData[]>([])
const revenue = ref<RevenueData[]>([])
const uniqueVisitors = ref<number>(0)
const loading = ref(true)

onMounted(async () => {
  try {
    // Надо добавить правильный путь в api 
    const res = await api.get('/dashboard-stats-fake/') 
    ticketsByObject.value = res.data.ticketsByObject
    revenue.value = res.data.revenue
    uniqueVisitors.value = res.data.uniqueVisitors

    cities.value = Array.from(new Set(res.data.revenue.map((r: RevenueData) => r.city)))

  } finally {
    loading.value = false
  }
})

// Отфильтрованные данные
const filteredTickets = computed(() =>
  ticketsByObject.value.filter(t =>
    (!selectedCity.value || selectedCity.value === 'Все города' || revenue.value.find(r => r.objectName === t.objectName)?.city === selectedCity.value) &&
    dayjs(t.date).isAfter(startDate.value) &&
    dayjs(t.date).isBefore(endDate.value)
  )
)

const filteredRevenue = computed(() =>
  revenue.value.filter(r =>
    !selectedCity.value || selectedCity.value === 'Все города' || r.city === selectedCity.value
  )
)

</script>

<script setup lang="ts">
import AdminLayout from '@/layouts/admin/AdminLayout.vue'
</script>

<template>
    <div class="p-6 space-y-6">
    <!-- Фильтры -->
    <div class="flex gap-4 items-end">
      <div>
        <label class="block mb-1 font-semibold">Город</label>
        <select v-model="selectedCity" class="border rounded p-2">
          <option>Все города</option>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>
      <div>
        <label class="block mb-1 font-semibold">Дата от</label>
        <input type="date" v-model="startDate" class="border rounded p-2" />
      </div>
      <div>
        <label class="block mb-1 font-semibold">Дата до</label>
        <input type="date" v-model="endDate" class="border rounded p-2" />
      </div>
    </div>

    <!-- Графики -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartTickets :data="filteredTickets" />
    </div>
  </div>
</template>
