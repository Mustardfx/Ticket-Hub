<template>
        <div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
            <h2 class="text-2xl font-bold mb-4">Статистика</h2>
            <div class="mb-4 text-gray-500">Статистика будет позже</div>
            <!-- Мок-график -->
            <div class="flex items-end h-40 gap-4 justify-center">
                <div v-for="val in mockData" :key="val.label" class="flex flex-col items-center">
                    <div :style="{ height: val.value + 'px' }" class="w-8 bg-indigo-400 rounded-t"></div>
                    <span class="text-xs mt-2">{{ val.label }}</span>
                </div>
            </div>
            <div class="mt-4 text-xs text-gray-400">* Мок-данные для примера</div>
        </div>
</template>

<script setup lang="ts">

const mockData = [
    { label: 'Янв', value: 60 },
    { label: 'Фев', value: 80 },
    { label: 'Мар', value: 40 },
    { label: 'Апр', value: 100 },
    { label: 'Май', value: 70 },
    { label: 'Июн', value: 90 },
]
</script>

<style scoped>

</style>