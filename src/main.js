import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { ElLoading } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import Router from './router'
import axios from 'axios'
import App from './App.vue'
import './assets/global.css'
import { createPinia } from 'pinia'

const app = createApp(App)

const pinia = createPinia();

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

axios.defaults.baseURL = 'http://127.0.0.1:5173'

// 请求拦截器
axios.interceptors.request.use((config) => {
    const loadingInstance = ElLoading.service({ fullscreen: true })
    setTimeout(() => {
        // 关闭全局Loading
        loadingInstance.close()
    }, 1000)
    return config;
})

app.use(ElementPlus)

app.use(Router)

app.use(pinia)

app.mount('#app')
