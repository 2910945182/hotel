<template>
    <div class="box">
        <el-card class="box-card01">
            <div class="head_portrait" style="display: flex;justify-content: center;">
                <el-avatar  
                    :size="100" 
                    :src="admin_photo_base_url + (account.admin.photo || 'admin_default.jpg')" />
            </div>

            <el-descriptions class="margin-top" title="员工信息" :column="1" :size="size" border>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            账号
                        </div>
                    </template>
                    {{ account.admin.loginId }}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            姓名
                        </div>
                    </template>
                    {{ account.admin.name }}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            电话
                        </div>
                    </template>
                    {{ account.admin.phone }}
                </el-descriptions-item>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            角色
                        </div>
                    </template>
                    <el-tag size="large">{{ account.admin.role.roleName }}</el-tag>
                </el-descriptions-item>

            </el-descriptions>
        </el-card>

        <el-card class="box-card02">
            
        </el-card>

        <el-card class="box-card03">
            
        </el-card>

    </div>
</template>

<script setup>
import { admin_photo_base_url } from '../../config/conster'
import { useLoginStore } from '../../store/admin.js'

let account = useLoginStore()

</script>

<style lang="less" scoped>
.box {
    height: calc(100vh - 80px);
    position: relative;
}

.box-card01 {
    width: 340px;
    height: calc(100% - 1px);
}

.box-card02 {
    width: 1010px;
    height: 100px;
    position: absolute;
    top: 0;
    right: 0;
}

.box-card03 {
    width: 1010px;
    height: 600px;
    position: absolute;
    bottom: 0;
    right: 0;
}

.margin-top {
    margin-top: 20px;
}
</style>