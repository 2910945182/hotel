<template>
    <!-- 搜索区域 -->
    <div class="search">
        <span style="margin-right:10px">房间类型:</span>
        <el-select v-model="data.roomTypeId" class="m-2" style="margin-right:10px">
            <el-option v-for="item in data.roomTypeList" :key="item.roomTypeId" :label="item.roomTypeName"
                :value="item.roomTypeId" />
        </el-select>
        <span style="margin-right:10px">房间状态:</span>
        <el-select v-model="data.roomStateId" class="m-2">
            <el-option v-for="item in data.roomStateList" :key="item.roomStateId" :label="item.roomStateName"
                :value="item.roomStateId" />
        </el-select>
        <el-button size="mini" type="success" @click="loadTable" style="margin-left:10px">查询</el-button>
        <el-button type="info">导出excel</el-button>
        <el-button size="mini" type="primary" @click="data.drawer = true">添加</el-button>
    </div>

    <!-- 表格区域 -->
    <el-table :data="data.tableData" stripe style="width: 100%">
        <el-table-column prop="roomId" label="房间号" width="160" />
        <el-table-column prop="roomType.roomTypeName" label="类型" width="160"/>
        <el-table-column prop="roomType.roomTypePrice" label="价格" width="160"/>
        <el-table-column prop="roomType.bedNum" label="床位数" width="160"/>
        <el-table-column label="状态" width="160">
            <template #default="scope">
                <el-tag v-if="scope.row.roomState.roomStateId == 1" size="mini" type="success">{{
                    scope.row.roomState.roomStateName }}</el-tag>
                <el-tag v-if="scope.row.roomState.roomStateId == 2" size="mini" type="warning">{{
                    scope.row.roomState.roomStateName }}</el-tag>
                <el-tag v-if="scope.row.roomState.roomStateId == 3" size="mini" type="danger">{{
                    scope.row.roomState.roomStateName }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
            <template #default="scope">
                <el-button size="mini" type="primary" @click="openDialog(scope.row)">
                    照片
                </el-button>
                <el-button size="mini" type="warning" @click="handleEdit(scope.row)">
                    编辑
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
                    删除
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
    <el-drawer v-model="data.drawer" direction="rtl" size='30%'>
        <template #header>
            <h4>{{ data.isAdd ? '添加房间' : '修改房间' }}</h4>
        </template>

        <div class="item">
            <span>房间号:</span>
            <el-input size="mini" v-model="data.formData.roomId" />
        </div>
        <div class="item">
            <span>类型:</span>
            <el-select v-model="data.formData.roomTypeId" class="m-2">
                <el-option v-for="item in data.roomTypeList" :key="item.roomTypeId" :label="item.roomTypeName"
                    :value="item.roomTypeId" />
            </el-select>
        </div>
        <div class="item">
            <span>状态:</span>
            <el-select v-model="data.formData.roomStateId" class="m-2">
                <el-option v-for="item in data.roomStateList" :key="item.roomStateId" :label="item.roomStateName"
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

    <!-- 弹出层 -->
    <el-dialog v-model="data.dialogVisible" title="房间照片" width="30%">
        <el-upload v-model:file-list="fileList" 
            :action="room_upload_url"
            list-type="picture-card" 
            :file-list="imgList"
            :limit="4"
            :on-preview="handlePictureCardPreview" 
            :on-remove="handleRemove"
            :on-success="handleAvatarUpload"
            :before-upload="beforeAvatarUpload">

            <el-icon>
                <Plus />
            </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible2" style="width:50%">
            <img style="width:100%" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>

    </el-dialog>
</template>

<script setup>
// 导入图标
import { Plus } from '@element-plus/icons-vue'
import { reactive, watch } from 'vue'

// 导入操作房间类型的api方法
import { list as roomTypeList } from '../../api/roomType.js'
import { list as roomStateList, listToUpdate as roomStateList2 } from '../../api/roomState'

// 导入房间信息列表
import { list as roomList } from '../../api/room'

// 删除房间信息
import { del } from '../../api/room'

// 导入上传和查看房间照片地址
import { room_upload_url,room_photo_base_url} from '../../config/conster'

// 导入操作房间图片的api方法
import { add as addRoomImg,list as roomImgList,del as delRoomImg } from '../../api/roomImg'

// 导入excle方法
// import { xlsx } from '../../utils/xlsx'

//定义数据 
let data = reactive({
    //表格数据
    tableData: [],
    // 房间类型编号（用于搜索）
    roomTypeId: 0,
    // 房间状态编号（用于搜索）
    roomStateId: 0,
    // 当前页码
    pageIndex: 1,
    // 总数量
    total: '',
    // 房间类型数组
    roomTypeList: [],
    // 房间状态数组
    roomStateList: [],
    // 每页数量
    pageSize: 12,
    //是否打开抽屉
    drawer: false,
    // 是否添加操作
    isAdd: true,
    //表单数据
    formData: {
        roomId: '',
        description: '',
        roomStateId: 0,
        roomTypeId: 0,
    },
    // 是否显示弹出层
    dialogVisible: false,
    // 上传房间照片的地址
    room_upload_url,
    // 查看房间照片的地址
    room_photo_base_url,
    // 指定房间的图片列表
    imgList: [],
    // 是否显示大图弹出层
    dialogVisible2: false,
    // 大图地址
    dialogImageUrl: ''
});

// 加载房间状态的方法(用于添加)
let loadRoomStateList2 = async () => {

}

// 加载房间状态的方法(用于查询)
let loadRoomStateList = async () => {
    let ret = await roomStateList()
    ret.unshift({
        roomStateId: 0,
        roomStateName: '全部'
    })
    data.roomStateList = ret
}

// 调用加载房间状态的方法
loadRoomStateList()

// 加载房间类型的方法
let loadRoomTypeList = async () => {
    let ret = await roomTypeList()
    ret.unshift({ roomTypeId: 0, roomTypeName: '全部' })
    data.roomTypeList = ret
}

// 调用加载房间类型的方法
loadRoomTypeList()

//加载表格数据的方法
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
    // 获取当前客房信息，并赋值给表单数据
    data.formData = { ...row }
    // 在表单数据中添加id属性,备份房间号
    data.formData.id = row.roomId
    // 设置为修改操作
    data.isAdd = false
    // 打开抽屉
    data.openDrawer = true
}

//执行删除的方法
let handleDelete = async (row) => {
    // 获取角色编号
    let { roomId } = row;
    console.log(roomId);
    let r = await del({ roomId })
    // 如果删除成功
    if (r) {
        // 刷新表格信息
        loadTable()
    }
}

// 定义当前房间编号
let currentRoomId = ''

// 打开房间图片对话框
let openDialog = async(row)=>{
    // 获取房间号
    let { roomId } = row;
    currentRoomId = roomId;
    // 显示对话框
    data.dialogVisible = true;
    // 根据房间号查询该房间对应的所有图片
    let ret = await roomImgList({roomId})
    // 转成指定格式的数组
    let imgList = ret.map(r=>{
        return {
            roomImgId: r.roomImgId,
            name: r.imgUrl,
            url: room_photo_base_url + r.imgUrl,
        }
    })
    data.imgList = imgList;
}

// 上传成功调用的函数
let hanforeAvatarSuccess = async(res) => {
    let { filename, success } = res;
    if (success) {
        // 获取上传到服务器上的图片的名称
        // data.formData.photo = filename;
        let params = {
            // 房间号
            roomId: currentRoomId,
            // 房间图片地址
            imgUrl: filename,
        }
        // 执行添加图片
        await addRoomImg(params)
    }
};

// 上传之前调用的函数
let beforeAvatarUpload = (file) => {
    // 定义图片格式
    let imgTypes = ["image/jpeg", "image/png", "image/gif"];
    // 上传的文件必须是指定的图片的格式
    const isJPG = imgTypes.includes(file.type);
    // 上传图片的大小必须小于2M
    const isLt2M = file.size / 1024 / 1024 < 2;

    // 判断是不是图片格式
    if (!isJPG) {
        msg_e("请选择正确的图片格式");
    }

    // 判断文件大小是不是小于2M
    if (!isLt2M) {
        msg_e("图片大小不能超过2M");
    }

    return isJPG && isLt2M;
};

// 删除房间图片
let handleRemove = async(flie,fileList)=>{
    // 获取图片id
    let { roomImgId,name } = file
    // 删除指定的房间图片
    let  r = await delRoomImg({roomImgId,filename:name})
}

// 预览大图
let handlePictureCardPreview = (file) => {
    // 设置大图地址
    data.dialogImageUrl = file.url
    // 显示大图对话框
    data.dialogVisible2 = true
}

// 监听dialogVisible
watch(()=>data.dialogVisible,(val)=>{
    // 监听到关闭了对话框
    if(!val) {
        // 清空图片数组
        data.imgList = []
    }
})

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