<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Edit Object</h2>
        <form @submit.prevent="submitEdit">
          <div class="space-y-4">
            <input v-model="edited.name" placeholder="Name" class="input" />
            <input v-model="edited.description" placeholder="Description" class="input" />
            <input v-model="edited.address" placeholder="Address" class="input" />
            <input v-model="edited.working_hours" placeholder="Working Hours" class="input" />
            <input v-model="edited.price" type="number" placeholder="Price" class="input" />
            <input v-model="edited.image" placeholder="Image URL" class="input" />
          </div>
          <div class="mt-4 flex justify-end gap-2">
            <button @click="emit('close')" type="button" class="btn">Cancel</button>
            <button type="submit" class="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import axios from 'axios'
  import type { CulturalObject } from '@/types/cultural-object'
  
  const props = defineProps<{
    object: CulturalObject
    show: boolean
  }>()
  
  const emit = defineEmits(['close', 'updated'])
  
  const edited = ref({ ...props.object })
  
  watch(() => props.object, () => {
    edited.value = { ...props.object }
  })
  
  const submitEdit = async () => {
    try {
      await axios.put(`http://localhost:8000/api/objects/${edited.value.id}/`, edited.value)
      emit('updated', edited.value)
      emit('close')
    } catch (err) {
      console.error('Failed to update:', err)
    }
  }
  </script>
  
  <style scoped>
  .input {
    @apply w-full border border-gray-300 rounded-md px-3 py-2;
  }
  .btn {
    @apply border px-4 py-2 rounded-md;
  }
  .btn-primary {
    @apply bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700;
  }
  </style>
  