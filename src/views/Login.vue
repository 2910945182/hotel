<template>
    <div class="container">

        <div class="login" :model="loginData">

            <h2>酒店管理系统</h2>

            <div class="item">
                <span>账号:</span>
                <el-input v-model="loginData.loginId" placeholder="admin"/>
            </div>

            <div class="item"> 
                <span>密码:</span>
                <el-input type="password" v-model="loginData.loginPwd" placeholder="123321"/>
            </div>

            <div class="item">
                <el-checkbox v-model="loginData.ckMe" label="记住密码"></el-checkbox>
            </div>

            <div class="item">
                <el-button type="primary" @click="adminLogin">登录</el-button>
                <el-button>取消</el-button>
            </div>

        </div>

    </div>
</template>

<script setup>
import { reactive, onBeforeMount } from "vue";
import { login, LoginAuto } from "../api/admin";
import { useRouter } from "vue-router";

let router = useRouter();

onBeforeMount(async () => {
    if(await LoginAuto()){
        router.push('/layout/mine')
    }
})

let loginData = reactive({
    loginId: '',
    loginPwd: '',
    ckMe: false,
});

let adminLogin = async () => {
    let success = await login(loginData);
    if (success) {
        router.push("/layout/mine");
    }
}
</script>

<style lang="less" scoped>
.container {
    width: 360px;
    margin: 0 auto;
    position: relative;
    top: 140px;
    padding: 20px 50px;
    border: 1px solid rgb(164, 158, 158);
    border-radius: 10px;
    .login h2 {
        text-align: center;
        margin-bottom: 40px;
    }
}
.item {
    display: flex;
    margin-top: 10px;

    span {
        width: 60px;
    }
}
</style>