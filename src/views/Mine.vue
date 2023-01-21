<template>
    <Layout>
        <template v-slot:main>
            <!-- 卡片 -->
            <el-card class="box-card" style="width: 340px; height: 690px; float: left;">
                <!-- 头像 -->
                <div class="demo-type">
                    <el-avatar size="large"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                </div>

            <el-descriptions
                class="margin-top"
                title="员工信息"
                :column="1"
                :size="size"
                border="true"
                id="info"
            >

            <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                <el-icon :style="iconStyle">
                    <user />
                </el-icon>
                    工号
                </div>
            </template>
            2040610416
            </el-descriptions-item>

            <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                <el-icon :style="iconStyle">
                    <user />
                </el-icon>
                    姓名
                </div>
            </template>
            张三
            </el-descriptions-item>

            <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                <el-icon :style="iconStyle">
                    <location />
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
            18228860326
            </el-descriptions-item>

            <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                <el-icon :style="iconStyle">
                    <location />
                </el-icon>
                住址
                </div>
            </template>
            百叶路一号
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <tickets />
                    </el-icon>
                    部门
                    </div>
                </template>
                前端开发
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <tickets />
                    </el-icon>
                    职位
                    </div>
                </template>
                <el-tag>前台</el-tag>
            </el-descriptions-item>

            <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                <el-icon :style="iconStyle">
                    <location />
                </el-icon>
                入职时间
                </div>
            </template>
            2022-03-18
            </el-descriptions-item>

            </el-descriptions>

            <!-- 登录时间 -->
            <el-timeline style="position: relative; top: 20px;">
                <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp"
                >
                {{ activity.content }}
                </el-timeline-item>
            </el-timeline>
            </el-card>

            <el-card class="box-card01" style="width: 990px; height: 100px; float: right;">
                <el-card shadow="hover" style="width: 160px; float: left; margin-right: 20px; margin-left: 30px;" @click="totakeoff"> 请假 </el-card>
                <el-card shadow="hover" style="width: 160px; float: left; margin-right: 20px;" @click="toonbusiness"> 出差 </el-card>
                <el-card shadow="hover" style="width: 160px; float: left; margin-right: 20px;"> 调休 </el-card>
                <el-card shadow="hover" style="width: 160px; float: left; margin-right: 20px;"> 报销 </el-card>
                <el-card shadow="hover" style="width: 160px; float: left; margin-right: 20px;"> 考勤 </el-card>
            </el-card>

            <el-card style="width:990px; height:570px; position: relative; left: 20px; top: 18px;text-align: center;">
                <router-view></router-view>
            </el-card>

        </template>
    </Layout>
</template>

<script setup>
import Layout from '../components/Layout.vue'
import router from '../router.js'

const activities = [
    {
        content: '登录时间',
        timestamp: '2018-04-15',
    },
    {
        content: '登陆时间',
        timestamp: '2018-04-13',
    },
    {
        content: '登录时间',
        timestamp: '2018-04-11',
    }
]

// 跳转到请假页面
const totakeoff = ()=>{
    router.push('/mine/takeoff');
}

// 跳转到出差页面
const toonbusiness = ()=>{
    router.push('/mine/onbusiness');
}
</script>

<style lang="less" scoped>
#info {
    width: 300px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>