import { defineStore } from 'pinia'

export const useColorStore = defineStore('main', {
    state:()=>{
        return { 
            colors: [
                {   
                    colorId: 1,
                    name: '蓝色主题',
                    color: '#134857'
                },
                {
                    colorId: 2,
                    name: '绿色主题',
                    color: '#497568'
                },
                {
                    colorId: 3,
                    name: '红色主题',
                    color: '#481e1c'
                },
                {
                    colorId: 4,
                    name: '黑色主题',
                    color: '#000000'
                },
                {
                    colorId: 5,
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