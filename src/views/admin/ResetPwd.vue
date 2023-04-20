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
import { reactive } from 'vue';
import { resetPwd } from '../../api/admin'
import { useLoginStore } from '../../store/admin.js'

let data = reactive({
    id: '',
    oldLoginPwd: '',
    newLoginPwd: '',
    newLoginPwd2: '',
})

let editForm = async () => {
    data.id = useLoginStore().admin.id
    await resetPwd(data)
    clearFormData()
}

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