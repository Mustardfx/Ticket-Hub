<template>
    <div class="flex flex-col items-center justify-center flex-wrap mx-auto">
    <CategoryButtons @select="handleCategorySelect" />
    <!-- City dropdown -->
    <CityDropdown v-model="selectedCity" />
    <CreateObject />
  </div>
  <Transition name="fade">
       <div v-if="isLoading" class="flex justify-center items-center min-h-[200px]">
         <svg class="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
           <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
           <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
        <div v-else-if="filteredObjects.length === 0" class="text-gray-500 text-center py-8">
          Ничего не найдено по вашему запросу
        </div>
        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ObjectCard v-for="obj in filteredObjects" :key="obj.id" :object="obj" />
        </div>
      </Transition>
</template>

<script setup lang="ts">
import CityDropdown from '@/components/CityDropdown.vue';
import CategoryButtons from '@/components/CategoryButtons.vue';
import { ref, onMounted, watch } from 'vue'
import type { Filters } from '@/data/cultral-object'
import { useFilterStore } from '@/stores/filterStore';
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ObjectCard from '@/components/ObjectCard.vue'
import api from '@/api/axios'
import CreateObject from '@/components/admin/CreateObject.vue';
import type { CulturalObject } from '@/types/cultural-object' 
// Вместо mockObjects
const objects = ref<CulturalObject[]>([])
const filteredObjects = ref<CulturalObject[]>([])
const isLoading = ref(false)

const activeFilters = ref<Filters>({
  city: '',
  category: '',
  minPrice: null,
  maxPrice: null,
})

const selectedCity = ref('')

// Загрузка объектов с сервера с фильтрами
async function fetchObjects(filters: Filters) {
  const params: any = {}
  if (filters.city) params.city_name = filters.city
  if (filters.category) params.category = filters.category
  if (filters.minPrice) params.min_price = filters.minPrice
  if (filters.maxPrice) params.max_price = filters.maxPrice
  try {
    const res = await api.get('objects/', { params })
    objects.value = res.data.results || res.data
    filteredObjects.value = objects.value
  } catch (e) {
    filteredObjects.value = []
  }
}

onMounted(() => {
  const savedCity = localStorage.getItem('selectedCity')
  if (savedCity) {
    selectedCity.value = savedCity
    updateFilters({ city: savedCity })
  } else {
    fetchObjects(activeFilters.value)
  }
})

watch(selectedCity, (newCity) => {
  localStorage.setItem('selectedCity', newCity)
  updateFilters({ city: newCity })
})

const handleCategorySelect = (categoryName: string) => {
  updateFilters({
    category: categoryName === 'all' ? '' : categoryName,
  })
}

function updateFilters(partial: Partial<Filters>) {
  const newFilters = {
    ...activeFilters.value,
    ...partial,
  }
  activeFilters.value = newFilters
  fetchObjects(newFilters)
}

function handleUpdate(updatedObject: CulturalObject) {
  // После успешного обновления на сервере — обновить локальный список
  const index = objects.value.findIndex(o => o.id === updatedObject.id)
  if (index !== -1) {
    objects.value[index] = updatedObject
    filteredObjects.value = [...objects.value]
  } else {
    fetchObjects(activeFilters.value)
  }
}

function handleRemove(id: number) {
  // После успешного удаления на сервере — обновить локальный список
  objects.value = objects.value.filter(obj => obj.id !== id)
  filteredObjects.value = [...objects.value]
}

</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>