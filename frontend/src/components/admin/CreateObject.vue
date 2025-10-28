<template>
    <div class="flex flex-col items-center justify-center mt-4">
      <!-- Add New Object Button -->
      <div>
        <button 
          @click="showModal = true"
          class="border border-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition"
        >
          Add New Object
        </button>
      </div>
  
      <!-- Objects Grid -->
      <!-- <div class="flex-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        <ObjectCard v-for="obj in objects" :key="obj.id" :object="obj" />
      </div> -->
  
      <!-- Add Object Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 class="text-xl font-bold mb-4">Add New Cultural Object</h2>
          
          <form @submit.prevent="handleSubmit">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input v-model="newObject.name" type="text" required class="mt-1 py-2 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">City</label>
                <input v-model="newObject.city" type="text" required class="mt-1 py-1.5 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Address</label>
                <input v-model="newObject.address" type="text" class="mt-1 py-1.5 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Working Hours</label>
                <input v-model="newObject.working_hours" type="text" class="mt-1 py-1.5 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Price</label>
                <input v-model="newObject.price" type="number" required class="mt-1 py-1.5 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700">Image URL</label>
                <input v-model="newObject.image" type="url" class="mt-1 py-1.5 px-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              </div>
            </div>
            
            <div class="mt-6 flex justify-end space-x-3">
              <button 
                type="button" 
                @click="showModal = false"
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Object
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ObjectCard from '../ObjectCard.vue'
import type { CulturalObject } from '@/types/cultural-object'

  
const objects = ref<CulturalObject[]>([])
const showModal = ref(false)
const newObject = ref<Partial<CulturalObject>>({
    name: '',
    description: '',
    city: 1, // ID города
    address: '',
    working_hours: '',
    price: 0,
    category: 'other',
    image: ''
})
  
  // Fetch objects from API
const fetchObjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/objects/')
      objects.value = response.data
    } catch (error) {
      console.error('Error fetching objects:', error)
    }
}
  
  // Add new object
const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/objects/', newObject.value)
      objects.value.push(response.data)
      showModal.value = false
      resetForm()
    } catch (error) {
      console.error('Error adding object:', error)
    }
}
  
  // Reset form
const resetForm = () => {
    newObject.value = {
      name: '',
      description: '',
      city: 1,
      address: '',
      working_hours: '',
      price: 0,
      category: 'other',
      image: ''
    }
  }
  
  // Fetch objects when component mounts
  onMounted(() => {
    fetchObjects()
  })
  </script>
  