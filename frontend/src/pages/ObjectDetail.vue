<template>
  <DefaultLayout>
    <template #backButton>
      <button
        @click="goBack"
        class="sm:hidden h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
        title="Назад"
      >
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
    </template>
    <div v-if="loading" class="flex justify-center items-center py-8 sm:py-12">
      <div class="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="error" class="text-center py-8 sm:py-12 px-4">
      <p class="text-red-600 mb-4 text-sm sm:text-base">{{ error }}</p>
      <button @click="fetchObject" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm sm:text-base">
        Попробовать снова
      </button>
    </div>

    <div v-else-if="object">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">

        <!-- Галерея -->
        <div class="space-y-3 sm:space-y-4">
          <h2 class="text-base sm:text-lg font-semibold text-gray-700 lg:hidden">Фото</h2>

          <!-- Основное фото -->
          <div class="rounded-xl shadow-md overflow-hidden bg-gray-100">
            <img
              :src="galleryImages[selectedImageIndex]"
              :alt="`${object.name} - фото ${selectedImageIndex + 1}`"
              class="w-full aspect-[16/9] object-cover cursor-pointer hover:opacity-90 transition-opacity"
              @click="showImageModal = true"
            />
          </div>

          <!-- Thumbnails -->
          <div class="grid grid-cols-3 gap-2 sm:gap-3">
            <div
              v-for="(image, index) in galleryImages"
              :key="index"
              class="relative cursor-pointer group"
              @click="selectedImageIndex = index"
            >
              <img
                :src="image"
                :alt="`${object.name} - фото ${index + 1}`"
                class="w-full h-16 sm:h-20 lg:h-24 object-cover rounded-lg border-2 transition-all"
                :class="selectedImageIndex === index ? 'border-indigo-500' : 'border-gray-200 group-hover:border-indigo-300'"
              />
            </div>
          </div>
        </div>

        <!-- Информация -->
        <div class="space-y-4 sm:space-y-6">
          <div class="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
            <!-- Название -->
            <h1 class="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-indigo-700">{{ object.name }}</h1>

            <!-- Описание -->
            <div class="space-y-2">
              <h3 class="text-base sm:text-lg font-semibold text-gray-800">Описание</h3>
              <p class="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">{{ object.description }}</p>
            </div>

            <!-- Информация об объекте -->
            <div class="space-y-3 sm:space-y-4">
              <h3 class="text-base sm:text-lg font-semibold text-gray-800">Информация об объекте</h3>
              <div class="space-y-2 sm:space-y-3">
                <div class="flex items-center gap-2 sm:gap-3 text-gray-700">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span class="font-medium text-sm sm:text-base">{{ object.city_name }}</span>
                </div>
                <div class="flex items-center gap-2 sm:gap-3 text-gray-700">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                  <span class="font-medium text-sm sm:text-base">{{ object.category_display }}</span>
                </div>
                <div class="flex items-center gap-2 sm:gap-3 text-gray-700">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"/>
                  </svg>
                  <span class="font-medium text-sm sm:text-base">{{ object.address }}</span>
                </div>
                <div class="flex items-center gap-2 sm:gap-3 text-gray-700">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="font-medium text-sm sm:text-base">{{ object.working_hours || 'Не указано' }}</span>
                </div>
              </div>
            </div>

            <!-- TODO: Временное решение - заменить на динамическое получение расписания из API -->
            <div class="space-y-3 sm:space-y-4">
              <h4 class="text-base sm:text-lg font-semibold text-gray-800">Выберите дату и время</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div class="space-y-2">
                  <label class="text-xs sm:text-sm font-medium text-gray-700">Дата</label>
                  <div class="relative">
                    <input
                      type="text"
                      :value="selectedDate || ''"
                      placeholder="дд.мм.гггг"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
                      readonly
                      @click="showDatePicker = !showDatePicker"
                    />
                    <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>

                    <!-- Календарь -->
                    <div v-if="showDatePicker" class="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 p-3">
                      <div class="flex justify-between items-center mb-3">
                        <button @click="previousMonth" class="p-1 hover:bg-gray-100 rounded">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                          </svg>
                        </button>
                        <span class="font-medium">{{ currentMonthYear }}</span>
                        <button @click="nextMonth" class="p-1 hover:bg-gray-100 rounded">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </button>
                      </div>

                      <div class="grid grid-cols-7 gap-1 text-xs mb-2">
                        <div class="text-center text-gray-500">Пн</div>
                        <div class="text-center text-gray-500">Вт</div>
                        <div class="text-center text-gray-500">Ср</div>
                        <div class="text-center text-gray-500">Чт</div>
                        <div class="text-center text-gray-500">Пт</div>
                        <div class="text-center text-gray-500">Сб</div>
                        <div class="text-center text-gray-500">Вс</div>
                      </div>

                      <div class="grid grid-cols-7 gap-1">
                        <button
                          v-for="day in calendarDays"
                          :key="day.date"
                          @click="selectDate(day.date)"
                          :class="[
                            'p-2 text-xs rounded hover:bg-indigo-50',
                            day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400',
                            day.isToday ? 'bg-indigo-100 font-semibold' : '',
                            day.isSelected ? 'bg-indigo-600 text-white' : ''
                          ]"
                          :disabled="day.isPast"
                        >
                          {{ day.day }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="space-y-2">
                  <label class="text-xs sm:text-sm font-medium text-gray-700">Доступное время</label>
                  <div class="flex flex-wrap gap-1 sm:gap-2">
                    <button
                      v-for="time in ['10:00', '12:30', '15:00']"
                      :key="time"
                      @click="selectedTime = time"
                      :class="[
                        'px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all',
                        selectedTime === time
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      ]"
                    >
                      {{ time }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Цена билета -->
            <div class="flex items-center justify-between bg-gray-50 p-3 sm:p-4 rounded-lg">
              <div>
                <p class="text-xs sm:text-sm text-gray-600">Стандартный билет</p>
                <p class="text-lg sm:text-xl lg:text-2xl font-bold text-indigo-700">{{ object.price }} ₸</p>
              </div>
            </div>

            <!-- Кнопки -->
            <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                @click="showModal = true"
                class="flex-1 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
                Купить билет
              </button>
              <button
                @click="shareObject"
                class="flex-1 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
                </svg>
                Поделиться
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-8 sm:py-12 px-4">
      <p class="text-gray-600 text-sm sm:text-base">Объект не найден</p>
    </div>
  </DefaultLayout>

<teleport to="body">
  <transition name="fade">
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click="showModal = false"
    >
      <div
        class="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100"
        @click.stop
      >
        <!-- Заголовок -->
        <div class="px-8 py-6 border-b border-gray-100">
          <div class="flex justify-between items-start">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">Покупка билета</h2>
              <p class="text-base text-gray-600 mt-2">{{ object?.name }}</p>
            </div>
            <button
              @click="showModal = false"
              class="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Содержимое -->
        <div class="px-8 py-6 space-y-6">
          <!-- Дата и время -->
          <div class="space-y-4">
            <div class="flex justify-between items-center py-3">
              <span class="text-base font-semibold text-gray-700">Дата</span>
              <span class="text-base text-gray-900 font-semibold">{{ selectedDate || 'Не выбрана' }}</span>
            </div>
            <div class="flex justify-between items-center py-3">
              <span class="text-base font-semibold text-gray-700">Время</span>
              <span class="text-base text-gray-900 font-semibold">{{ selectedTime || 'Не выбрано' }}</span>
            </div>
          </div>

          <!-- Количество -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-base font-semibold text-gray-700">Количество билетов</span>
              <div class="flex items-center gap-4">
                <button
                  @click="decreaseQuantity"
                  :disabled="ticketQuantity <= 1"
                  class="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
                <span class="w-12 text-center text-xl font-bold text-gray-900">{{ ticketQuantity }}</span>
                <button
                  @click="increaseQuantity"
                  class="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="flex justify-between items-center py-3">
              <span class="text-base font-semibold text-gray-700">Цена за билет</span>
              <span class="text-lg font-bold text-gray-900">{{ object?.price }} ₸</span>
            </div>
          </div>

          <!-- Итого -->
          <div class="border-t border-gray-200 pt-6">
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold text-gray-900">Итого к оплате</span>
              <span class="text-2xl font-bold text-indigo-600">{{ totalAmount }} ₸</span>
            </div>
          </div>

          <!-- Кнопки -->
          <div class="flex gap-4 pt-4">
            <button
              @click="showModal = false"
              class="flex-1 px-6 py-4 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-base"
            >
              Отмена
            </button>
            <button
              @click="confirmPayment"
              :disabled="isPaying || !selectedDate || !selectedTime"
              class="flex-1 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors text-base"
            >
              {{ isPaying ? 'Обработка...' : 'Перейти к оплате' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</teleport>

<!-- Модальное окно для увеличенного изображения -->
<teleport to="body">
  <transition name="fade">
    <div
      v-if="showImageModal"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      @click="showImageModal = false"
    >
      <div class="relative max-w-5xl w-full mx-4">
        <!-- Кнопка закрытия -->
        <button
          @click="showImageModal = false"
          class="absolute -top-12 -right-12 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 z-10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Стрелка влево -->
        <button
          v-if="selectedImageIndex > 0"
          @click.stop="prevImage"
          class="absolute -left-12 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 z-10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <!-- Стрелка вправо -->
        <button
          v-if="selectedImageIndex < galleryImages.length - 1"
          @click.stop="nextImage"
          class="absolute -right-12 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 z-10"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Основное изображение -->
        <img
          :src="galleryImages[selectedImageIndex]"
          :alt="`${object?.name || 'Объект'} - фото ${selectedImageIndex + 1}`"
          class="w-full max-h-[70vh] object-contain rounded-lg"
          @click.stop
        />

        <!-- Thumbnails внизу -->
        <div class="mt-4 flex justify-center">
          <div class="flex gap-2">
            <div
              v-for="(image, index) in galleryImages"
              :key="index"
              class="relative cursor-pointer group"
              @click.stop="selectedImageIndex = index"
            >
              <img
                :src="image"
                :alt="`${object?.name || 'Объект'} - фото ${index + 1}`"
                class="w-16 h-16 object-cover rounded-lg border-2 transition-all"
                :class="selectedImageIndex === index ? 'border-white' : 'border-gray-400 group-hover:border-gray-300'"
              />
            </div>
          </div>
        </div>

        <!-- Счетчик -->
        <div class="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white bg-black/50 rounded-full px-4 py-2 text-sm">
          {{ selectedImageIndex + 1 }} / {{ galleryImages.length }}
        </div>
      </div>
    </div>
  </transition>
</teleport>


</template>

<script setup lang="ts">
// Отключаем автоматическое наследование атрибутов
defineOptions({
  inheritAttrs: false
})

import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import api from '@/api/axios'
import type { CulturalObject } from '@/types/cultural-object'

const route = useRoute()
const router = useRouter()

const goBack = () => {
  router.back()
}

const object = ref<CulturalObject | null>(null)
const loading = ref(false)
const error = ref('')
const showModal = ref(false)
const showImageModal = ref(false)
const showDatePicker = ref(false)
const selectedImageIndex = ref(0)
const selectedDate = ref('')
const selectedTime = ref('')
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const ticketQuantity = ref(1)
const isPaying = ref(false)
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4='

// Временные изображения для галереи (одинаковые для демонстрации)
const galleryImages = [
  placeholderImage,
  placeholderImage,
  placeholderImage
]

const increaseQuantity = () => {
  ticketQuantity.value++
}
const decreaseQuantity = () => {
  if (ticketQuantity.value > 1) ticketQuantity.value--
}

// Функции для навигации по галерее в модальном окне
const nextImage = () => {
  if (selectedImageIndex.value < galleryImages.length - 1) {
    selectedImageIndex.value++
  }
}
const prevImage = () => {
  if (selectedImageIndex.value > 0) {
    selectedImageIndex.value--
  }
}

// Функции для календаря
const currentMonthYear = computed(() => {
  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  return `${months[currentMonth.value]} ${currentYear.value}`
})

const calendarDays = computed(() => {
  const days = []
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay() + 1)

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()
    const isSelected = selectedDate.value === date.toISOString().split('T')[0]
    const isPast = date < new Date(today.setHours(0, 0, 0, 0))

    days.push({
      date: date.toISOString().split('T')[0],
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === currentMonth.value,
      isToday,
      isSelected,
      isPast
    })
  }

  return days
})

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const selectDate = (date: string) => {
  selectedDate.value = date
  showDatePicker.value = false
}
const totalAmount = computed(() =>
  object.value ? object.value.price * ticketQuantity.value : 0
)

const confirmPayment = async () => {
  if (!object.value || ticketQuantity.value < 1) return

  isPaying.value = true

  try {
    const response = await api.post('/payments/', {
      cultural_object_id: object.value.id,
      quantity: ticketQuantity.value
    })

    if (response.data.payment_url) {
      window.location.href = response.data.payment_url
    } else {
      alert('Не удалось получить ссылку на оплату.')
    }
  } catch (err: unknown) {
    console.error('Ошибка при оплате:', err)
    const errorMessage = err instanceof Error ? err.message : 'Ошибка при создании платежа'
    alert(errorMessage)
  } finally {
    isPaying.value = false
  }
}

const fetchObject = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await api.get(`objects/${route.params.id}/`)
    object.value = response.data
  } catch (err: unknown) {
    console.error('Error fetching object:', err)
    const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки объекта. Попробуйте позже.'
    error.value = errorMessage
  } finally {
    loading.value = false
  }
}

const buyTicket = async () => {
  if (!object.value) return

  const quantity = 1

  try {
    const response = await api.post('/payments/', {
      cultural_object_id: object.value.id,
      quantity
    })

    if (response.data.payment_url) {
      window.location.href = response.data.payment_url
    } else {
      alert('Ссылка на оплату не получена')
    }
  } catch (err: unknown) {
    console.error('Ошибка при создании платежа:', err)
    const errorMessage = err instanceof Error ? err.message : 'Ошибка при создании платежа'
    alert(errorMessage)
  }
}

const shareObject = () => {
  if (navigator.share) {
    navigator.share({
      title: object.value?.name,
      text: object.value?.description,
      url: window.location.href
    })
  } else {
    // Fallback - копируем ссылку
    navigator.clipboard.writeText(window.location.href)
    alert('Ссылка скопирована в буфер обмена!')
  }
}

const getImageUrl = (imageUrl: string | null) => {
  if (!imageUrl) return placeholderImage
  if (imageUrl.startsWith('http')) return imageUrl
  return `http://localhost:8000${imageUrl}`
}

onMounted(() => {
  fetchObject()
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
