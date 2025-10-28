<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

interface Props {
  data: { objectName: string; count: number; date: string }[]
}

const props = defineProps<Props>()

const chartData = computed(() => {
  const labels = [...new Set(props.data.map(d => d.date))]
  const datasets: any[] = []

  props.data.forEach(d => {
    let ds = datasets.find(a => a.label === d.objectName)
    if (!ds) {
      ds = { label: d.objectName, data: [], borderColor: randomColor(), fill: false }
      datasets.push(ds)
    }
    ds.data.push(d.count)
  })

  return { labels, datasets }
})

function randomColor() {
  return `hsl(${Math.random() * 360}, 70%, 50%)`
}
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow text-center">
    <h3 class="font-semibold mb-4">Количество билетов</h3>
    <Line :data="chartData" />
  </div>
</template>
