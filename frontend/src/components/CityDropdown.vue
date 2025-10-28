<template>
  <div>
    <!-- City selector button -->
    <button
      @click="show = true"
      class="px-2 sm:px-4 py-2 bg-white rounded text-gray-700 hover:bg-gray-100 transition flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
    >
      <!-- Location icon -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
      <span class="hidden sm:inline">{{ selectedCityName || 'Выбрать город' }}</span>
      <span class="sm:hidden">{{ selectedCityName ? selectedCityName.split(' ')[0] : 'Город' }}</span>
    </button>

    <!-- Modal dropdown for city selection -->
    <transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
        @click.self="close"
      >
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-2 relative transition-all">
          <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl" @click="close">
            &times;
          </button>
          <h3 class="text-lg font-bold text-center mb-2">Выберите город</h3>
          <div v-if="loading" class="text-center py-4">Загрузка...</div>
          <div v-else-if="error" class="text-center text-red-500 py-4">{{ error }}</div>
          <template v-else>
            <!-- Search input -->
            <div class="flex items-center bg-gray-100 rounded-lg px-2 py-1 mb-2">
              <input
                id="city-search"
                name="city-search"
                v-focus
                type="text"
                v-model="search"
                placeholder="Поиск"
                class="bg-transparent outline-none w-full text-base"
              />
            </div>
            <!-- City list -->
            <ul class="max-h-80 overflow-y-auto divide-y divide-gray-100">
              <li
                @click="selectCity(null)"
                class="py-2 px-2 cursor-pointer hover:bg-indigo-50 rounded-lg font-medium flex justify-between items-center"
                :class="{ 'text-indigo-600 font-semibold': selectedCity === null }"
              >
                Все города
                <span v-if="selectedCity === null" class="text-indigo-500">✔</span>
              </li>
              <li
                v-for="city in filteredCities"
                :key="city.id"
                @click="selectCity(city.id)"
                class="py-2 px-2 cursor-pointer hover:bg-indigo-50 rounded-lg flex justify-between items-center"
                :class="{ 'text-indigo-600 font-semibold': city.id === selectedCity }"
              >
                {{ city.name }}
                <span v-if="city.id === selectedCity" class="text-indigo-500">✔</span>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

// v-model для id города (или null для "Все города")
const selectedCity = defineModel<number | null>({ default: null })
const show = ref(false)
const search = ref('')
const cities = ref<{ id: number; name: string; country: string }[]>([])
const loading = ref(false)
const error = ref('')

// Имя выбранного города для кнопки
const selectedCityName = computed(() => {
  if (selectedCity.value === null) return 'Все города'
  const found = cities.value.find(c => c.id === selectedCity.value)
  return found ? found.name : 'Выбрать город'
})

const filteredCities = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return cities.value
  return cities.value.filter(city => city.name.toLowerCase().includes(term))
})

function selectCity(id: number | null) {
  selectedCity.value = id
  if (id === null) {
    localStorage.removeItem('selectedCityId')
  } else {
    localStorage.setItem('selectedCityId', String(id))
  }
  show.value = false
  search.value = ''
}

function close() {
  show.value = false
  search.value = ''
}

onMounted(async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await axios.get('http://localhost:8000/api/cities/')
    cities.value = res.data.results
    // Восстанавливаем выбранный город из localStorage
    const saved = localStorage.getItem('selectedCityId')
    if (saved) {
      const id = parseInt(saved)
      if (cities.value.some(c => c.id === id)) {
        selectedCity.value = id
      }
    }
  } catch (e) {
    error.value = 'Ошибка загрузки городов'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
