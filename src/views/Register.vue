<template>
    <h3>{{ app.name }}</h3>
    <h3>{{ store.getAge }}</h3>
    <h3>{{ store.getName }}</h3>
    <el-button @click="changeName">click</el-button>
    <el-button @click="reset">重置</el-button>
    <el-button @click="patchStore">批量修改</el-button>
</template>

<script setup>
import { useUserStore } from '../store/store.js'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'

const store = useUserStore();

// 解构
const { name,age,gender } = storeToRefs(store);

const app = reactive({
    name: name,
    age: age,
    gender: ''
})

const changeName = ()=>{
    store.name = '小杨';
}

const reset = ()=>{
    store.$reset();
}

const patchStore = ()=>{
    store.$patch({
        name: 'jake',
        age: 99,
        gender: 'man'
    })
}

console.log(store)
</script>












