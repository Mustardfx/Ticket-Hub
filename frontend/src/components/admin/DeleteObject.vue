<template>
    <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 class="text-lg font-bold mb-4">Are you sure?</h2>
        <p>This will permanently delete <strong>{{ object.name }}</strong>.</p>
        <div class="mt-4 flex justify-end gap-2">
          <button @click="emit('close')" class="btn">Cancel</button>
          <button @click="deleteObject" class="btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import axios from 'axios'
  import type { CulturalObject } from '@/types/cultural-object'

  const props = defineProps<{
    object: CulturalObject
    show: boolean
  }>()

  const emit = defineEmits(['close', 'deleted'])

  const deleteObject = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/objects/${props.object.id}`)
      emit('deleted', props.object.id)
      emit('close')
    } catch (error) {
      console.error('Delete failed:', error)
    }
  }
  </script>

  <style scoped>
  .btn {
    @apply border px-4 py-2 rounded-md;
  }
  .btn-danger {
    @apply bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700;
  }
  </style>
