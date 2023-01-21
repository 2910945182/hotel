<template>
    <Layout>
        <template v-slot:search>
            <el-input
                v-model="search" 
                class="w-50 m-2"
                placeholder="查询订单"
                :prefix-icon="Search"
                style="width: 200px"
            />
        </template>

        <template v-slot:main>
            <el-table :data="filterTableData" style="width: 100%" stripe>
                <el-table-column prop="number" label="订单编号" width="180" />
                <el-table-column prop="name" label="姓名" width="120" />
                <el-table-column prop="sex" label="姓别" width="100" />
                <el-table-column prop="phone" label="手机" />
                <el-table-column prop="date" label="状态"
                    :filters="[
                        { text: '已预订', value: '已预订' },
                        { text: '已支付', value: '已支付' },
                        { text: '已入住', value: '已入住' },
                        { text: '已退房', value: '已退房' },
                    ]"
                    :filter-method="filterHandler"
                />
                <el-table-column prop="startdate" label="起始日期" width="180" />
                <el-table-column prop="enddate" label="结束日期" width="180" />
                
                <el-table-column label="操作" >
                    <el-button @click="ordertiao">
                        详情
                    </el-button>
                </el-table-column>
                
            </el-table>
        </template>
    </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue'
import { Search } from '@element-plus/icons-vue'
import { computed, ref , reactive } from 'vue'
import router from '../router.js'

const data = reactive({
    orderNo: '',
    currentPage: 1,   // 当前页
    pageSize: 24,     // 分页大小
    orderStatus: '',  // 订单状态
})

// 跳转到预订订单详情
const ordertiao = ()=>{
    router.push('/orderdetails');
}

const filterHandler = (value,row,column) => {
    const property = column['property']
    return row[property] === value
}

const user = defineProps({
    number: String,
    name: String,
    address: String
})

const search = ref('')

const filterTableData = computed(() => tableData.filter((data) =>!search.value ||data.number.toLowerCase().includes(search.value.toLowerCase())))

const tableData = [
    {
        number: '202210131001',
        name: '张三',
        sex: '女',
        phone: '18228860326',
        date: '已支付',
        startdate: '2016-05-03',
        enddate: '2016-05-03',
    },
    {
        number: '202207202004',
        name: '李四',
        sex: '女',
        phone: '18228860326',
        date: '已预订',
        startdate: '2016-05-03',
        enddate: '2016-05-03', 
    },
    {
        number: '202206302001',
        name: '王二',
        sex: '男',
        phone: '18228860326',
        date: '已入住',
        startdate: '2016-05-03',
        enddate: '2016-05-03',
    },
    {
        number: '202201234006',
        name: '陆七',
        sex: '男',
        phone: '18228860326',
        date: '已退房',
        startdate: '2016-05-03',
        enddate: '2016-05-03',
    },
]
</script>

