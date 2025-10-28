<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

interface Props {
  data: { objectName: string; city: string; amount: number }[]
}

const props = defineProps<Props>()

const chartData = computed(() => {
  const labels = props.data.map(d => d.objectName)
  const amounts = props.data.map(d => d.amount)

  return {
    labels,
    datasets: [
      {
        label: 'Выручка',
        data: amounts,
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
      }
    ]
  }
})
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow text-center">
    <h3 class="font-semibold mb-4">Выручка по объектам</h3>
    <Bar :data="chartData" />
  </div>
</template>
