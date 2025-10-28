<template>
  <DefaultLayout>
    <ProfileLayout :form="profile">
      <h2 class="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Настройки профиля</h2>

      <div v-if="isLoading" class="text-center py-8 sm:py-12">
        <div class="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-indigo-600 mx-auto"></div>
      </div>
      <div v-else-if="error" class="text-center py-8 sm:py-12 px-4">
        <p class="text-red-600 mb-4 text-sm sm:text-base">{{ error }}</p>
        <button @click="fetchProfile" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm sm:text-base">
          Попробовать снова
        </button>
      </div>
      <div v-else>
        <ProfileForm :form="profile" @submit="handleSubmit" />
      </div>
    </ProfileLayout>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ProfileLayout from '@/layouts/ProfileLayout.vue'
import ProfileForm from '@/components/ProfileForm.vue'
import { User } from '@/types/profile'
import { ref, onMounted } from 'vue'
import api from '@/api/axios'

const profile = ref<User>({
  id: 0,
  name: '',
  surname: '',
  email: '',
  phone: '',
  birthday: '',
  city_id: null,
  city_name: null,
  city: null
})

const isLoading = ref(true)
const error = ref('')

const fetchProfile = async () => {
  try {
    const res = await api.get('profile/settings/')
    const data = res.data

    profile.value = {
      ...data,
      city_id: data.city?.id || null,
      city_name: data.city?.name || null
    }

  } catch (e) {
    console.error('Ошибка загрузки профиля', e)
    error.value = 'Не удалось загрузить профиль'
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async (updatedProfile: User) => {
  try {
    const toISO = (dateStr: string) => {
      if (!dateStr) return null;
      const [d, m, y] = dateStr.split('.');
      return `${y}-${m}-${d}`;
    };

    const payload = {
      ...updatedProfile,
      birthday: toISO(updatedProfile.birthday),
      city: updatedProfile.city_id,
    };

    console.log('>> payload:', payload);

    await api.put('profile/settings/', payload);
    profile.value = { ...updatedProfile };
    alert('Данные успешно сохранены!');
  } catch (e) {
    console.error('Ошибка при сохранении профиля', e);
    alert('Не удалось сохранить изменения.');
  }
};


onMounted(fetchProfile)

</script>
