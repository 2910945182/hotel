import { createStore } from 'vuex'
// 导入主题模块
import theme from './theme'
// 导入当前登录账户模块
import admin from './admin'

export default createStore({
    // 定义模块
    modules: {
        theme,
        admin
    }
})