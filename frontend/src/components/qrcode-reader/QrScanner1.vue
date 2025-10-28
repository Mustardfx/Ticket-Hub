<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <!-- Карточка -->
    <div class="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-md flex flex-col items-center animate-fade-in">
      <h1 class="text-3xl font-extrabold text-gray-800 mb-4">QR Validator</h1>

      <!-- Контейнер камеры -->
      <div
        id="reader"
        class="w-full rounded-xl overflow-hidden border-4 border-indigo-500 shadow-lg"
      ></div>

      <!-- Результат -->
      <transition name="fade">
        <div
          v-if="resultMessage"
          :class="['mt-5 px-4 py-3 rounded-lg text-center font-medium shadow-md w-full', alertClass]"
        >
          {{ resultMessage }}
        </div>
      </transition>

      <!-- Кнопка -->
      <button
        @click="startScanner"
        class="mt-5 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
      >
        🔄 Сканировать снова
      </button>
    </div>

    <!-- Фоновые элементы -->
    <div class="absolute top-0 left-0 w-40 h-40 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div class="absolute bottom-0 right-0 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
    <div class="absolute top-1/2 left-1/4 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';

interface ValidationResponse {
  valid: boolean;
  message: string;
}

const resultMessage = ref('');
const alertClass = ref('');
let html5QrCode: Html5Qrcode | null = null;

/** Проверка токена на бэкенде */
const validateToken = async (token: string) => {
  try {
    const { data } = await axios.get<ValidationResponse>(
      `http://localhost:8080/validate`,
      { params: { token } }
    );

    alertClass.value = data.valid
      ? 'bg-green-100 text-green-800 border border-green-300'
      : 'bg-yellow-100 text-yellow-800 border border-yellow-300';

    resultMessage.value = data.message;
  } catch (err) {
    console.error(err);
    alertClass.value = 'bg-red-100 text-red-800 border border-red-300';
    resultMessage.value = 'Ошибка связи с сервером';
  }
};

/** Запуск сканера */
const startScanner = async () => {
  resultMessage.value = '';

  if (html5QrCode) {
    await html5QrCode.clear().catch(() => {});
  }

  html5QrCode = new Html5Qrcode('reader');

  try {
    const cameras = await Html5Qrcode.getCameras();
    if (!cameras.length) throw new Error('Камера не найдена');

    await html5QrCode.start(
      cameras[0].id,
      { fps: 10, qrbox: 300 },
      (qrMsg) => {
        html5QrCode?.stop().then(() => validateToken(qrMsg));
      },
      (err) => console.debug('scan error:', err)
    );
  } catch (e) {
    console.error('Ошибка сканера:', e);
    alertClass.value = 'bg-red-100 text-red-800 border border-red-300';
    resultMessage.value = 'Не удалось получить доступ к камере';
  }
};

onMounted(() => {
  startScanner();
});
</script>

<style scoped>
/* Анимация плавного появления */
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}

/* Плавающие цветные круги */
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
.animate-blob {
  animation: blob 8s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

/* Fade transition для результата */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
