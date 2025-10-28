<template>
  <form @submit.prevent="onSubmit" class="space-y-4 sm:space-y-6">
    <div class="flex flex-col lg:flex-row gap-4 sm:gap-6">
      <div class="w-full lg:w-1/2 space-y-3 sm:space-y-4">
        <div>
          <label class="block mb-1 text-xs sm:text-sm font-medium text-gray-700">Имя</label>
          <input
            v-model="localForm.name"
            type="text"
            required
            class="w-full border border-gray-300 px-3 py-2.5 sm:py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label class="block mb-1 text-xs sm:text-sm font-medium text-gray-700">Фамилия</label>
          <input
            v-model="localForm.surname"
            type="text"
            required
            class="w-full border border-gray-300 px-3 py-2.5 sm:py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label class="block mb-1 text-xs sm:text-sm font-medium text-gray-700">Дата рождения</label>
          <input
            ref="birthdayInput"
            v-model="localForm.birthday"
            placeholder="дд.мм.гггг"
            class="w-full border border-gray-300 px-3 py-2.5 sm:py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
          />
        </div>

        <div>
          <label class="block mb-1 text-xs sm:text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="localForm.email"
            type="email"
            class="w-full border border-gray-300 px-3 py-2.5 sm:py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            :class="{ 'border-red-500': showErrors && !isEmailValid }"
          />
          <p v-if="showErrors && !isEmailValid" class="text-red-500 text-xs sm:text-sm mt-1">
            Некорректный email
          </p>
        </div>
      </div>

      <div class="hidden lg:block w-px bg-gray-200"></div>

      <div class="w-full lg:w-1/2 space-y-3 sm:space-y-4">
        <div>
          <label class="block mb-1 text-xs sm:text-sm font-medium text-gray-700">Телефон</label>
          <input
            ref="phoneInput"
            placeholder="+7 (___) ___-__-__"
            class="w-full border border-gray-300 px-3 py-2.5 sm:py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
            :class="{ 'border-red-500': showErrors && !isPhoneValid }"
          />
          <p v-if="showErrors && !isPhoneValid" class="text-red-500 text-xs sm:text-sm mt-1">
            Некорректный номер
          </p>
        </div>

        <div>
          <label class="block mb-1 text-xs sm:text-sm font-medium text-gray-700">Город</label>
          <select
            v-model.number="localForm.city_id"
            required
            class="w-full border border-gray-300 px-3 py-2.5 sm:py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
          >
            <option disabled :value="null">Выберите город</option>
            <option
              v-for="city in cities"
              :key="city.id"
              :value="city.id"
            >
              {{ city.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <button
      type="submit"
      class="bg-indigo-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-indigo-700 transition w-full text-sm sm:text-base font-semibold"
    >
      Сохранить
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch, defineProps, defineEmits, onMounted } from 'vue'
import type { User } from '@/types/profile'
import { useCities } from '@/composables/useCities'
import IMask, { MaskedDate, MaskedRange } from 'imask'

const { cities } = useCities()
const props = defineProps<{ form: User }>()
const emit = defineEmits<{ (e: 'submit', updatedProfile: User): void }>()

// -----------------------
// reactive форма без телефона (его отдельный ref)
// -----------------------
const localForm = reactive<User>({
  id: props.form.id,
  name: props.form.name || '',
  surname: props.form.surname || '',
  email: props.form.email || '',
  birthday: props.form.birthday ? props.form.birthday.split('-').reverse().join('.') : '',
  city_id: props.form.city_id || null,
  city_name: props.form.city_name || '',
  city: props.form.city || null,
  phone: '' // заполняется через маску
})

const showErrors = ref(false)

// -----------------------
// Телефон
// -----------------------
const phoneInput = ref<HTMLInputElement | null>(null)
let phoneMask: IMask.InputMask<any> | null = null

onMounted(() => {
  if (phoneInput.value) {
    phoneMask = IMask(phoneInput.value, {
      mask: '+{7} (000) 000-00-00'
    })

    // Если телефон уже есть в props.form, ставим в маску
    if (props.form.phone) {
      const val = props.form.phone.length === 10 ? '7' + props.form.phone : props.form.phone
      phoneMask.value = val
      localForm.phone = phoneMask.value
    }

    // Обновление localForm.phone при вводе
    phoneMask.on('accept', () => {
      localForm.phone = phoneMask?.value || ''
    })
  }
})

// Отслеживаем изменения props.form.phone только после инициализации маски
watch(() => props.form.phone, (newPhone) => {
  if (phoneMask && newPhone) {
    const val = newPhone.length === 10 ? '7' + newPhone : newPhone
    phoneMask.value = val
    localForm.phone = phoneMask.value
  }
})

// -----------------------
// Дата рождения
// -----------------------
const birthdayInput = ref<HTMLInputElement | null>(null)
let birthdayMask: IMask.InputMask<any> | null = null

onMounted(() => {
  if (birthdayInput.value) {
    birthdayMask = IMask(birthdayInput.value, {
      mask: IMask.MaskedDate as unknown as any, // приводим к any для TS
      pattern: 'd.`m.`Y',
      blocks: {
        d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
        m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
        Y: { mask: IMask.MaskedRange, from: 1900, to: new Date().getFullYear() }
      },
      format: (date: Date) =>
        `${String(date.getDate()).padStart(2,'0')}.${String(date.getMonth()+1).padStart(2,'0')}.${date.getFullYear()}`,
      parse: (str: string) => {
        const [d, m, Y] = str.split('.').map(Number)
        return new Date(Y, m-1, d)
      }
    })

    if (props.form.birthday) {
      const formatted = props.form.birthday.split('-').reverse().join('.')
      birthdayMask.value = formatted
      localForm.birthday = formatted
    }

    birthdayMask.on('accept', () => {
      localForm.birthday = birthdayMask?.value || ''
    })
  }
})

watch(() => props.form.birthday, (newBirthday) => {
  if (birthdayMask && newBirthday) {
    const formatted = newBirthday.split('-').reverse().join('.')
    birthdayMask.value = formatted
    localForm.birthday = formatted
  }
})

// -----------------------
// Сброс города, если id не найден
// -----------------------
watch(cities, () => {
  if (localForm.city_id && !cities.value.find(c => c.id === localForm.city_id)) {
    localForm.city_id = null
  }
})

// -----------------------
// Валидация
// -----------------------
const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localForm.email)
)
const isPhoneValid = computed(() =>
  /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(localForm.phone)
)

// -----------------------
// Submit
// -----------------------
function onSubmit() {
  showErrors.value = true
  if (isEmailValid.value && isPhoneValid.value && localForm.city_id) {
    emit('submit', { ...localForm })
  }
}
</script>
