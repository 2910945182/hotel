<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="140px">
                <el-row class="tac" width="140px">
                    <el-col width="140px">
                        <el-menu
                            active-text-color="#ffd04b"
                            background-color="#545c64"
                            class="el-menu-vertical-demo"
                            default-active="2"
                            text-color="#fff"
                            @open="handleOpen"
                            @close="handleClose"
                            router
                        >

                            <div style="height: 60px; text-align: center; line-height:60px;">
                                <h3 style="color:#fff">酒店管理系统</h3>
                            </div>

                            <el-menu-item index="/home">
                            <el-icon><Menu /></el-icon>
                            <span>房间管理</span>
                            </el-menu-item>

                            <el-menu-item index="/order">
                            <el-icon><Document /></el-icon>
                            <span>预定订单</span>
                            </el-menu-item>

                            <el-menu-item index="/order02">
                            <el-icon><Tickets /></el-icon>
                            <span>现场订单</span>
                            </el-menu-item>

                            <el-menu-item index="/income">
                            <el-icon><Histogram /></el-icon>
                            <span>营业统计</span>
                            </el-menu-item>
                        
                            <el-menu-item index="/mine">
                            <el-icon><Avatar /></el-icon>
                            <span>个人中心</span>
                            </el-menu-item>

                            <el-menu-item index="/staff">
                            <el-icon><Avatar /></el-icon>
                            <span>员工管理</span>
                            </el-menu-item>

                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>

            <el-container>
                <el-header>
                    <slot name="search"></slot>
                    <slot name="status"></slot>
                    <!-- 头像 -->
                    <!-- button 退出登录 -->
                    <el-link @click="exit" style="position: absolute; right: 40px;">退出登录</el-link>
                    <!-- <el-avatar :icon="UserFilled" style="position: absolute; right: 40px;"/> -->
                </el-header>
                <el-main>
                    <slot name="main"></slot>
                </el-main>
            </el-container>

        </el-container>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router.js'
import { Search } from '@element-plus/icons-vue'
import { UserFilled } from '@element-plus/icons-vue'

const input2 = ref('')

const exit = ()=>{
    // 移除token
    localStorage.removeItem('token')
    // 跳转到登录页
    router.push('/login')
}

</script>

<style scoped>
.el-menu {
    height: 100vh;
}

.el-header {
    border-bottom: 1px solid rgb(170, 170, 170);
    display: flex;
    align-items: center;
}
</style>