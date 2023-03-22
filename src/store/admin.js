import { defineStore } from 'pinia'

// 当前登录账户信息模块
export const useLoginStore = defineStore('login', {
    state:()=>{
        return { 
            // 用于保存当前登录账户信息
            admin:{
                name: '管理员',
                role: {}
            }
        }
    },
    getters:{
       
    },
    actions:{
        setAdmin(store,val) {
            store.commit('setAdmin',val)
        }
    }
})