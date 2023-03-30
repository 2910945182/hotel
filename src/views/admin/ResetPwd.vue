<template>
    <div class="box">
        <div class="item">
            <span>初始密码:</span>
            <el-input size="mini" type="password" v-model="data.oldLoginPwd" placeholder="请输入密码" />
        </div>

        <div class="item">
            <span>最新密码:</span>
            <el-input size="mini" type="password" v-model="data.newLoginPwd" placeholder="确认密码" />
        </div>

        <div class="item">
            <span>确认密码:</span>
            <el-input size="mini" type="password" v-model="data.newLoginPwd2" placeholder="确认密码" />
        </div>

        <div class="item">
            <span></span>
            <el-button type="primary" size="mini">修改</el-button>
            <el-button type="default" size="mini" @click="clearFormData">取消</el-button>
        </div>
    </div>
</template>

<script setup>
// 导入组合式api
import { reactive } from 'vue';
// 导入api方法
import { resetPwd } from '../../api/admin'
// 导入全局状态管理
import { useStore } from 'vuex'

// 获取全局状态管理
let store = useStore()

let data = reactive({
    oldLoginPwd: '',
    newLoginPwd: '',
    newLoginPwd2: '',
})

// 清空表单数据的方法
let clearFormData = () => {
    data.oldLoginPwd = ''
    data.newLoginPwd = ''
    data.newLoginPwd2 = ''
}

// 提交表单数据的方法
let editForm = async () => {
    // 获取当前登录账户的id信息
    data.id = store.state.admin.admin.id
    await resetPwd(data)
}

</script>

<style lang="less" scoped>
.box {
    width: 300px;
}
</style>