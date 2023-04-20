<template>
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
    
    <div class="pagination">
        <el-pagination 
            background layout="prev, pager, next" 
            :page-size="data.pageSize" 
            :total="data.total"
            v-model:current-page="data.pageIndex" />
    </div>

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
                    style="object-fit: cover"
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
import { list,add,update,del } from "../../api/admin";
import { list as roleList } from "../../api/role";
import { Plus } from "@element-plus/icons-vue";
import { admin_upload_url, admin_photo_base_url } from "../../config/conster";
import { msg_e } from "../../utils/msg";

let data = reactive({
    tableData: [],
    roleList: [],
    roleId: 0,
    pageIndex: 1,
    total: 2,
    pageSize: 7,
    drawer: false,
    isAdd: true,
    FormData: {
        photo: "",
        loginId: "",
        name: "",
        loginPwd: "",
        loginPwd2: "",
        phone: "",
        roleId: "",
    },
    admin_upload_url,
    admin_photo_base_url,
});

let loadRoleList = async () => {
    let r = await roleList();
    r.unshift({ roleId: 0, roleName: "全部" });
    data.roleList = r;
}

loadRoleList();

let loadTable = async () => {
    let params = {
        roleId: data.roleId,
        pageIndex: data.pageIndex,
        pageSize: data.pageSize,
    };
    let { count, data: adminData } = await list(params);
    data.total = count;
    data.tableData = adminData;
};

loadTable();

watch(
    () => data.pageIndex,
    () => {
        loadTable();
    }
);

let handleAvatarSuccess = (res) => {
    let { filename, success } = res;
    if (success) {
        data.FormData.photo = filename;
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

let editForm = async () => {
    let r = false;
    if (data.isAdd) {
        r = await add(data.FormData);
        if (r) {
            clearFormData();
        }
    } else {
        r = await update(data.FormData);
    }
    if (r) {
        loadTable();
        data.drawer = false
    }
};

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

let drawerClose = () => {
    data.drawer = false;
    data.isAdd = true;
    clearFormData();
};

let handleEdit = (row) => {
    console.log(row.photo)
    data.FormData = { ...row };
    data.isAdd = false;
    data.drawer = true;
};

let handleDelete = async (row) => {
    let { id,photo } = row;
    let r = await del({ id,photo });
    if (r) {
        loadTable();
    }
};

</script>

<style lang="less" scoped>
.el-select {
    width: 120px;
}
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