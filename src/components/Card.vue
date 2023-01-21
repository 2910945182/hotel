<template>
    <div style="
        display: grid;
        width: 100%;
        height: 520px;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        column-gap: 20px;
        row-gap: 20px;"
        
        >

        <el-card class="box-card card01"  
            @click="dialogFormVisible = true;
            room.id=item.id;
            room.type=item.type;
            room.price=item.price;
            room.start=item.startDate;
            room.end=item.endDate;
            " 
            v-for="(item,index) in form.items" 
            :key="item.id" 
            :index="index"
            >
            
            <template #header>
                <div class="card-header">
                    <span id="room_number">{{ item.id }}</span>
                </div>
            </template>

            <div class="text" style="position: top:0px;float: left;">{{ item.type }}</div>

            <!-- 房间状态 -->
            <div class="ribbon bottom-right">   
                <span :style="{ background: ribbon(item.status) }"></span>
            </div>
            
        </el-card>

        <!-- 添加住户表单 -->
        <el-dialog v-model="dialogFormVisible" title="添加住户">
            <el-form :model="form" :rules="cardFormRules">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>

                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-select v-model="form.gender">
                        <el-option label="男" value="男" />
                        <el-option label="女" value="女" />
                    </el-select>
                </el-form-item>

                <!-- 手机 -->
                <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off" />
                </el-form-item>
                
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-select v-model="form.state">
                        <el-option 
                            v-for="item in options" 
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <!-- 身份证 -->
                <el-form-item label="身份证" :label-width="formLabelWidth" prop="idcard">
                    <el-input v-model="form.idcard" autocomplete="off" />
                </el-form-item>
                
                <!-- 日期 -->
                <el-form-item label="日期" id="date" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="form.value"
                        type="daterange"
                        range-separator="To"
                        start-placeholder="起始时间"
                        end-placeholder="结束时间"
                        format="YYYY/MM/DD"
                        value-format="YYYY-MM-DD"
                        :disabled-date="disabledDate"
                        @change="gettime"
                    />
                </el-form-item>

                <!-- 根据时间显示金额 -->
                <el-form-item label="金额" :label-width="formLabelWidth">
                    {{ form.money }}
                </el-form-item>
                            
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="dialogFormVisible = false;adminOrder02(index)">确定</el-button>
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                </span>
            </template>

        </el-dialog>

    </div>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
    order_number: '',
    name: '',
    gender: '',
    phone: '',
    state: '',
    idcard: '',
    value: [],    //日期
    money: '',    //价格
    items: ''
})

const room = reactive({
    id: '',
    type: '',
    status: '',
    price: '',
    start: '',
    end: ''
})

//表单验证对象
const cardFormRules = reactive({
    name: [
        { required: true, message: '姓名不能为空', trigger: 'blur' },
        { trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '电话不能为空', trigger: 'blur' },
        { pattern:/^1[3|4|5|6|7|8|9]\d{9}$/, message: '请输入正确格式的电话号码', trigger: 'blur' }
    ],
    idcard: [
        { required: true, message: '身份证号不能为空', trigger: 'blur' },
    ]
})

const open2 = () => {
    ElMessage({
        message: '添加成功',
        type: 'success',
    })
}

const options = [
    {
        value: '空闲',
        label: '空闲',
    },
    {
        value: '预订',
        label: '预订',
    },
    {
        value: '入住',
        label: '入住',
    },
    {
        value: '清扫',
        label: '清扫',
    },
    {
        value: '维修',
        label: '维修',
    }
]

const props = defineProps({
    id: Number,
    type: String,
    pageSize: Number,
    number: Number
})

// 一页的数据条数
const handleSizeChange = (number) => {
    
}

// 当前页的值
const handleCurrentChange = (number) => {
    console.log('当前页为：'+number)
}


const disabledDate = (time) => {
    return time.getTime() < Date.now() - 8.64e7 ||new Date(room.start).getTime() < time.getTime()+ 24 * 60 * 60 * 1000*2 && 
    time.getTime() < new Date(room.end).getTime()+ 24 * 60 * 60 * 1000; 
    // console.log(time.getTime())
}

const gettime = () => {
    var day1, day2, dddd;
    const a = form.value[0].split("-");
    const b = form.value[1].split("-");

    //console.log(a.join(''))   //开始日期字符串
    form.order_number  = a.join('').concat(room.id)

    day1 = new Date(a[0] , a[1] , a[2]);
    day2 = new Date(b[0] , b[1] , b[2]);

    dddd  =  parseInt(Math.abs(day2  -  day1)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数
    form.money = dddd*room.price;
}

// 添加现场订单
function adminOrder02(){
    axios({
        method: 'post',
        url: 'http://127.0.0.1/api/addOrder02',
        data: {
            order_number: form.order_number,
            room_id: room.id,
            room_type: room.type,
            name: form.name,
            gender: form.gender,
            phone: form.phone,
            state: form.state,    //房间状态
            idcard: form.idcard,
            startdate: form.value[0],
            enddate: form.value[1],
            money: form.money
        }
    }).then((res)=>{
        console.log('添加成功')
    })
}

// 查询房间信息
onMounted(() => {
    axios({
        method: 'get',
        url: 'http://127.0.0.1/api/getRoomInfo',
    })
    .then((res)=> {
        form.items = res.data.data;
        console.log(form.items)
    });
})

// 丝带颜色
const ribbon = (status)=>{
    switch(status) {
        case '空闲':
            return '#95d475'
            break;
        case '预订':
            return '#eebe77'
            break;
        case '入住':
            return '#f89898'
            break;
        case '清扫':
            return '#409EFF'
            break;
        case '维修':
            return '#73767a'
            break;
        default:
            // return '#73767a'
            break;
    }
}

</script>

<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10px;
}

.box-card {
    cursor: pointer;
}

.card01 {
    position: relative;
}

#room_number {
    font-size: 20px;
}

.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}

#date {
    font-size: var(--el-form-label-font-size);
    color: var(--el-text-color-regular);
    width: 440px;
    height: 32px;
    line-height: 32px;
    padding: 0 12px 0 0
}

.color {
    float: right; 
    margin-top: 16px;
    margin-left: 18px;
    background-color: #eebe77;
}

.ribbon {
    position: absolute;
    width: 100px;
    height: 100px;
    // background-color: brown; 
    overflow: hidden;  /*内容溢出元素框时，内容会被修剪，并且其余内容是不可见的*/
}

.ribbon::before,
.ribbon::after {
    position: absolute;
    z-index: -1;
    content: '';
    display: block;
    border: 5px solid #2980b9;
}

.ribbon span {
    position: absolute;
    display: block;
    width: 225px;
    padding: 20px 0 0px 0;
    // background-color: #95d475;
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
    color: #fff;
    font: 700 18px/1 'Lato', sans-serif;
    text-shadow: 0 1px 1px rgba(0,0,0,.2);
    text-align: center;    /*文本居中对齐*/
}

/* bottom right*/
.bottom-right {
    bottom: -10px;
    right: -10px;
}
.bottom-right::before,
.bottom-right::after {
    border-bottom-color: transparent;
    border-right-color: transparent;
}
.bottom-right::before {
    bottom: 0;
    left: 0;
}
.bottom-right::after {
    top: 0;
    right: 0;
}
.bottom-right span {
    left: -25px;
    bottom: 30px;
    transform: rotate(-45deg);
}
</style>