<template>
    <Layout>
        <template v-slot:main>
            <el-button @click="dialogFormVisible = true" type="primary" plain>
                <el-icon><Plus /></el-icon>
                添加
            </el-button>

            <el-dialog v-model="dialogFormVisible" title="添加新用户">
                <el-form :model="form">
                    <el-form-item label="工号" label-width="140px">
                        <el-input v-model="form.staff_id" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="初始密码" label-width="140px">
                        <el-input v-model="form.password" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="姓名" label-width="140px">
                        <el-input v-model="form.name" autocomplete="off" />
                    </el-form-item>

                    <el-form-item label="性别" label-width="140px">
                        <el-select v-model="form.gender">
                            <el-option label="男" value="男" />
                            <el-option label="女" value="女" />
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="电话" label-width="140px">
                        <el-input v-model="form.phone"/>
                    </el-form-item>

                    <el-form-item label="部门" label-width="140px">
                        <el-select v-model="form.department">
                            <el-option 
                                v-for="item in options" 
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="职位" label-width="140px">
                        <el-select v-model="form.position">
                            <el-option 
                                v-for="item in options01" 
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="地址" label-width="140px">
                        <el-input v-model="form.address"/>
                    </el-form-item>

                </el-form>

                <template #footer>
                    <span class="dialog-footer">
                        <el-button type="primary" @click="addStaff();dialogFormVisible = false">确认</el-button>
                        <el-button @click="dialogFormVisible = false">取消</el-button>
                    </span>
                </template>

            </el-dialog>

            <el-table :data="form.tableData" stripe style="width: 100%">
                <el-table-column label="工号" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span style="margin-left: 10px">{{ scope.row.staff_id }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="姓名" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span style="margin-left: 10px">{{ scope.row.name }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="性别" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span style="margin-left: 10px">{{ scope.row.gender }}</span>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="电话" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span style="margin-left: 10px">{{ scope.row.phone }}</span>
                        </div>
                    </template>
                </el-table-column>
                
                <el-table-column label="部门" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span style="margin-left: 10px">{{ scope.row.department }}</span>
                        </div>
                    </template>
                </el-table-column>
               
                <el-table-column label="职位" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <span style="margin-left: 10px">{{ scope.row.position }}</span>
                        </div>
                    </template>
                </el-table-column>
               
                <el-table-column label="操作" width="180">
                    <template #default="scope">
                        <el-button @click="delStaff(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
        </template>
    </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
const dialogFormVisible = ref(false)

const form = reactive({
    staff_id: '',
    password: '',
    name: '',
    gender: '',
    phone: '',
    department: '',
    position: '',
    address: '',
    tableData: []
})

// 添加新员工
const addStaff = () => {
    axios({
        method: 'post',
        url: 'http://127.0.0.1/api/addStaff',
        data: {
            staff_id: form.staff_id,
            password: form.password,
            name: form.name,
            gender: form.gender,
            phone: form.phone,
            department: form.department,
            position: form.position,
            address: form.address
        }
    }).then((res)=>{
        alert('添加成功')
    })
}

const options = [
    {
        value: '服务部',
        label: '服务部',
    },
    {
        value: '管理部',
        label: '管理部',
    },
    {
        value: '经营部',
        label: '经营部',
    }
]

const options01 = [
    {
        value: '人力资源主管',
        label: '人力资源主管',
    },
    {
        value: '工资保险主管',
        label: '工资保险主管',
    },
    {
        value: '楼层白班主管',
        label: '楼层白班主管',
    },
    {
        value: '楼层夜班主管',
        label: '楼层夜班主管',
    }
]

const open = () => {
    ElMessageBox.confirm(
        '此操作将永久删除该商品，是否继续?',
        'Warning',
        {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        }
    )
    .then(() => {
        ElMessage({
            type: 'success',
            message: 'Delete completed',
        })
    })
    .catch(() => {
        ElMessage({
            type: 'info',
            message: 'Delete canceled',
        })
    })
}

// 查询员工信息
onMounted(() => {
    axios({
        method: 'get',
        url: 'http://127.0.0.1/api/getStaffInfo',
    })
    .then((res)=> {
        form.tableData = res.data.data;
    });
})

// 删除员工
const delStaff = (row) => {
    axios({
        method: 'post',
        url: 'http://127.0.0.1/api/delStaff',
        data: {
            staff_id: row.staff_id
        }
    }).then((res)=>{
        alert(res.data)
    })
}
</script>

<style scoped>
.box-card {
    width: 480px;
}
.el-input {
    width: 500px;
}
</style>