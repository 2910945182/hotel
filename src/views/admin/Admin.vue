<template>
    <!-- 搜索区域 -->
    <div class="search">
        <span style="margin-right:10px">角色:</span>

        <el-select v-model="data.roleId" class="m-2">
            <el-option 
                v-for="item in data.roleList" 
                :key="item.roleId" 
                :label="item.roleName" 
                :value="item.roleId"/>
        </el-select>

        <el-button plain type="success" @click="loadTable" style="margin-left: 10px">查询</el-button>
        <el-button plain type="primary" @click="data.drawer = true;">添加</el-button>
    </div>

    <!-- 表格区域 -->
    <el-table size="mini" :data="data.tableData" stripe style="width: 100%; margin-top: 10px">
        <el-table-column prop="id" label="编号" width="100" />
        <el-table-column prop="loginId" label="账号" width="100" />
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="phone" label="电话" width="120" />

        <el-table-column label="头像" width="100">
            <template #default="scope">
                <el-image 
                    style="width: 50px; height: 50px;" 
                    :src="data.admin_photo_base_url + scope.row.photo" 
                    fit="cover" />
            </template>
        </el-table-column>

        <el-table-column prop="role.roleName" label="角色" width="100" />
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
    
    <!-- 分页 -->
    <div class="pagination">
        <el-pagination 
            background layout="prev, pager, next" 
            :page-size="data.pageSize" 
            :total="data.total"
            v-model:current-page="data.pageIndex" />
    </div>

    <!-- 抽屉区域 -->
    <el-drawer v-model="data.drawer" :before-close="drawerClose" direction="rtl" size="30%">
        
        <template #header>
            <h4>{{ data.isAdd ? '添加账户' : '修改账户' }}</h4>
        </template>

        <div class="item">
            <el-upload class="avatar-uploader" 
                :action="data.admin_upload_url" 
                :show-file-list="false"
                :on-success="handleAvatarSuccess" 
                :before-upload="beforeAvatarUpload">

                <img 
                    v-if="data.FormData.photo" 
                    :src="data.admin_photo_base_url + data.FormData.photo" 
                    class="avatar" />

                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>

            </el-upload>
        </div>

        <div class="item" v-if="data.isAdd">
            <span>账号:</span>
            <el-input v-model="data.FormData.loginId" />
        </div>

        <div class="item">
            <span>姓名:</span>
            <el-input v-model="data.FormData.name" />
        </div>

        <div class="item" v-if="data.isAdd">
            <span>密码:</span>
            <el-input type="password" v-model="data.FormData.loginPwd" />
        </div>

        <div class="item" v-if="data.isAdd">
            <span>确认密码:</span>
            <el-input type="password" v-model="data.FormData.loginPwd2" />
        </div>

        <div class="item">
            <span>电话:</span>
            <el-input v-model="data.FormData.phone" />
        </div>

        <div class="item">
            <span style="width: 80px">角色:</span>
            <el-select v-model="data.FormData.roleId" class="m-2">
                <el-option 
                    v-for="item in data.roleList" 
                    :key="item.roleId" 
                    :label="item.roleName" 
                    :value="item.roleId" />
            </el-select>
        </div>

        <div class="item">
            <el-button size="mini" type="success" @click="editForm">
                确定
            </el-button>
            <el-button plain type="default" @click="clearFormData">取消</el-button>
        </div>
    </el-drawer>

</template>

<script setup>
import { reactive,watch } from "vue";
// 导入管理员的api
import { list,add,update,del } from "../../api/admin";
// 导入角色的api
import { list as roleList } from "../../api/role";
// 导入图标
import { Plus } from "@element-plus/icons-vue";
// 导入上传头像地址和查看头像地址
import { admin_upload_url, admin_photo_base_url } from "../../config/conster";
// 导入弹框
import { msg_e } from "../../utils/msg";

// 定义数据
let data = reactive({
    // 表格数据
    tableData: [],
    // 角色数组
    roleList: [],
    // 角色编号(用于搜索)
    roleId: 0,
    // 当前页码
    pageIndex: 1,
    // 总数量
    total: 2,
    // 每页数量
    pageSize: 7,
    // 是否打开抽屉
    drawer: false,
    // 是否是添加操作
    isAdd: true,
    // 表单数据
    FormData: {
        photo: "",
        loginId: "",
        name: "",
        loginPwd: "",
        loginPwd2: "",
        phone: "",
        roleId: "",
    },
    // 上传账户的地址
    admin_upload_url,
    // 查看账户头像地址
    admin_photo_base_url,
    // 上传成功后显示的图片地址
    // imageUrl: "",
});

// 加载角色数组信息
let loadRoleList = async () => {
    // 返回所有角色信息
    let r = await roleList();
    // console.log(r)
    // 在角色信息数组开头处添加一条信息
    r.unshift({ roleId: 0, roleName: "全部" });
    data.roleList = r;
}

// 调用加载角色数组的方法
loadRoleList();

// 加载表格数据的方法
let loadTable = async () => {
    // 查询条件
    let params = {
        roleId: data.roleId,
        pageIndex: data.pageIndex,
        pageSize: data.pageSize,
    };
    // 获取查询结果
    let { count, data: adminData } = await list(params);
    data.total = count;
    data.tableData = adminData;
};

// 执行加载数据的方法
loadTable();

// 监听当前页码是否发生变化
watch(
    () => data.pageIndex,
    () => {
        // 重新加载表格数据
        loadTable();
    }
);

// 头像上传成功调用的函数
let handleAvatarSuccess = (res) => {
    let { filename, success } = res;
    if (success) {
        // 获取上传到服务器上的图片的名称
        data.FormData.photo = filename;
    }
};

// 头像上传之前调用的函数
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

// 编辑表单方法
let editForm = async () => {
    let r = false;
    // 判断是执行添加还是修改
    if (data.isAdd) {
        r = await add(data.FormData);
        // 添加成功后清空表单
        if (r) {
            clearFormData();
        }
    } else {
        r = await update(data.FormData);
    }
    // 如果执行成功
    if (r) {
        // 刷新表格信息
        loadTable();
        //关闭抽屉
        data.drawer = false
    }
};

// 清空表单数据
let clearFormData = () => {
    data.FormData = {
        loginId: "",
        loginPwd: "",
        loginPwd2: "",
        name: "",
        phone: "",
        roleId: 0,
        photo: "",
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
    // 获取当前账户信息，并赋值给表单数据
    console.log(row.photo)
    data.FormData = { ...row };
    // 设置为修改操作
    data.isAdd = false;
    // 打开抽屉
    data.drawer = true;
};

//执行删除的方法
let handleDelete = async (row) => {
    // 获取角色编号
    let { id,photo } = row;
    console.log(id)
    console.log(photo)
    let r = await del({ id,photo });
    console.log(r)
    // 如果删除成功
    if (r) {
        // 刷新表格信息
        loadTable();
    }
};

</script>

<style lang="less" scoped>
.pagination {
    margin-top: 10px;
    position: absolute;
    bottom: 30px;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.item {
    display: flex;
    margin-top: 10px;

    span {
        width: 100px;
    }
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
