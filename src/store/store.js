import { defineStore } from 'pinia'


// name: 一个字符串，必传项，该store的唯一id
// options: 一个对象，store的配置项，比如配置store内的数据，修改数据的方法等
export const useUserStore = defineStore('main',{
    state: ()=>{
        return {
            name: 'hello world',
            age: 22,
            gender: '男'
        }
    },
    getters: {
        getAge: (state)=>{
            return state.age+10;
        },
        getName() {
            return this.name + this.getAge
        }
    },
    actions: {
        saveName(name) {
            // this指向的是当前store
            this.name = name;
            // 发送请求、拿到token、存储token
        }
    }
})