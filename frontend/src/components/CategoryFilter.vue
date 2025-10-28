<template>
    <div class="categories">
      <button 
        v-for="cat in categories" 
        :key="cat.id"
        @click="filterByCategory(cat.type)"
      >
        {{ cat.name }}
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  const categories = [
    { id: 1, name: 'Музеи', type: 'museum' },
    { id: 2, name: 'Театры', type: 'theatre' },
    { id: 3, name: 'Галереи', type: 'gallery' },
    { id: 4, name: 'Концерты', type: 'concert' }
  ]
  
  const filterByCategory = (type) => {
    filteredObjects.value = allObjects.value.filter(obj => obj.category === type)
  }
  </script>

  