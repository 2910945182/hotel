<template>
    <div class="search">
        <span style="margin-right:10px">房间类型:</span>
        <el-select v-model="data.roomTypeId" class="m-2" style="margin-right:10px">
            <el-option 
                v-for="item in data.roomTypeList" 
                :key="item.roomTypeId" 
                :label="item.roomTypeName"
                :value="item.roomTypeId" />
        </el-select>
        <span style="margin-right:10px">房间状态:</span>
        <el-select v-model="data.roomStateId" class="m-2">
            <el-option 
                v-for="item in data.roomStateList" 
                :key="item.roomStateId" 
                :label="item.roomStateName"
                :value="item.roomStateId" />
        </el-select>
        <el-button size="mini" type="success" @click="loadTable" style="margin-left:10px">查询</el-button>
        <el-button size="mini" type="primary" @click="data.drawer=true">添加</el-button>
    </div>

    <el-table :data="data.tableData" stripe style="width: 100%">
        <el-table-column prop="roomId" label="房间号" width="180" />
        <el-table-column prop="roomType.roomTypeName" label="房间类型" />
        <el-table-column prop="roomType.roomTypePrice" label="房间价格" />
        <el-table-column prop="roomType.bedNum" label="床位数" />                   
        <el-table-column label="房间状态">
            <template #default="scope">
                <el-tag v-if="scope.row.roomState.roomStateId == 1" size="mini" type="success">{{scope.row.roomState.roomStateName }}</el-tag>
                <el-tag v-if="scope.row.roomState.roomStateId == 2" size="mini" type="success">{{scope.row.roomState.roomStateName }}</el-tag>
                <el-tag v-if="scope.row.roomState.roomStateId == 3" size="mini" type="success">{{scope.row.roomState.roomStateName }}</el-tag>
            </template>
        </el-table-column>
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

    <div class="pagination">
        <el-pagination background layout="prev, pager, next" :page-size="data.pageSize" :total="data.total"
            v-model:current-page="data.pageIndex" />
    </div>

    <el-drawer v-model="data.drawer" :title="data.isAdd ? '添加房间' : '修改房间'" direction="rtl" size='30%' :with-header="false">

        <div class="item">
            <span>房间编号:</span>
            <el-input size="mini" v-model="data.formData.roomId" />
        </div>

        <div class="item">
            <span>房间类型:</span>
            <el-select v-model="data.formData.roomTypeId" class="m-2">
                <el-option v-for="item in data.roomTypeList" 
                    :key="item.roomTypeId" 
                    :label="item.roomTypeName"
                    :value="item.roomTypeId" />
            </el-select>
        </div>

        <div class="item">
            <span>房间状态:</span>
            <el-select v-model="data.formData.roomStateId" class="m-2">
                <el-option v-for="item in roomStateList" :key="item.roomStateId" :label="item.roomStateName"
                    :value="item.roomStateId" />
            </el-select>
        </div>

        <div class="item">
            <span>房间描述:</span>
            <QuillEditor v-if="data.drawer" contentType="html" theme="snow" style="height:30px" />
        </div>

        <div class="item">
            <el-button size="mini" type="success" @click="editForm">{{ data.isAdd ? '添加' : '修改' }}</el-button>
            <el-button size="mini" type="default" @click="clearFormData">取消</el-button>
        </div>
    </el-drawer>
</template>

<script setup>
import { reactive,watch } from 'vue'
import { list } from '../../api/roomType.js'
import { list as roomTypeList } from '../../api/roomType.js'
import { list as roomStateList, listToUpdate as roomStateList2 } from '../../api/roomState'
import { list as roomList } from '../../api/room'

let data = reactive({
    tableData: [],
    roomTypeId: 0,
    roomStateId: 0,
    pageIndex: 1,
    total: '',
    roomTypeList: [],
    roomStateList: [],
    pageSize: 12,
    drawer: false,
    isAdd: true,
    formData: {
        roomId: '',
        description: '',
        roomStateId: 0,
        roomTypeId: 0,
    }
});

// 加载房间状态的方法(用于添加)
let loadRoomStateList2 = async () => {

}

// 加载房间状态(用于查询)
let loadRoomStateList = async () => {
    let ret = await roomStateList()
    ret.unshift({
        roomStateId: 0,
        roomStateName: '请选择房间状态'
    })
    data.roomStateList = ret
}

// 调用加载房间状态
loadRoomStateList()

// 加载房间类型
let loadRoomTypeList = async () => {
    let ret = await roomTypeList()
    ret.unshift({ roomTypeId: 0, roomTypeName: '请选择房间类型' })
    data.roomTypeList = ret
}

// 调用加载房间类型
loadRoomTypeList()

//加载表格数据
let loadTable = async () => {
    // 查询条件
    let params = {
        pageIndex: data.pageIndex,
        pageSize: data.pageSize,
        roomTypeId: data.roomTypeId,
        roomStateId: data.roomStateId,
    }
    let { data: roomData, count } = await roomList(params);
    // 表格数据
    data.tableData = roomData;
    // 总数量
    data.total = count
};

//执行加载表格数据的方法
loadTable();

// 监听当前页码是否发生变化
watch(() => data.pageIndex, () => {
    // 重新加载表格数据
    loadTable()
})

// 编辑表单
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

//执行修改的方法
let handleEdit = (row) => {
    data.formData = { ...row }
    data.isAdd = false
    data.openDrawer = true
}

//执行删除的方法
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