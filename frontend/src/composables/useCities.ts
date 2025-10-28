import { ref, onMounted } from 'vue'
import api from '@/api/axios'

export function useCities() {
  const cities = ref<{ id: number; name: string }[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchCities = async () => {
    try {
      isLoading.value = true
      const res = await api.get('cities/')
      cities.value = res.data.results
    } catch (e) {
      error.value = 'Ошибка загрузки городов'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(fetchCities)

  return { cities, isLoading, error }
}
