<template>
    <div>
        <Layout>
            <template v-slot:main>
                <el-card style="padding: 30px 30px 30px 30px; height: 630px; ">

                    <el-steps :active="2" align-center>
                        <el-step title="预订" />
                        <el-step title="付款" />
                        <el-step title="入住" />
                        <el-step title="退房" />
                    </el-steps>

                    <el-descriptions
                        class="margin-top"
                        title="订单详情"
                        :column="1"
                        :size="size"
                        border
                        style="
                            width: 600px;
                            float: left;
                        "
                    >

                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <el-icon><Memo /></el-icon>
                                    </el-icon>
                                    订单编号
                                </div>
                            </template>
                            1909091
                        </el-descriptions-item>

                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <el-icon><Guide /></el-icon>
                                    </el-icon>
                                    房号
                                </div>
                            </template>
                            1002
                        </el-descriptions-item>

                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <user />
                                    </el-icon>
                                    住户
                                </div>
                            </template>
                            张三
                        </el-descriptions-item>

                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <el-icon><Female /></el-icon>
                                    </el-icon>
                                    姓别
                                </div>
                            </template>
                            男
                        </el-descriptions-item>

                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <el-icon><Phone /></el-icon>
                                    </el-icon>
                                    电话
                                </div>
                            </template>
                            18100000000
                        </el-descriptions-item>

                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <House />
                                    </el-icon>
                                    房型
                                </div>
                            </template>
                            标准套房
                        </el-descriptions-item>

                        <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <el-icon><Timer /></el-icon>
                            </el-icon>
                            起始时间
                            </div>
                        </template>
                        2022-10-11 13:12
                        </el-descriptions-item>

                        <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <el-icon><Stopwatch /></el-icon>
                            </el-icon>
                            结束时间
                            </div>
                        </template>
                        2022-10-13 16:45
                        </el-descriptions-item>

                        <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <el-icon><Postcard /></el-icon>
                            </el-icon>
                            身份证号
                            </div>
                        </template>
                        511922200111238946
                        </el-descriptions-item>

                        <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <office-building />
                            </el-icon>
                            支付方式
                            </div>
                        </template>
                        微信支付
                        </el-descriptions-item>

                        <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <el-icon><Coin /></el-icon>
                            </el-icon>
                            金额
                            </div>
                        </template>
                        180 元
                        </el-descriptions-item>
                    </el-descriptions>

                    <el-descriptions
                        class="margin-top"
                        title=" "
                        :column="1"
                        :size="size"
                        border
                        style="
                            width: 600px;
                            float: right;
                            position: relative;
                            top: 20px;
                        "
                    >
                        <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <user />
                            </el-icon>
                            其他住户
                            </div>
                        </template>
                        王二
                        </el-descriptions-item>

                        <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <el-icon><Female /></el-icon>
                            </el-icon>
                            性别
                            </div>
                        </template>
                        男
                        </el-descriptions-item>

                        <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <el-icon><Phone /></el-icon>
                            </el-icon>
                            电话
                            </div>
                        </template>
                        18288870937
                        </el-descriptions-item>

                        <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <el-icon><Postcard /></el-icon>
                            </el-icon>
                            身份证
                            </div>
                        </template>
                        511922200308248953
                        </el-descriptions-item>

                    </el-descriptions>

                    <div class="btn">
                        <el-button>续房</el-button>
                        <el-button type="primary" plain @click="room" style="margin-right:15px;">确认</el-button>
                        <el-button type="warning" plain style="margin-left:15px;">返回</el-button>
                    </div>

                </el-card>
            </template>
        </Layout>
    </div>
</template>

<script setup>
import { ref,reactive } from 'vue'
import Layout from '../components/Layout.vue'
import { computed } from 'vue'
import router from '../router.js'
import {
    Iphone,
    Location,
    OfficeBuilding,
    Tickets,
    User,
} from '@element-plus/icons-vue'

const size = ref('')
const iconStyle = computed(() => {
    const marginMap = {
        large: '8px',
        default: '6px',
        small: '4px',
    }
    return {
        marginRight: marginMap[size.value] || marginMap.default,
    }
})

// 跳转到房间页面
const room = ()=>{
    router.push('/home');
}
</script>

<style scoped>
.el-descriptions {
    margin-top: 20px;
}
.cell-item {
    display: flex;
    align-items: center;
}
.margin-top {
    margin-top: 20px;
}
.btn {
    position: absolute;
    left: 40%;
    width: 240px;
    bottom: 50px;
}
</style>