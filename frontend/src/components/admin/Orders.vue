<template>
    <div>
      <h1>Orders</h1>
      <ul>
        <li 
          v-for="(order, index) in orders" 
          :key="index"
        >
          {{ order }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  
  const orders = ref<any[]>([])
  
  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://hub.juheapi.com/aqi/v1/ip?apikey=434306d581f376e3aa290e7c7df966fc&ip=8.8.8.8')
      console.log('Ответ от API:', response.data)
      orders.value = [response.data] // оборачиваем в массив, если ты хочешь использовать v-for
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    }
  }
  
  onMounted(() => {
    fetchOrders()
  })
  </script>
  
  <style scoped>
  </style>
  