<template>
    <el-form :model="form">
        <h3 style="margin: 0 auto;width:40px;margin-bottom:20px;">请假</h3>
        
        <el-row :gutter="24" style="width:800px;margin: auto;">
            <el-col :span="12">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" style="width:250px" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="工号">
                    <el-input v-model="form.num" style="width:250px"/>
                </el-form-item>
            </el-col>
        </el-row>
        
        <el-row :gutter="24" style="width:800px;margin: auto;">
            <el-col :span="12">
                <el-form-item label="部门" prop="region">
                    <el-select v-model="form.region" placeholder="请选择" style="width:250px">
                        <el-option label="后勤部" value="shanghai" />
                        <el-option label="管理部" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="职位">
                    <el-input style="width:250px"/>
                </el-form-item>
            </el-col>
        </el-row>

        <el-row :gutter="24" style="width:800px;margin: auto;">
            <el-col :span="8">
                <el-form-item label="时间">
                    <div class="demo-date-picker">
                        <div class="block">
                            <el-date-picker
                                v-model="form.value1"
                                type="daterange"
                                range-separator="To"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                :disabled-date="disabledDate"
                                style="width:230px"
                            />
                        </div>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="16"></el-col>
        </el-row>

        <el-row :gutter="24" style="width:800px;margin: auto;">
            <el-col :span="24">
                <el-form-item label="事由">
                    <el-input v-model="form.desc" type="textarea" :rows="9"/>
                </el-form-item>
            </el-col>
            <el-col :span="12">
            </el-col>
        </el-row>

        <el-form-item class="btn">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>返回</el-button>
        </el-form-item>

    </el-form>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
    name: '',
    num: '',
    region: '',
    value1: '',
    desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}

const disabledDate = (time) => {
    return time.getTime() < Date.now() - 8.64e7; 
}
</script>

<style lang="less" scoped>
.btn {
    position: absolute;
    width:132px;
    left: 50%;
    bottom: 20px;
}
.el-row {
    margin-bottom: 20px;
}
.el-row:last-child {
    margin-bottom: 0;
}
.el-col {
    border-radius: 4px;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>
