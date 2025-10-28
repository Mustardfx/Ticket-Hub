<template>
    <aside class="w-full sm:w-64 bg-gray-800 text-white min-h-screen p-4">
      <nav class="space-y-2">
        <RouterLink
          to="/admin"
          class="block py-2 px-4 rounded hover:bg-gray-700"
          active-class="bg-gray-700"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          to="/admin/users"
          class="block py-2 px-4 rounded hover:bg-gray-700"
          active-class="bg-gray-700"
        >
          User Management
        </RouterLink>
        <!-- Add more admin links here -->
      </nav>
    </aside>
  </template>
  
  <script setup lang="ts">
  import { RouterLink } from 'vue-router'
  </script>
  