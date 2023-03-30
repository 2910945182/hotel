<template>
    <!-- 搜索区域 -->
    <div class="search">
        <el-button size="mini" type="primary" @click="data.drawer = true">添加</el-button>
    </div>
    
    <!-- 表格区域 -->
    <el-table size="mini" :data="data.tableData" style="width: 100%">
        <el-table-column prop="roleId" label="编号" width="180" />
        <el-table-column prop="roleName" label="角色" width="180" />

        <el-table-column label="操作">
            <template #default="scope">
                <el-button size="mini" type="success">
                    设置权限
                </el-button>
                <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">
                    编辑
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 抽屉区域 -->
    <el-drawer v-model="data.drawer" direction="rtl" size='30%' >

        <template #header>
            <h4>{{ data.isAdd ? '添加角色' : '修改角色' }}</h4>
        </template>

        <div class="item">
            <span>角色名称:</span>
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
//导入操作角色的API方法
import { list, add, update } from '../../api/role.js'

//定义数据
let data = reactive({
    //表格数据
    tableData: [],
    //是否打开抽屉
    drawer: false,
    // 是否添加操作
    isAdd: true,
    //表单数据
    formData: {
        roleName: ''
    }
});

//加载表格数据的方法
let loadTable = async () => {
    let r = await list();
    data.tableData = r;
};

//执行加载表格数据的方法
loadTable();

// 编辑表单方法
let editForm = async () => {
    let r = false;
    // 判断是执行添加还是修改
    if (data.isAdd) {
        r = await add(data.formData)
    } else {
        r = await update(data.formData)
    }
    // 如果执行成功
    if (r) {
        // 刷新表格信息
        loadTable()
    }
}

// 清空表单数据的方法
let clearFormData = () => {
    // 清空表单数据
    data.formData = {
        roleName: ''
    }
}
//关闭抽屉事件
let drawerClose = () => {
    //关闭抽屉
    data.openDrawer = false
    data.isAdd = true
    // 调用清空表单数据的方法
    clearFormData()
}

//执行修改的方法
let handleEdit = (row) => {
    // 获取当前角色信息，并赋值给表单数据
    data.formData = { ...row }
    // 设置为修改操作
    data.isAdd = false
    // 打开抽屉
    data.openDrawer = true
}

//执行删除的方法
let handleDelete = async (row) => {
    // 获取角色编号
    let { roleId } = row
    let r = await del({ roleId })
    // 如果删除成功
    if (r) {
        // 刷新表格信息
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