<template>
    <div class="search">
        <el-button plain type="primary" @click="data.drawer = true">添加</el-button>
    </div>
  
    <el-table size="mini" :data="data.tableData" stripe style="width: 100%">
        <el-table-column prop="roleId" label="编号" width="180" />
        <el-table-column prop="roleName" label="角色" width="180" />

        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="warning" @click="handleEdit(scope.row)" plain>
                    编辑
                </el-button>
                <el-button type="danger" plain @click="handleDelete(scope.row)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-drawer v-model="data.drawer" direction="rtl" :before-close="drawerClose" size='30%' >

        <template #header>
            <h4>{{ data.isAdd ? '添加角色' : '修改角色' }}</h4>
        </template>

        <div class="item">
            <span>角色名称:</span>
            <el-input size="mini" v-model="data.formData.roleName" />
        </div>

        <div class="item">
            <el-button plain type="success" @click="editForm">确定</el-button>
            <el-button plain type="default" @click="clearFormData">取消</el-button>
        </div>
    </el-drawer>
    
</template>

<script setup>
import { reactive } from 'vue'
import { list, add, update, del } from '../../api/role.js'

let data = reactive({
    tableData: [],
    drawer: false,
    isAdd: true,
    formData: {
        roleName: ''
    }
});

let loadTable = async () => {
    let r = await list();
    data.tableData = r;
};

loadTable();

let editForm = async () => {
    let r = false;
    if (data.isAdd) {
        r = await add(data.formData)
    } else {
        r = await update(data.formData)
    }
    if (r) {
        loadTable()
        clearFormData()
        data.drawer = false
    }
}

let clearFormData = () => {
    data.formData = {
        roleName: ''
    }
}

let drawerClose = () => {
    data.drawer = false
    data.isAdd = true
    clearFormData()
}

let handleEdit = (row) => {
    data.formData = { ...row }
    data.isAdd = false
    data.drawer = true
}

let handleDelete = async (row) => {
    let { roleId } = row
    let r = await del({ roleId })
    if (r) {
        loadTable()
    }
}

</script>

<style lang="less" scoped>
.item {
    display: flex;
    margin-top: 10px;
    span {
        width: 100px;
    }
}
</style>