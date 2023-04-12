<template>
    <!-- 搜索区域 -->
    <div class="search" style="display:flex;align-items: center;">

        <span style="margin-right:10px;">顾客姓名:</span>
        <el-input size="mini" v-model="data.guestName" style="width: 200px;margin-right: 10px;" />

        <span style="margin-right:10px;">结账状态:</span>
        <el-select v-model="data.resideStateId">
            <el-option v-for="item in data.resideStateList" :key="item.resideStateId" :label="item.resideStateName"
                :value="item.resideStateId" />
        </el-select>

        <el-button plain type="success" @click="loadTable" style="margin-left:10px">
            查询
        </el-button>
        <el-button type="info" plain>导出excel</el-button>
        <el-button plain type="primary" @click="data.drawer = true">
            添加
        </el-button>

    </div>

    <!-- 表格区域 -->
    <el-table :data="data.tableData" stripe style="width: 100%">
        <el-table-column prop="guestId" label="编号" width="60" />
        <el-table-column prop="guestName" label="姓名" width="80" />
        <el-table-column prop="identityId" label="身份证" width="174" />
        <el-table-column prop="phone" label="电话" width="115" />
        <el-table-column prop="roomId" label="房间号" width="80" />
        <el-table-column prop="room.roomType.roomTypeName" label="房间类型" width="80" />
        <el-table-column prop="resideDate" label="入住日期" width="155" />
        <el-table-column prop="leaveDate" label="离开日期" width="155" />
        <el-table-column prop="deposit" label="押金" width="80" />
        <el-table-column prop="totalMoney" label="金额" width="80" />

        <el-table-column label="结账状态" width="80">
            <template #default="scope">
                <el-tag v-if="scope.row.resideState.resideStateId == 2" size="mini" type="success">
                    {{ scope.row.resideState.resideStateName }}
                </el-tag>
                <el-tag v-if="scope.row.resideState.resideStateId == 1" size="mini" type="warning">
                    {{ scope.row.resideState.resideStateName }}
                </el-tag>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="260">
            <template #default="scope">
                <el-button plain type="warning" @click="handleEdit(scope.row)">
                    编辑
                </el-button>
                <el-button plain type="danger" @click="handleDelete(scope.row)">
                    删除
                </el-button>
                <el-button plain type="primary" @click="checkout(scope.row)">
                    结账
                </el-button>
            </template>
        </el-table-column>

    </el-table>

    <!-- 分页 -->
    <div class="pagination">
        <el-pagination background layout="prev, pager, next" :page-size="data.pageSize" :total="data.total"
            v-model:current-page="data.pageIndex" />
    </div>

    <!-- 抽屉区域 -->
    <el-drawer v-model="data.drawer" direction="rtl" :before-close="drawerClose" size='30%'>
        <template #header>
            <h4>{{ data.isAdd ? '添加顾客' : '修改顾客' }}</h4>
        </template>

        <div class="item">
            <span>姓名</span>
            <el-input size="mini" v-model="data.formData.guestName" />
        </div>

        <div class="item">
            <span>手机号</span>
            <el-input size="mini" v-model="data.formData.phone" />
        </div>

        <div class="item">
            <span>身份证</span>
            <el-input size="mini" v-model="data.formData.identityId" />
        </div>

        <div class="item">
            <span style="width:80px">房间类型</span>
            <el-select v-model="data.formData.roomTypeId">
                <el-option v-for="item in data.roomTypeList" :key="item.roomTypeId" :label="item.roomTypeName"
                    :value="item.roomTypeId" />
            </el-select>
        </div>

        <div class="item">
            <span style="width:80px">房间</span>
            <el-select v-model="data.formData.roomId">
                <el-option v-for="item in data.roomList" :key="item.roomId" :label="item.roomId" :value="item.roomId" />
            </el-select>
        </div>

        <div class="item">
            <span style="width:80px">入住日期</span>

            <el-date-picker v-model="data.formData.resideDate" type="datetime" placeholder="请选择入住日期" />

        </div>

        <div class="item">
            <span>押金</span>
            <el-input size="mini" v-model.number="data.formData.deposit" />
        </div>

        <div class="item">
            <span>入住人数</span>
            <el-input size="mini" v-model.number="data.formData.guestNum" />
        </div>

        <div class="item">
            <el-button plain type="success" @click="editForm">
                确定
            </el-button>
            <el-button plain type="default" @click="clearFormData">
                取消
            </el-button>
        </div>

    </el-drawer>
</template>

<script setup>
import { reactive, watch } from 'vue';
// 导入操作顾客信息的api
import { list, add, update, del, Checkout } from '../../api/guest';

// 导入操作结账状态信息的api
import { list as resideStateList } from '../../api/resideState'

// 导入操作房间类型的api
import { list as roomTypeList } from '../../api/roomType'

// 导入操作房间的api
import { list as roomList } from '../../api/room'

let data = reactive({
    // 表格数据
    tableData: [],
    // 顾客姓名（查询条件）
    guestName: '',
    // 结账查询（查询条件）
    resideStateId: 0,
    // 页码
    pageIndex: 1,
    // 每页数量
    pageSize: 7,
    //总数量
    total: 0,
    // 结账状态数组
    resideStateList: [],
    // 房间类型数组(用于添加)
    roomTypeList: [],
    // 房间数组(用于添加)
    roomList: [],
    // 是否打开抽屉
    drawer: false,
    // 是否是添加操作
    isAdd: true,
    // 表单数据
    formData: {
        identityId: '',
        guestName: '',
        phone: '',
        roomTypeId: 0,
        roomId: '',
        resideDate: '',
        deposit: '',
        guestNum: '',
    }
})


// 监听roomTypeId的值有没有发生变化
watch(() => data.formData.roomTypeId, (val) => {
    // 清空表单上的房间号
    data.formData.roomId = '请选择房间'
    if (val > 0) {
        // 调用加载房间的方法
        loadRoomList(val)
    } else {
        data.roomList = []
    }
})

// 加载房间的方法
let loadRoomList = async (roomTypeId) => {
    let { data: ret } = await roomList({ roomTypeId, roomStateId: 1, pageSize: 100 })
    ret.unshift({ roomId: '请选择房间' })
    data.roomList = ret
}

loadRoomList()

// 加载房间类型的方法
let loadRoomTypeList = async () => {
    let ret = await roomTypeList()
    ret.unshift({ roomTypeId: 0, roomTypeName: '全部' })
    data.roomTypeList = ret
}

// 调用加载房间类型的方法
loadRoomTypeList()

// 加载结账状态的方法
let loadResideStateList = async () => {
    let ret = await resideStateList();
    ret.unshift({ resideStateId: 0, resideStateName: '全部' })
    data.resideStateList = ret
}

loadResideStateList()

// 加载表格数据
let loadTable = async () => {
    // 查询条件
    let params = {
        pageIndex: data.pageIndex,
        pageSize: data.pageSize,
        guestName: data.guestName,
        resideStated: data.resideStateId,
    }

    let { data: guestData, count } = await list(params);
    data.tableData = guestData;
    data.total = count;
}

// 执行加载表格数据的方法
loadTable()

// 监听当前页码是否发生变化(分页)
watch(() => data.pageIndex, () => {
    // 重新加载表格数据
    loadTable()
})

// 编辑表单的方法
let editForm = async () => {
    let r = false;
    // 判断是执行添加还是修改
    if (data.isAdd) {
        r = await add(data.formData)
        if (r) {
            // 添加成功后，调用清空表单数据的方法
            clearFormData()
        }
    } else {
        r = await update(data.formData)
    }
    // 如果执行成功
    if (r) {
        // 刷新表格信息
        loadTable()
        //关闭抽屉
        drawerClose()
    }
}

// 清空表单数据
let clearFormData = () => {
    data.formData = {
        identityId: '',
        guestName: '',
        phone: '',
        roomTypeId: 0,
        roomId: '',
        resideDate: '',
        deposit: '',
        guestNum: '',
    };
};

//关闭抽屉事件
let drawerClose = () => {
    //关闭抽屉
    data.drawer = false;
    data.isAdd = true;
    clearFormData();
};

//执行修改的方法
let handleEdit = (row) => {
    // 获取当前客房信息，并赋值给表单数据
    data.formData = { ...row }
    // 在表单数据中添加id属性,备份房间号
    data.formData.id = row.roomId
    // 设置为修改操作
    data.isAdd = false
    // 打开抽屉
    data.drawer = true
}

//执行删除的方法
let handleDelete = async (row) => {
    // 获取顾客编号
    let { guestId } = row;
    let r = await del({ guestId })
    // 如果删除成功
    if (r) {
        // 刷新表格信息
        loadTable()
    }
}

// 顾客结账
let checkout = async (row) => {
    // 获取顾客编号
    let { guestId } = row;
    let r = await Checkout({ guestId })
    console.log(r)
}

</script>

<style lang="less" scoped>
.pagination {
    position: absolute;
    bottom: 30px;
}

.item {
    display: flex;
    margin-top: 10px;

    span {
        width: 100px;
    }
}
</style>