<script setup lang="ts">
import { Radar } from 'vue-chartjs'
import { Chart as ChartJS, registerables } from 'chart.js'

ChartJS.register(...registerables)

defineProps<{
  chartData: {
    labels: string[]
    datasets: {
      data: number[]
      backgroundColor: string[]
    }[]
  }
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow p-4 h-80 flex flex-col">
    <h3 class="text-lg font-semibold mb-3">Количество билетов по объектам (Radar)</h3>
    <div class="flex-1 relative">
      <Radar
        :data="chartData"
        :options="{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                font: {
                  size: 11
                }
              }
            }
          },
          scales: {
            r: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }"
        class="absolute inset-0"
      />
    </div>
  </div>
</template>