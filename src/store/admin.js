import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login', {
    state:()=>{
        return { 
            admin:{
                id: '',
                loginId: '',
                loginPwd: '',
                name: '',
                phone: '',
                photo: '',
                role: {
                    roleId : '', 
                    roleName: ''
                }
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