<template>
    <div class="search">
        <el-button plain type="primary" @click="data.drawer = true">添加</el-button>
    </div>

    <el-table :data="data.tableData" stripe style="width: 100%">
        <el-table-column prop="roomTypeId" label="编号" width="100" />
        <el-table-column prop="roomTypeName" label="类型" width="100" />
        <el-table-column prop="roomTypePrice" label="价格" width="100" />
        <el-table-column prop="bedNum" label="床位数" width="100" />

        <el-table-column label="操作">
            <template #default="scope">
                <el-button plain type="warning" @click="handleEdit(scope.row)">
                    编辑
                </el-button>
                <el-button plain type="danger" @click="handleDelete(scope.row)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-drawer v-model="data.drawer" :before-close="drawerClose" size='30%'>

        <template #header>
            <h4>{{ data.isAdd ? '添加房间' : '修改房间' }}</h4>
        </template>

        <div class="item">
            <span>房型名称:</span>
            <el-input v-model="data.formData.roomTypeName" />
        </div>

        <div class="item">
            <span>床位价格:</span>
            <el-input v-model="data.formData.roomTypePrice" />
        </div>

        <div class="item">
            <span>床位数:</span>
            <el-input v-model="data.formData.bedNum" />
        </div>

        <div class="item">
            <span>房型描述:</span>
            <el-input v-model="data.formData.typeDescription" />
        </div>

        <div class="item">
            <el-button plain type="success" @click="editForm">确定</el-button>
            <el-button plain type="default" @click="clearFormData">取消</el-button>
        </div>

    </el-drawer>
</template>

<script setup>
import { reactive } from 'vue'
import { list, add, update, del } from '../../api/roomType.js'

let data = reactive({
    tableData: [],
    drawer: false,
    isAdd: true,
    formData: {
        roomTypeName: '',
        roomTypePrice: '',
        bedNum: '',
        typeDescription: '',
    }
});

let loadTable = async () => {
    let r = await list();
    data.tableData = r;
}

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
        drawerClose()
    }
}

let clearFormData = () => {
    data.formData = {
        roomTypeName: '',
        roomTypePrice: '',
        bedNum: '',
        typeDesciption: '',
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
    let { roomTypeId } = row
    let r = await del({ roomTypeId })
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