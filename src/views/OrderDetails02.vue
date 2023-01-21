<template>
    <Layout>
        <template v-slot:main>
            <el-card style="height: 630px; padding: 30px 30px 30px 30px;">
                <el-steps :active="3" align-center>
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
                                        <Memo />
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
                                        <Guide />
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
                                        <Female />
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
                                <iphone />
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
                                <Timer />
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
                                <Stopwatch />
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
                                <Postcard />
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
                                <Coin />
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
                                <Female />
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
                                <iphone />
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
                                <Postcard />
                            </el-icon>
                            身份证
                            </div>
                        </template>
                        511922200308248953
                        </el-descriptions-item>

                    </el-descriptions>

                    <div class="btn">
                        <el-button>续房</el-button>
                        <el-button type="primary" plain style="margin-right:15px;">确认</el-button>
                        <el-button type="warning" plain style="margin-left:15px;">返回</el-button>
                    </div>
                    
            </el-card>
        </template>
    </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue'
</script>

<style scoped>
.el-descriptions {
    margin-top: 20px;
}
.btn {
    position: absolute;
    left: 50%;
    bottom: 50px;
}
</style>