<template>
    <div class="search" style="display:flex;align-items: center;">

        <span style="margin-right:10px;">顾客姓名:</span>
        <el-input size="mini" v-model="data.guestName" style="width: 150px;margin-right: 10px;" />

        <span style="margin-right:10px;">结账状态:</span>
        <el-select v-model="data.resideStateId">
            <el-option 
                v-for="item in data.resideStateList" 
                :key="item.resideStateId" 
                :label="item.resideStateName"
                :value="item.resideStateId" />
        </el-select>

        <el-button plain type="success" @click="loadTable" style="margin-left:10px">
            查询
        </el-button>
        <el-button type="info" plain @click="toExcel">导出excel</el-button>
        <el-button plain type="primary" @click="data.drawer = true">
            添加
        </el-button>

    </div>

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
                <el-button plain type="warning" v-if="scope.row.resideState.resideStateId == 1"
                    @click="handleEdit(scope.row)">
                    编辑
                </el-button>
                <el-button plain type="danger" v-if="scope.row.resideState.resideStateId == 2 && 
                    useLoginStore().admin.role.roleId == 1"
                    @click="handleDelete(scope.row)">
                    删除
                </el-button>
                <el-button plain type="primary" v-if="scope.row.resideState.resideStateId == 1"
                    @click="handleCheckout(scope.row)">
                    结账
                </el-button>
            </template>
        </el-table-column>

    </el-table>

    <div class="pagination">
        <el-pagination background layout="prev, pager, next" :page-size="data.pageSize" :total="data.total"
            v-model:current-page="data.pageIndex" />
    </div>

    <el-drawer v-model="data.drawer" direction="rtl" :before-close="drawerClose" size='30%'>
        <template #header>
            <h4>{{ data.isAdd ? '添加顾客' : '修改顾客' }}</h4>
        </template>

        <div class="item">
            <span>姓名</span>
            <el-input v-model="data.formData.guestName" />
        </div>

        <div class="item">
            <span>手机号</span>
            <el-input v-model="data.formData.phone" />
        </div>

        <div class="item">
            <span>身份证</span>
            <el-input v-model="data.formData.identityId" />
        </div>

        <div class="item">
            <span style="width:80px">房间类型</span>
            <el-select v-model="data.formData.roomTypeId">
                <el-option 
                    v-for="item in data.roomTypeList" 
                    :key="item.roomTypeId" 
                    :label="item.roomTypeName"
                    :value="item.roomTypeId" />
            </el-select>
        </div>

        <div class="item">
            <span style="width:80px">房间</span>
            <el-select v-model="data.formData.roomId">
                <el-option 
                v-for="item in data.roomList" 
                :key="item.roomId" 
                :label="item.roomId" 
                :value="item.roomId" />
            </el-select>
        </div>

        <div class="item">
            <span style="width:80px">入住日期</span>
            <el-date-picker v-model="data.formData.resideDate" type="datetime" placeholder="请选择入住日期" />
        </div>

        <div class="item">
            <span>押金</span>
            <el-input v-model.number="data.formData.deposit" />
        </div>

        <div class="item">
            <span>入住人数</span>
            <el-input v-model.number="data.formData.guestNum" />
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
import { list, add, update, del, checkout } from '../../api/guest';
import { list as resideStateList } from '../../api/resideState'
import { list as roomTypeList } from '../../api/roomType'
import { list as roomList } from '../../api/room'
import { msg_e } from '../../utils/msg';
import { xlsx } from '../../utils/xlsx'
import { useLoginStore } from '../../store/admin.js'

let data = reactive({
    tableData: [],
    guestName: '',
    resideStateId: 0,
    pageIndex: 1,
    pageSize: 7,
    total: 0,
    resideStateList: [],
    roomTypeList: [],
    roomList: [],
    drawer: false,
    isAdd: true,
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

watch(() => data.formData.roomTypeId, (val) => {
    data.formData.roomId = '请选择房间'
    if (val > 0) {
        loadRoomList(val)
    } else {
        data.roomList = []
    }
})

let loadRoomList = async (roomTypeId) => {
    let { data: ret } = await roomList({ roomTypeId, roomStateId: 1, pageSize: 100 })
    ret.unshift({ roomId: '请选择房间' })
    data.roomList = ret
}

loadRoomList()

let loadRoomTypeList = async () => {
    let ret = await roomTypeList()
    ret.unshift({ roomTypeId: 0, roomTypeName: '全部' })
    data.roomTypeList = ret
}

loadRoomTypeList()

let loadResideStateList = async () => {
    let ret = await resideStateList();
    ret.unshift({ resideStateId: 0, resideStateName: '全部' })
    data.resideStateList = ret
}

loadResideStateList()

let loadTable = async () => {
    let params = {
        resideStateId: data.resideStateId,
        guestName: data.guestName,
        pageIndex: data.pageIndex,
        pageSize: data.pageSize,
    }

    let { data: guestData, count } = await list(params);
    guestData.sort(function(x,y) {
        return x.guestId - y.guestId
    })
    data.tableData = guestData;
    data.total = count;
}

loadTable()

watch(() => data.pageIndex, () => {
    loadTable()
})

let editForm = async () => {
    let r = false;
    if (data.isAdd) {
        r = await add(data.formData)
        if (r) {
            clearFormData()
        }
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

let drawerClose = () => {
    data.drawer = false;
    data.isAdd = true;
    clearFormData();
};

let handleEdit = (row) => {
    data.formData = { ...row }
    data.formData.id = row.roomId
    data.isAdd = false
    data.drawer = true
}

let handleDelete = async (row) => {
    let { guestId } = row;
    let r = await del({ guestId })
    if (r) {
        loadTable()
    }
}

let handleCheckout = async (row) => {
    let { guestId, resideDate } = row;
    if (new Date(resideDate) < Date.now()) {
        await checkout({ guestId })
        loadTable()
    } else {
        msg_e('未到结账时间')
    }
}

// 导出excel
let toExcel = ()=>{
    // 组织导出数据格式
    let excelData = data.tableData.map(r=>{
        return {
            guestId: r.guestId,
            identityId:r.identityId,
            guestName: r.guestName,
            phone: r.phone,
            roomTypeName: r.room.roomType.roomTypeName,
            roomId: r.roomId,
            resideDate: r.resideDate,
            leaveDate: r.leaveDate,
            deposit: r.deposit,
            totalMoney: r.totalMoney,
            resideStateName: r.resideState.resideStateName
        }
    })

    let excelHeader = {
        guestId: '顾客编号',
        identityId: '身份证',
        guestName: '姓名',
        phone: '电话',
        roomTypeName: '房间类型',
        roomId: '房间号',
        resideDate: '入住日期',
        leaveDate: '离开日期',
        deposit: '押金',
        totalMoney: '消费额',
        resideStateName: '结账状态'
    }

    xlsx(excelData,excelHeader,'订单信息')
}


</script>

<style lang="less" scoped>
.el-select {
    width: 120px;
}
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