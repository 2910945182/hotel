<template>
    <div class="box">
        <div class="item">
            <span>初始密码:</span>
            <el-input size="mini" type="password" v-model="oldLoginPwd" placeholder="请输入密码" />
        </div>

        <div class="item">
            <span>最新密码:</span>
            <el-input size="mini" type="password" v-model="newLoginPwd" placeholder="确认密码" />
        </div>

        <div class="item">
            <span>确认密码:</span>
            <el-input size="mini" type="password" v-model="newLoginPwd2" placeholder="确认密码" />
        </div>

        <div class="item">
            <span></span>
            <el-button type="primary" size="mini">修改</el-button>
            <el-button type="default" size="mini" @click="clearFormData">取消</el-button>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { resetPwd } from '../../api/admin'

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
    data.id = store.state.admin.admin.id
    await resetPwd(data)
}
</script>

<style lang="less" scoped>
.box {
    width: 300px;
}
</style>