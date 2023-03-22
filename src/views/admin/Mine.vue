<template>
    <div class="box">
        <el-image 
            style="width: 100px; 
            height: 100px" 
            :src="admin_photo_base_url + (store.state.admin.admin.photo||'admin_default.jpg')" 
            :fit="cover" />
        <div>
            <p>账号：{{ store.state.admin.admin }}</p>
            <p>姓名：{{ store.state.admin.name }}</p>
            <p>电话：{{ store.state.admin.phone }}</p>
            <p>角色：{{ store.state.admin.role.name }}</p>
        </div>
    </div>
</template>

<script setup>
import { admin_photo_base_url } from '../../config/conster'



</script>