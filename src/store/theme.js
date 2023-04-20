import { defineStore } from 'pinia'

export const useColorStore = defineStore('main', {
    state:()=>{
        return { 
            colors: [
                {
                    id: 1,
                    name: '蓝色主题',
                    color: '#134857'
                },
                {
                    id: 2,
                    name: '灰色主题',
                    color: '#545c64'
                }
            ],
            currentThemeColor:{
                name: '灰色主题',
                color: '#545c64'
            }
         }
    },
    getters:{
       
    },
    actions:{
        
    }
})