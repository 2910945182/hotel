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

        <el-button plain type="success" @click="loadTable" style="margin-left:10px">
            查询
        </el-button>
        <el-button plain type="info" @click="toExcel">
            导出excel
        </el-button>
        <el-button plain type="primary" @click="data.drawer = true">
            添加
        </el-button>

    </div>

    <el-table :data="data.tableData" stripe style="width: 100%">
        <el-table-column prop="roomId" label="房间号" width="160" />
        <el-table-column prop="roomType.roomTypeName" label="类型" width="160" />
        <el-table-column prop="roomType.roomTypePrice" label="价格" width="160" />
        <el-table-column prop="roomType.bedNum" label="床位数" width="160" />
        <el-table-column label="状态" width="160">
            <template #default="scope">
                <el-tag v-if="scope.row.roomState.roomStateId == 1" size="mini" type="success">
                    {{scope.row.roomState.roomStateName }}
                </el-tag>
                <el-tag v-if="scope.row.roomState.roomStateId == 2" size="mini" type="warning">
                    {{scope.row.roomState.roomStateName }}
                </el-tag>
                <el-tag v-if="scope.row.roomState.roomStateId == 3" size="mini" type="danger">
                    {{scope.row.roomState.roomStateName }}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
            <template #default="scope">
                <el-button plain type="primary" @click="openDialog(scope.row)">
                    照片
                </el-button>
                <el-button plain type="warning" @click="handleEdit(scope.row)">
                    编辑
                </el-button>
                <el-button plain type="danger" @click="handleDelete(scope.row)">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>

    <div class="pagination">
        <el-pagination background 
            layout="prev, pager, next" 
            :page-size="data.pageSize" 
            :total="data.total"
            v-model:current-page="data.pageIndex" />
    </div>

    <el-drawer v-model="data.drawer" direction="rtl" :before-close="drawerClose" size='30%'>
        <template #header>
            <h4>{{ data.isAdd ? '添加房间' : '修改房间' }}</h4>
        </template>

        <div class="item">
            <span>房间号:</span>
            <el-input v-model="data.formData.roomId" />
        </div>
        <div class="item">
            <span style="width:80px">类型:</span>
            <el-select v-model="data.formData.roomTypeId" class="m-2">
                <el-option 
                    v-for="item in data.roomTypeList" 
                    :key="item.roomTypeId" 
                    :label="item.roomTypeName"
                    :value="item.roomTypeId" />
            </el-select>
        </div>
        <div class="item">
            <span style="width:80px">状态:</span>
            <el-select v-model="data.formData.roomStateId" class="m-2">
                <el-option 
                    v-for="item in data.roomStateList2" 
                    :key="item.roomStateId" 
                    :label="item.roomStateName"
                    :value="item.roomStateId" />
            </el-select>
        </div>
        <div class="item">
            <span>房间描述:</span>
            <el-input type="text" v-model="data.formData.description">
            </el-input>
        </div>
        <div class="item">
            <el-button plain type="success" @click="editForm">确定</el-button>
            <el-button plain type="default" @click="clearFormData">取消</el-button>
        </div>
    </el-drawer>

    <el-dialog v-model="data.dialogVisible" title="房间照片" width="30%">
        <el-upload 
            :action="data.room_upload_url"       
            list-type="picture-card" 
            :file-list="data.imgList"
            limit="4" 
            :on-preview="handlePictureCardPreview" 
            :on-remove="handleRemove" 
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">  

            <el-icon>
                <Plus />
            </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible2" style="width:50%">
            <img style="width:100%" :src="data.dialogImageUrl" alt="Preview Image" />
        </el-dialog>

    </el-dialog>
</template>

<script setup>
import { Plus } from '@element-plus/icons-vue'
import { reactive, watch } from 'vue'
import { list as roomTypeList } from '../../api/roomType.js'
import { list as roomStateList, listToUpdate as roomStateList2 } from '../../api/roomState'
import { list as roomList } from '../../api/room'
import { add, update, del } from '../../api/room'
import { room_upload_url, room_photo_base_url } from '../../config/conster'
import { add as addRoomImg, list as roomImgList, del as delRoomImg } from '../../api/roomImg'
import { xlsx } from '../../utils/xlsx'
 
let data = reactive({
    tableData: [],
    roomTypeId: 0,
    roomStateId: 0,
    pageIndex: 1,
    total: '',
    roomTypeList: [],
    roomStateList: [],
    roomStateList2: [],
    pageSize: 12,
    drawer: false,
    isAdd: true,
    formData: {
        roomId: '',
        roomTypeId: 0,
        roomStateId: 0,
        description: '',
    },
    dialogVisible: false,
    room_upload_url,
    room_photo_base_url,
    imgList: [],
    dialogVisible2: false,
    dialogImageUrl: ''
});

let loadRoomStateList2 = async () => {
    let ret = await roomStateList2()
    ret.unshift({
        roomStateId: 0,
        roomStateName: '全部'
    })
    data.roomStateList2 = ret
}

loadRoomStateList2()

let loadRoomStateList = async () => {
    let ret = await roomStateList()
    ret.unshift({
        roomStateId: 0,
        roomStateName: '全部'
    })
    data.roomStateList = ret
}

loadRoomStateList()

let loadRoomTypeList = async () => {
    let ret = await roomTypeList()
    ret.unshift({ roomTypeId: 0, roomTypeName: '全部' })
    data.roomTypeList = ret
}

loadRoomTypeList()

let loadTable = async () => {
    let params = {
        pageIndex: data.pageIndex,
        pageSize: data.pageSize,
        roomTypeId: data.roomTypeId,
        roomStateId: data.roomStateId,
    }
    let { data: roomData, count } = await roomList(params);
    roomData.sort(function (x, y) {
        return x.roomId - y.roomId
    })
    data.tableData = roomData;
    data.total = count
};

loadTable();

watch(() => data.pageIndex, () => {
    loadTable()
})

let editForm = async () => {
    let r = false;
    if (data.isAdd) {
        r = await add(data.formData)
    } else {
        r = await update(data.formData)
    }
    if (r) {
        clearFormData()
        loadTable()
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
    data.formData.id = row.roomId
    data.isAdd = false
    data.drawer = true
}

let handleDelete = async (row) => {
    let { roomId } = row;
    console.log(roomId);
    let r = await del({ roomId })
    if (r) {
        loadTable()
    }
}

let currentRoomId = ''

let openDialog = async (row) => {
    let { roomId } = row;
    currentRoomId = roomId;
    data.dialogVisible = true;
    let ret = await roomImgList({ roomId })
    let imgList = ret.map(r => {
        return {
            roomImgId: r.roomImgId,
            name: r.imgUrl,
            url: data.room_photo_base_url + r.imgUrl,
        }
    })
    data.imgList = imgList;
}

let handleAvatarSuccess = async (res) => {
    let { filename, success } = res;
    if (success) {
        data.formData.photo = filename;
        let params = {
            roomId: currentRoomId,
            imgUrl: filename,
        }
        await addRoomImg(params)
    }
};

let beforeAvatarUpload = (file) => {
    let imgTypes = ["image/jpeg", "image/png", "image/gif"];
    const isJPG = imgTypes.includes(file.type);
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
        msg_e("请选择正确的图片格式");
    }

    if (!isLt2M) {
        msg_e("图片大小不能超过2M");
    }

    return isJPG && isLt2M;
};

let handleRemove = async (file) => {
    let { roomImgId, name } = file
    let r = await delRoomImg({ roomImgId, filename: name })
}

let handlePictureCardPreview = (file) => {
    data.dialogImageUrl = file.url
    data.dialogVisible2 = true
}

watch(() => data.dialogVisible, (val) => {
    if (!val) {
        data.imgList = []
    }
})

let toExcel = () => {
    let excelData = data.tableData.map(r => {
        return {
            roomId: r.roomId,
            roomTypeName: r.roomType.roomTypeName,
            roomTypePrice: r.roomType.roomTypePrice,
            bedNum: r.roomType.bedNum,
            roomStateName: r.roomState.roomStateName,
        }
    })

    let excelHeader = {
        roomId: '房间号',
        roomTypeName: '房间类型',
        roomTypePrice: '房间价格',
        bedNum: '床位数',
        roomStateName: '房间状态',
    }
    xlsx(excelData, excelHeader, '房间信息')
}

</script>

<style lang="less" scoped>
.el-select {
    width: 120px;
}

.item {
    display: flex;
    margin-top: 10px;

    span {
        width: 100px;
    }
}

.pagination {
    position: absolute;
    bottom: 30px;
}
</style>