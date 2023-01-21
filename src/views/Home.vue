<template>
    <Layout>
        <template v-slot:main>
            <el-row>
                
                <el-card shadow="always"> 
                    <h3 class="state">空闲中</h3>
                    <h2>{{ Object.values(data.available)[0] }}</h2>
                    <el-avatar :size="14" style="background-color: #95d475"/>
                </el-card>
            
                <el-card shadow="always">
                    <h3 class="state">已预定</h3>
                    <h2>{{ Object.values(data.booked)[0] }}</h2>
                    <el-avatar :size="14" style="background-color: #eebe77"/>
                </el-card>
            
                <el-card shadow="always">
                    <h3 class="state">已入住</h3>
                    <h2>{{ Object.values(data.used)[0] }}</h2>
                    <el-avatar :size="14" style="background-color: #f89898"/>
                </el-card>
                
                <el-card shadow="always">
                    <h3 class="state">清扫中</h3>
                    <h2>{{ Object.values(data.sweep)[0] }}</h2> 
                    <el-avatar :size="14" style="background-color: #409EFF"/> 
                </el-card>
            
                <el-card shadow="always">
                    <h3 class="state">维修中</h3>
                    <h2>{{ Object.values(data.breakdown)[0] }}</h2> 
                    <el-avatar :size="14" style="background-color: #73767a"/> 
                </el-card>
               
            </el-row> 
        
            <Card></Card>
      
        </template>
    </Layout>  
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
import Card from '../components/Card.vue'
import Layout from '../components/Layout.vue'

const data = reactive({
    available: '',
    booked: '',
    used: '',
    sweep: '',
    breakdown: ''
})

// 获取房间状态
onMounted(() => {
    axios({
        method: 'get',
        url: 'http://127.0.0.1/api/getRoomState',
    })
    .then((res)=> {
        data.available = res.data.data[0];
        data.booked = res.data.data[1];
        data.used = res.data.data[2];
        data.sweep = res.data.data[3];
        data.breakdown = res.data.data[4];
    })
})

</script>

<style scoped>
.el-row {
    display: grid;
    width: 100%;
    height: 100px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: 20px;
}

.mt-4 {
    float: left;
    position: relative;
    left: 30%;
}

.el-avatar {
    position: relative;
    right: -190px;
    top: -16px;
}

.demo-pagination-block + .demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}
</style>