import { ref, onMounted } from 'vue'
import api from '@/api/axios'
import type { Profile } from '@/types/profile'

const profile = ref<Profile>({
  name: '',
  surname: '',
  email: '',
  phone: '',
  birthday: '',
  city_id: '',
  city_name: ''
})

const isLoaded = ref(false)
const error = ref<string | null>(null)

const fetchProfile = async () => {
  try {
    const res = await api.get('profile/settings/')
    const data = res.data

    profile.value = {
      ...data,
      city_id: data.city?.id || '',
      city_name: data.city?.name || ''
    }

    isLoaded.value = true
  } catch (err) {
    console.error('Ошибка загрузки профиля', err)
    error.value = 'Не удалось загрузить профиль'
  }
}

export function useProfile() {
  if (!isLoaded.value) {
    onMounted(fetchProfile)
  }

  return {
    profile,
    fetchProfile,
    error,
    isLoaded,
  }
}
