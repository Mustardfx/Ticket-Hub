import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { IMaskDirective } from 'vue-imask'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import i18n from './Languages/i18n'
import { Icon } from '@iconify/vue'
import VueQrcodeReader from 'vue-qrcode-reader'

const app = createApp(App)

app.directive('focus', {
  mounted: (el) => {
    el.focus()
  },
})

app.use(createPinia())
app.use(router)
app.use(i18n)
app.component('Icon', Icon)
app.directive('mask', IMaskDirective)

// app.use(VueQrcodeReader) // включишь, когда понадобится
app.mount('#app')
