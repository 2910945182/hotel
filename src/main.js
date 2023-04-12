import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入中文国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import '../src/assets/gloable.css'
import Router from './router/index.js'
import App from './App.vue'
// 执行mockjs（后台接口没有做好之前，自己模拟数据）
// 后台接口完成后，注释如下一行
// import './mock/index'

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

const pinia = createPinia()

app.use(Router)

app.use(pinia)

app.use(ElementPlus)

app.use(VueQuillEditor)

app.use(ElementPlus, { locale: zhCn, })

app.mount('#app')
