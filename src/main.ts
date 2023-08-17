import '@/assets/css/index.css'
import 'normalize.css'
import loading from "@/directive/loadingDir";
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


const app = createApp(App)
app.directive('loading',loading)
app.use(createPinia())
app.use(router)
app.mount('#app')

