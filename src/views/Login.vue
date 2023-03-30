<template>
    <div class="container">

        <div class="login" :model="loginData">
            <div class="item">
                <h2>酒店管理系统</h2>
            </div>
            <div class="item">
                <span>账号:</span>
                <el-input v-model="loginData.loginId" />
            </div>
            <div class="item"> 
                <span>密码:</span>
                <el-input type="password" v-model="loginData.loginPwd" />
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
// 导入组合式api
import { reactive, onBeforeMount } from "vue";
// 导入访问后台api
import { login, LoginAuto } from "../api/admin";
import { useRouter } from "vue-router";

// 获取当前项目中的路由器对象
let router = useRouter();

// 页面挂载之前
onBeforeMount(async () => {
    if(await LoginAuto()){
        router.push('/layout')
    }
})

// 定义登录数据
let loginData = reactive({
    loginId: '',
    loginPwd: '',
    ckMe: false,
});

// 管理员登录方法
let adminLogin = async () => {
    // 调用登录api,返回是否登录成功
    let success = await login(loginData);
    // 登录成功,跳转到布局页
    if (success) {
        router.push("/layout");
    }
};
</script>

<style scoped="scoped">
.container {
    width: 360px;
    margin: 0 auto;
    position: relative;
    top: 140px;
    padding: 20px 50px;
    border: 1px solid rgb(164, 158, 158);
    border-radius: 10px;
}

.container .login h2 {
    text-align: center;
}
</style>