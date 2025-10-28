<template>
  <div v-if="object" class="relative group bg-white rounded-xl shadow-sm sm:shadow p-4 sm:p-4 hover:shadow-lg transition duration-300 transform hover:scale-[1.015]">

    <div v-if='isAdmin' class="absolute top-2 right-2 z-10 flex space-x-2">
      <button @click.stop="showEdit = true" class="text-indigo-600 border border-indigo-600 px-2 py-0.5 rounded text-xs">✏️ Edit</button>
      <button @click.stop="showDelete = true" class="text-red-600 border border-red-600 px-2 py-0.5 rounded text-xs">🗑️ Delete</button>
    </div>

    <EditObject
      v-if="showEdit"
      :show="showEdit"
      :object="object"
      @close="showEdit = false"
      @updated="onUpdated"
    />
    <DeleteObject
      v-if="showDelete"
      :show="showDelete"
      :object="object"
      @close="showDelete = false"
      @deleted="onDeleted"
    />

    <router-link :to="`/objects/${object.id}`" class="block">
      <div class="overflow-hidden rounded-lg mb-4 sm:mb-4">
        <img
          v-if="object.image_url && isValidImageUrl(object.image_url)"
          :src="getImageUrl(object.image_url)"
          :alt="object.name"
          class="w-full h-56 sm:h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          @error="(e) => ((e.target as HTMLImageElement).src = placeholderImage)"
        />
        <div v-else class="w-full h-56 sm:h-48 bg-gray-200 flex items-center justify-center rounded-lg">
          <div class="text-center text-gray-500">
            <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"/>
            </svg>
            <p class="text-xs">Нет фото</p>
          </div>
        </div>
      </div>
      <h3 class="text-xl sm:text-lg font-bold mb-2 sm:mb-1 group-hover:text-indigo-700 transition line-clamp-2 leading-tight">
        {{ object.name }}
      </h3>
      <p class="text-base sm:text-sm text-gray-600 line-clamp-1 leading-relaxed">
        {{ object.city_name }}{{ object.city_country ? `, ${object.city_country}` : '' }} <span v-if="object.address">• {{ object.address }}</span>
      </p>
      <p v-if="object.working_hours" class="text-base sm:text-sm text-gray-500 flex items-center gap-2 sm:gap-1 mt-2 sm:mt-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5 sm:size-4" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span class="line-clamp-1">{{ object.working_hours }}</span>
      </p>
      <p class="text-gray-900 font-bold mt-3 sm:mt-2 text-xl sm:text-base">{{ object.price }} ₸</p>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CulturalObject } from '@/types/cultural-object'
import { useUserStore } from '@/stores/useStores'
import EditObject from '@/components/admin/EditObject.vue'
import DeleteObject from '@/components/admin/DeleteObject.vue'


const props = defineProps<{ object: CulturalObject }>()
const showEdit = ref(false)
const showDelete = ref(false)
const placeholderImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzY2NjY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4='
const userStore = useUserStore()
const isAdmin = userStore.isAdmin


const emit = defineEmits<{
  (e: 'update', updated: CulturalObject): void
  (e: 'remove', id: number): void
}>()

const onUpdated = (updated: CulturalObject) => {
  emit('update', updated)
  showEdit.value = false
}

const onDeleted = (id: number) => {
  emit('remove', id)
  showDelete.value = false
}

const getImageUrl = (imageUrl: string | null) => {
  if (!imageUrl) return placeholderImage
  if (imageUrl.startsWith('http')) return imageUrl
  return `http://localhost:8000${imageUrl}`
}

const isValidImageUrl = (imageUrl: string) => {
  return imageUrl && imageUrl.trim() !== '' && !imageUrl.includes('666666')
}
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>

