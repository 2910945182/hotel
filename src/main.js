import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import '../src/assets/gloable.css'
import Router from './router/index.js'
import App from './App.vue'

const app = createApp(App)

const pinia = createPinia()

app.use(Router)

app.use(pinia)

app.use(ElementPlus)

app.mount('#app')
