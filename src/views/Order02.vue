<template>
    <Layout>
        <template v-slot:search>
            <el-input
                v-model="state.orderNo"
                class="w-50 m-2"
                placeholder="查询订单"
                :prefix-icon="Search"
                style="width: 200px"
            />
        </template>

        <template v-slot:main>
            <el-table :data="state.order02Info.slice((pagination.currentPage-1)*pagination.pageSize,pagination.currentPage*pagination.pageSize)" stripe style="width: 100%">
                    <el-table-column prop="order_number" label="订单编号" width="140" />
                    <el-table-column prop="name" label="姓名" width="100" />
                    <el-table-column prop="gender" label="姓别" width="100" />
                    <el-table-column prop="phone" label="手机" width="140"/>
                    <el-table-column prop="state" label="状态" width="100"/>
                    <el-table-column prop="idcard" label="身份证" width="220" />
                    <el-table-column prop="startdate" label="起始日期" width="140" />
                    <el-table-column prop="enddate" label="结束日期" width="140" />
                    <el-table-column prop="money" label="金额" width="100"/>

                    <el-table-column label="操作">
                        <el-button @click="ordertiao">
                            详情
                        </el-button>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination 
                    layout="total, sizes,prev, pager, next, jumper" 
                    :total="state.order02Info.length"
                    v-model:current-page="pagination.currentPage"
                    v-model:page-size="pagination.pageSize"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"/>
        </template>
    </Layout>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { HomeFilled, Delete } from '@element-plus/icons-vue'
import axios from 'axios'
import Layout from '../components/Layout.vue'
import router from '../router.js'

const state = reactive({
    orderNo: '',
    options: [
        { value: '', label: '全部' }, 
        { value: 0, label: '已支付' },
        { value: 1, label: '已入住' },
        { value: 2, label: '已退房' }
    ],
    order02Info: []
})

const tableData = [
    {
        // number: '8789',
        name: '',
        gender: '',
        phone: '',
        state: '',
        idcard: '',
        startdate: '',
        enddate: '',
        money: ''
    }
]

// 分页
const pagination = reactive({
    currentPage: 1,    //默认显示第一页
    pageSize: 12,      //每页显示多少条数据
})

// 跳转到现场订单详情
const ordertiao = ()=>{
    router.push('/orderdetails02');
}

// 查询现场订单信息
onMounted(() => {
    axios({
        method: 'get',
        url: 'http://127.0.0.1/api/getOrder02',
    })
    .then((res)=> {
        state.order02Info = res.data.data
        console.log(state.order02Info.length)
    });
})

// 一页的数据条数
const handleSizeChange = (number) => {
    
}

// 当前页的值
const handleCurrentChange = (number) => {
    console.log('当前页为：'+number)
}
</script>