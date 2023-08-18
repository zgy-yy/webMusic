import '@/assets/css/index.css'
import 'normalize.css'
import loading from "@/directive/loadingDir";
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import lazyPlugin from "vue3-lazy";


const app = createApp(App)
app.directive('loading',loading)
app.use(createPinia())
app.use(router)
app.use(lazyPlugin,{
    loading:'/src/assets/icon/none.svg'
})
app.mount('#app')

