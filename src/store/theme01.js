import { defineStore } from 'pinia'

export const useColorStore = defineStore('main', {
    state:()=>{
        return { 
            colors: [
                {
                    name: '蓝色主题',
                    color: '#134857'
                },
                {
                    name: '绿色主题',
                    color: '#497568'
                },
                {
                    name: '红色主题',
                    color: '#481e1c'
                },
                {
                    name: '黑色主题',
                    color: '#000000'
                },
                {
                    name: '灰色主题',
                    color: '#545c64'
                }
            ],
            // 当前主题色
            currentThemeColor:{
                name: '',
                color: ''
            }
         }
    },
    getters:{
       
    },
    actions:{
        
    }
})