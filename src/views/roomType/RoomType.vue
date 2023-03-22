<template>
    <div class="search">
        <el-button size="mini" type="primary" @click="data.drawer = true">添加</el-button>
    </div>

    <el-table size="mini" :data="tableData" style="width: 100%">
        <el-table-colum pro="roomTypeId" Label="类型编号" width="100" />
        <el-table-colum pro="roomTypeName" Label="类型名称" width="100" />
        <el-table-colum pro="roomTypePrice" Label="类型价格" width="100" />
        <el-table-colum pro="bedNum" Label="床位数" width="100" />

        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">
                    编辑
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-drawer v-model="data.drawer" :title="data.isAdd ? '添加角色' : '修改角色'" direction="rtl" size='30%' :before-close="drawerClose">

        <div class="item">
            <span>房型名称:</span>
            <el-input size="mini" v-model="data.formData.roleName" />
        </div>

        <div class="item">
            <span>房型价格:</span>
            <el-input size="mini" v-model="data.formData.roleName" />
        </div>

        <div class="item">
            <span>床位数量:</span>
            <el-input size="mini" v-model="data.formData.roleName" />
        </div>

        <div class="item">
            <span>房型描述:</span>
            <el-input size="mini" v-model="data.formData.roleName" />
        </div>

        <div class="item">
            <el-button size="mini" type="success" @click="editForm">{{ data.isAdd ? '添加' : '修改' }}</el-button>
            <el-button size="mini" type="default" @click="clearFormData">取消</el-button>
        </div>
    </el-drawer>
</template>

<script setup>
import { reactive } from 'vue'
import { list } from '../../api/roomType.js'

let data = reactive({
    tableData: [],
    drawer: false,
    isAdd: true,
    formData: {
        roleName: ''
    }
});

//加载表格数据
let loadTable = async() => {
    let r = await list();
    data.tableData = r;
}

loadTable();

// 编辑表单方法
let editForm = async () => {
    let r = false;
    if (data.isAdd) {
        r = await add(data.formData)
    } else {
        r = await update(data.formData)
    }
    if (r) {
        loadTable()
    }
}

// 清空表单数据
let clearFormData = () => {
    data.formData = {
        roleName: ''
    }
}

//关闭抽屉事件
let drawerClose = () => {
    data.openDrawer = false
    data.isAdd = true
    clearFormData()
}

//执行修改
let handleEdit = (row) => {
    data.formData = { ...row }
    data.isAdd = false
    data.openDrawer = true
}

//执行删除
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