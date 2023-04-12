<template>
    <div class="box">
        <div class="item">
            <span>初始密码:</span>
            <el-input type="password" v-model="data.oldLoginPwd" />
        </div>

        <div class="item">
            <span>最新密码:</span>
            <el-input type="password" v-model="data.newLoginPwd" />
        </div>

        <div class="item">
            <span>确认密码:</span>
            <el-input type="password" v-model="data.newLoginPwd2" />
        </div>

        <div class="item">
            <span></span>
            <el-button type="primary" plain @click="editForm">修改</el-button>
            <el-button type="default" plain @click="clearFormData">取消</el-button>
        </div>
    </div>
</template>

<script setup>
// 导入组合式api
import { reactive } from 'vue';
// 导入api方法
import { resetPwd } from '../../api/admin'
// 导入全局状态管理
import { useLoginStore } from '../../store/admin.js'

let data = reactive({
    id: '',
    oldLoginPwd: '',
    newLoginPwd: '',
    newLoginPwd2: '',
})

// 提交表单数据
let editForm = async () => {
    // 获取当前登录账户的id信息
    data.id = useLoginStore().admin.id
    await resetPwd(data)
    clearFormData()
}

// 清空表单数据
let clearFormData = () => {
    data.oldLoginPwd = ''
    data.newLoginPwd = ''
    data.newLoginPwd2 = ''
}

</script>

<style lang="less" scoped>
.box {
    width: 300px;
}

.item {
    display: flex;
    margin-top: 10px;

    span {
        width: 100px;
    }
}
</style>