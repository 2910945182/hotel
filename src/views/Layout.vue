<template>
    <div class="container">
        <div class="left" :style="{ width: isCollapse ? '65px' : '200px', background: currentThemeColor }">

            <div class="logo">
                <div>{{ !isCollapse ? '酒店管理系统' : 'bing' }}</div>
            </div>

            <el-col>
                <el-menu active-text-color="#ffd04b" :background-color="currentThemeColor" class="el-menu-vertical-demo"
                    text-color="#fff" :collapse="isCollapse" style="border: 0" router>

                    <el-sub-menu index="1">
                        <template #title>
                            <span>账户管理</span>
                        </template>
                        <el-menu-item index="/layout/role">角色管理</el-menu-item>
                        <el-menu-item index="/layout/admin">账户管理</el-menu-item>
                    </el-sub-menu>

                    <el-sub-menu index="2">
                        <template #title>
                            <span>客房管理</span>
                        </template>
                        <el-menu-item index="/layout/roomType">类型管理</el-menu-item>
                        <el-menu-item index="/layout/room">客房管理</el-menu-item>
                    </el-sub-menu>

                    <el-sub-menu index="3">
                        <template #title>
                            <span>顾客管理</span>
                        </template>
                        <el-menu-item index="">顾客管理</el-menu-item>
                    </el-sub-menu>

                    <el-sub-menu index="4">
                        <template #title>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="">权限管理</el-menu-item>
                    </el-sub-menu>

                </el-menu>
            </el-col>
        </div>

        <div class="right">
            <div class="top" :style="{ background: currentThemeColor }">
                <div style="width:500px;">
                    <el-menu :default-active="activeIndex1" class="el-menu-demo" mode="horizontal"
                        :background-color="currentThemeColor" style="border: 0;height: 60px" text-color="#fff"
                        active-text-color="#ffd04b" router>
                        <el-menu-item index="/layout/home">首页</el-menu-item>
                        <el-menu-item index="/layout/email">邮件</el-menu-item>
                        <el-menu-item index="/layout/message">消息</el-menu-item>

                        <el-sub-menu index="4">
                            <template #title>{{ log.admin.name }}</template>
                            <el-menu-item index="/layout/mine">个人中心</el-menu-item>
                            <el-menu-item index="" @click="$router.push('layout/resetPwd')">修改密码</el-menu-item>
                            <el-menu-item index="4-3" @click="exit">退出系统</el-menu-item>
                        </el-sub-menu>

                        <el-sub-menu index="5">
                            <template #title>切换皮肤</template>
                            <el-menu-item @click="changeTheme(index)" :index="'4-' + (index + 1)"
                                v-for="(item, index) in store.colors" :key="item.index">{{ item.name }}</el-menu-item>
                        </el-sub-menu>

                    </el-menu>
                </div>
            </div>

            <div class="bottom">
                <router-view></router-view>
            </div>

        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs, computed, onBeforeMount } from 'vue'
import { useColorStore } from '../store/theme01'
import { useLoginStore } from '../store/admin'
import { useRouter } from 'vue-router'
import { getOne } from '../api/admin'

let store = useColorStore()

let log = useLoginStore()

let router = useRouter()

if (localStorage.getItem('colorName') && localStorage.getItem('color')) {
    let color = {
        name: localStorage.getItem('colorName'),
        color: localStorage.getItem('color'),
    }
    store.currentThemeColor.color = color.color
}

let data = reactive({
    isCollapse: false
})

// 从全局状态里面获取当前主题色
let currentThemeColor = computed(() => {
    return store.currentThemeColor.color
})

// 切换主题的方法
let changeTheme = (index) => {
    localStorage.setItem('colorName', store.colors[index].name)
    localStorage.setItem('color', store.colors[index].color)
    let { name, color } = store.colors[index]
    store.currentThemeColor.name = name;
    store.currentThemeColor.color = color;
}

// 退出系统
let exit = () => {
    sessionStorage.clear()
    localStorage.clear()
    router.push('/login')
}

// 页面挂载之前
onBeforeMount(async () => {
    let token = sessionStorage.getItem('token')
    // 判断是否有token
    // if(!token) {
    //     router.push('/login')
    // }
    // 获取登录账号
    let loginId = localStorage.getItem('loginId')
    let r = await getOne({ loginId })
})
</script>

<style scoped="scoped">
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
}

.container .left {
    width: 200px;
    transition: all 0.4s;
}

.container .left .logo {
    line-height: 60px;
    display: flex;
    justify-content: center;
    align-content: center;
}

.container .left .logo div {
    color: #fff;
    font-size: 18px;
    border-radius: 4px;
    flex-shrink: 0;
}


.container .right {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.container .right .top {
    height: 60px;
    display: flex;
    flex-direction: row-reverse;
}

.container .right .bottom {
    flex: 1;
}

.bottom {
    flex: 1;
    padding: 10px;
}
</style>