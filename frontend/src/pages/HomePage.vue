<template>
  <DefaultLayout>
    <template #fullWidthTop>
      <HeroSection title="Мир культуры" accent="рядом с вами" subtitle="Откройте для себя лучшие театры, музеи, галереи и концертные залы. Бронируйте билеты онлайн быстро и удобно.">
        <div class="w-full mx-auto max-w-3xl px-4">
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 rounded-xl bg-white border border-gray-200 shadow-lg p-3 sm:p-2 focus-within:ring-2 focus-within:ring-indigo-300">
            <SearchInput v-model="searchQuery" class="flex-1" placeholder="Поиск по названию..." :borderless="true" @search="onSearchClick" />
            <button class="hidden sm:inline-flex px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md text-base" @click="onSearchClick">Найти</button>
          </div>
        </div>
        <div class="mt-4 sm:mt-4 px-4">
          <CategoryButtons @select="handleCategorySelect" />
        </div>
      </HeroSection>
    </template>
    <template #citySelector>
      <CityDropdown v-model="selectedCity" />
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
      <section>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 class="text-3xl sm:text-3xl font-bold text-gray-900">Культурные объекты</h2>
            <p class="text-base sm:text-base text-gray-600 mt-2 sm:mt-1 leading-relaxed">Найдено: {{ filteredObjects.length }}</p>
          </div>
          <div class="relative">
            <button
              class="w-full sm:w-auto px-4 py-3 sm:py-2 bg-white border border-gray-300 rounded-xl sm:rounded-lg shadow-sm text-base sm:text-base hover:bg-gray-50 inline-flex items-center justify-center gap-2 min-h-[44px] sm:min-h-0"
              @click="showPriceDropdown = !showPriceDropdown"
            >
              Настроить цену
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd"/></svg>
            </button>
            <div v-if="showPriceDropdown" class="absolute right-0 mt-2 w-full sm:w-80 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-10">
              <div class="text-sm text-gray-600 mb-2">Быстрый выбор</div>
              <div class="flex flex-wrap gap-2 mb-3">
                <button class="px-2.5 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200" @click="applyPreset(null,2000)">до 2 000</button>
                <button class="px-2.5 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200" @click="applyPreset(2000,5000)">2–5 тыс.</button>
                <button class="px-2.5 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200" @click="applyPreset(5000,10000)">5–10 тыс.</button>
              </div>
              <button class="text-sm text-indigo-600 hover:underline" @click="customPriceOpen = !customPriceOpen">Другое…</button>
              <div v-if="customPriceOpen" class="mt-3 space-y-3">
                <div class="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    id="min-price"
                    name="min-price"
                    type="number"
                    :value="minPrice"
                    @input="minPrice = ($event.target as HTMLInputElement).valueAsNumber || null"
                    placeholder="Min"
                    min="0"
                    class="w-full sm:w-28 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <span class="text-gray-500 hidden sm:inline">—</span>
                  <input
                    id="max-price"
                    name="max-price"
                    type="number"
                    :value="maxPrice"
                    @input="maxPrice = ($event.target as HTMLInputElement).valueAsNumber || null"
                    placeholder="Max"
                    min="0"
                    class="w-full sm:w-28 px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <span class="text-gray-500">₸</span>
                </div>
                <div class="flex justify-end gap-2">
                  <button class="px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900" @click="resetFilters">Сбросить</button>
                  <button class="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700" @click="applyFilters">Применить</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Transition name="fade">
          <div v-if="isLoading" class="flex justify-center items-center min-h-[200px] py-8">
            <svg class="animate-spin h-10 w-10 sm:h-8 sm:w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
          </div>
          <div v-else-if="filteredObjects.length === 0" class="text-gray-600 text-center py-12 sm:py-8">
            <p class="text-lg sm:text-base font-medium">Ничего не найдено по вашему запросу</p>
            <p class="text-base sm:text-sm text-gray-500 mt-2">Попробуйте изменить фильтры или поисковый запрос</p>
          </div>
          <div v-else class="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ObjectCard v-for="obj in filteredObjects"
              :key="obj.id"
              :object="obj"
              @update="handleUpdated"
              @remove="handleDeleted" />
          </div>
        </Transition>
      </section>
    </div>

  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import HeroSection from '@/components/HeroSection.vue'
import ObjectCard from '@/components/ObjectCard.vue'
import CityDropdown from '@/components/CityDropdown.vue'
import CategoryButtons from '@/components/CategoryButtons.vue'
//
import SearchInput from '@/components/SearchInput.vue'
// Using inline inputs for dropdown; keep PriceFilter import only if reused elsewhere
import api from '@/api/axios'
import { ref, onMounted, watch } from 'vue'
import type { Filters } from '@/data/cultral-object'
import type { CulturalObject } from '@/types/cultural-object'
import { debounce } from 'lodash-es'

const objects = ref<CulturalObject[]>([])
const filteredObjects = ref<CulturalObject[]>([])
const isLoading = ref(false)

// Active filters (shared city + category + price + search)
const activeFilters = ref<Filters>({
  city: null,
  category: '',
  minPrice: null,
  maxPrice: null,
  search: '',
})

// Selected city bound to CityDropdown
const selectedCity = ref<number | null>(null)
const searchQuery = ref('')
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)
const showFilters = ref(false)
const showPriceDropdown = ref(false)
const customPriceOpen = ref(false)

let abortController: AbortController | null = null

// Загрузка объектов с сервера с фильтрами
async function fetchObjects(filters: Filters) {
  isLoading.value = true
  const params: {
    city?: number
    category?: string
    min_price?: number
    max_price?: number
    search?: string
  } = {}
  if (filters.city !== null) params.city = filters.city
  if (filters.category) params.category = filters.category
  if (filters.minPrice !== null) params.min_price = filters.minPrice
  if (filters.maxPrice !== null) params.max_price = filters.maxPrice
  if (filters.search) params.search = filters.search

  // Отмена предыдущего запроса
  if (abortController) {
    abortController.abort()
  }
  abortController = new AbortController()

  try {
    const res = await api.get('objects/', { params, signal: abortController.signal })
    objects.value = res.data.results || res.data
    filteredObjects.value = objects.value
  } catch (e) {
    const errorLike = e as { name?: string; code?: string }
    if (errorLike?.name === 'CanceledError' || errorLike?.code === 'ERR_CANCELED') {
      // Запрос отменён — ничего не делаем
    } else {
      filteredObjects.value = []
      console.error('Ошибка при загрузке объектов:', e)
    }
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const savedCity = localStorage.getItem('selectedCityId')
  if (savedCity) {
    selectedCity.value = parseInt(savedCity)
    updateFilters({ city: selectedCity.value })
  } else {
    fetchObjects(activeFilters.value)
  }
})

watch(selectedCity, (newCity) => {
  if (newCity !== null) {
    localStorage.setItem('selectedCityId', String(newCity))
  } else {
    localStorage.removeItem('selectedCityId')
  }
  updateFilters({ city: newCity })
})

// Debounced watcher для поиска, minPrice, maxPrice с порогом в 3 символа
const debouncedUpdateFilters = debounce((partial: Partial<Filters>) => {
  const search = partial.search ?? '';

  if (search.length >= 3) {
    // Поиск по запросу 3+ символа
    updateFilters(partial);
  } else {
    // Любая ситуация с 0, 1 или 2 символами — сбрасываем поиск, но не трогаем остальные фильтры
    updateFilters({ ...partial, search: '' });
  }
}, 300);

watch([searchQuery, minPrice, maxPrice], () => {
  debouncedUpdateFilters({
    search: searchQuery.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
  })
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
  };

  // Не делаем лишний запрос, если фильтры не изменились
  const filtersChanged = JSON.stringify(newFilters) !== JSON.stringify(activeFilters.value);
  if (filtersChanged) {
    activeFilters.value = newFilters;
    fetchObjects(newFilters);
  }
}

// Поиск по клику на кнопку, без debounce
const onSearchClick = () => {
  const search = searchQuery.value?.trim() ?? ''
  updateFilters({
    search: search.length >= 3 ? search : '',
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
  })
}

const applyFilters = () => {
  showFilters.value = false
  showPriceDropdown.value = false
  onSearchClick()
}

const resetFilters = () => {
  minPrice.value = null
  maxPrice.value = null
  onSearchClick()
}

function applyPreset(min: number | null, max: number | null) {
  minPrice.value = min
  maxPrice.value = max
  applyFilters()
}

const handleUpdated = (updated: CulturalObject) => {
  const index = objects.value.findIndex(obj => obj.id === updated.id)
  if (index !== -1) objects.value[index] = updated
  filteredObjects.value = [...objects.value]
}

const handleDeleted = (id: number) => {
  objects.value = objects.value.filter(obj => obj.id !== id)
  filteredObjects.value = filteredObjects.value.filter(obj => obj.id !== id)
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
