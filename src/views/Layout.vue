<template>

    <div class="container">
        <div class="left" :style="{ background: currentThemeColor }">

            <div class="logo">
                <h3>{{ '酒店管理系统' }}</h3>
            </div>

            <el-col>
                <el-menu 
                    active-text-color="#ffd04b" 
                    :background-color="currentThemeColor" 
                    class="el-menu-vertical-demo"
                    text-color="#fff" 
                    style="border: 0" 
                    router>

                    <el-menu-item index="/layout/role" v-if="useLoginStore().admin.role.roleId == 1">
                        <el-icon><User /></el-icon>
                        <span>角色管理</span>
                    </el-menu-item>

                    <el-menu-item index="/layout/admin" v-if="useLoginStore().admin.role.roleId == 1">
                        <el-icon><Avatar /></el-icon>
                        <span>账户管理</span>
                    </el-menu-item>

                    <el-menu-item index="/layout/roomType" v-if="useLoginStore().admin.role.roleId == 1">
                        <el-icon><Menu /></el-icon>
                        <span>房间类型</span>
                    </el-menu-item>

                    <el-menu-item index="/layout/room" v-if="useLoginStore().admin.role.roleId == 1">
                        <el-icon><House /></el-icon>
                        <span>房间管理</span>
                    </el-menu-item>

                    <el-menu-item index="/layout/guest">
                        <el-icon><Document /></el-icon>
                        <span>订单管理</span>
                    </el-menu-item>

                    <el-menu-item index="/layout/home" v-if="useLoginStore().admin.role.roleId == 1">
                        <el-icon><Histogram /></el-icon>
                        <span>营业统计</span>
                    </el-menu-item>

                    <el-menu-item index="/layout/mine">
                        <el-icon><UserFilled /></el-icon>
                        <span>个人中心</span>
                    </el-menu-item>

                    <el-menu-item index="/layout/resetPwd">
                        <el-icon><UserFilled /></el-icon>
                        <span>修改密码</span>
                    </el-menu-item>

                    <el-menu-item>
                        <div @click="exit" style="width:100%">
                            <el-icon><SwitchButton /></el-icon>
                            <span>退出</span>
                        </div>
                    </el-menu-item>

                </el-menu>
            </el-col>
        </div>

        <div class="right">
            <div class="top">
                <div style="width:200px;">
                    <el-menu 
                        :default-active="activeIndex1" 
                        class="el-menu-demo" 
                        mode="horizontal"
                        style="border: 0;height: 59px" 
                        active-text-color="black" >

                        <el-sub-menu>
                            <template #title>切换主题</template>
                            <el-menu-item 
                                @click="changeTheme(index)"
                                v-for="(item,index) in store.colors" 
                                :key="item.id"
                                :index="item.index">
                                {{ item.name }}
                            </el-menu-item>
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
import { computed, onBeforeMount } from 'vue'
import { useColorStore } from '../store/theme'
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

let currentThemeColor = computed(() => {
    return store.currentThemeColor.color
})

let changeTheme = (index) => {
    localStorage.setItem('colorName', store.colors[index].name)
    localStorage.setItem('color', store.colors[index].color)
    let { name, color } = store.colors[index]
    store.currentThemeColor.name = name;
    store.currentThemeColor.color = color;
}

let exit = () => {
    sessionStorage.clear()
    localStorage.clear()
    router.push('/login')
}

onBeforeMount(async () => {
    let token = sessionStorage.getItem('token')
    if(!token) {
        router.push('/login')
    }

    let loginId = localStorage.getItem('loginId')
    let r = await getOne({ loginId })
    log.admin = r
    localStorage.setItem('roleId',r.role.roleId)
})

</script>

<style scoped="scoped">
.container {
    width: 100vw;
    height: 100vh;
}

.container .left {
    width: 150px;
    float: left;
    height: 100%;
}

.el-sub-menu .el-menu-item {
    width: 150px;
}

.container .left .logo {
    line-height: 60px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-content: center;
}

.container .right {
    flex: 1;
    display: flex;
    flex-direction: column;
}
.container .right .top {
    height: 59px;
    border-bottom: 1px solid #606266;
    display: flex;
    flex-direction: row-reverse;
}

.container .right .bottom {
    flex: 1;
}
.bottom {
    padding: 10px;
}
</style>

<style>
.container .left .el-col .el-menu-vertical-demo .el-sub-menu .el-menu-item {
    width: 150px;
    min-width: 0;
}
</style>