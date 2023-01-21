<template>
    <el-form :model="Form">
        <h3 style="margin: 0 auto;width:40px;margin-bottom:20px;">出差</h3>
        
        <el-row :gutter="24" style="width:800px;margin:auto;">
            <el-col :span="12">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="Form.name" style="width:250px;" />
                </el-form-item>
            </el-col>
            
            <el-col :span="12">
                <el-form-item label="工号">
                    <el-input v-model="Form.num" style="width:250px;" />
                </el-form-item>
            </el-col>
        </el-row>
        
        <el-row :gutter="24" style="width:800px;margin: auto;">
            <el-col :span="12">
                <el-form-item label="部门" prop="region">
                    <el-select v-model="Form.region" placeholder="请选择" style="width:250px;">
                        <el-option label="后勤部" value="shanghai" />
                        <el-option label="管理部" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-col>
            
            <el-col :span="12">
                <el-form-item label="职位">
                    <el-select placeholder="请选择" style="width:250px;">
                        <el-option label="后勤部" value="shanghai" />
                        <el-option label="管理部" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-col>

        </el-row>


        <el-row :gutter="24" style="width:800px;margin: auto;">
            <el-col :span="8">
                <el-form-item label="时间">
                    <div class="demo-date-picker">
                        <div class="block">
                            <el-date-picker
                                v-model="value1"
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

            <el-col :span="8">
                <el-form-item label="地点">
                    <el-select v-model="Form.position" placeholder="请选择省份" style="width:180px;">
                        <el-option label="河南" value="beijing" />
                        <el-option label="四川" value="shanghai" />
                        <el-option label="江苏" value="beijing" />
                        <el-option label="陕西" value="shanghai" />
                    </el-select>
                </el-form-item>
            </el-col>
                
            <el-col :span="8">
                <el-select placeholder="请选择城市" style="width:180px;">
                    <el-option label="河南" value="beijing" />
                    <el-option label="四川" value="shanghai" />
                    <el-option label="江苏" value="beijing" />
                    <el-option label="陕西" value="shanghai" />
                </el-select>
            </el-col>
            
            <el-col :span="8">
                <el-select placeholder="请选择区/县" style="width:180px;">
                    <el-option label="河南" value="beijing" />
                    <el-option label="四川" value="shanghai" />
                    <el-option label="江苏" value="beijing" />
                    <el-option label="陕西" value="shanghai" />
                </el-select>
            </el-col>
            
        </el-row>

        <el-row :gutter="24" style="width:800px;margin: auto;">
            <el-col :span="24">
                <el-form-item label="事由" style="width:780px;" prop="desc">
                    <el-input v-model="Form.desc" type="textarea" :rows="9"/>
                </el-form-item>
            </el-col>
        </el-row>
        
        <el-form-item>
            <el-button type="primary">提交</el-button>
            <el-button @click="router.push('/mine')">返回</el-button>
        </el-form-item>

    </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import router from '../router.js'

const value1 = ref('')

const Form = reactive({
    name: '',
    num: '',
    region: '',
    position: '',
    type: [],
    resource: '',
    desc: '',
})

const disabledDate = (time) => {
    return time.getTime() < Date.now() - 8.64e7; 
}

//表单验证
// const rules = reactive({
//     name: [
//         { required: true, message: '输入姓名', trigger: 'blur' },
//         { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
//     ],
//     region: [
//         {
//         required: true,
//         message: 'Please select Activity zone',
//         trigger: 'change',
//         },
//     ],
    
//     date1: [
//         {
//         type: 'date',
//         required: true,
//         message: 'Please pick a date',
//         trigger: 'change',
//         },
//     ],
//     date2: [
//         {
//         type: 'date',
//         required: true,
//         message: 'Please pick a date',
//         trigger: 'change',
//         },
//     ],
//     type: [
//         {
//         type: 'array',
//         required: true,
//         message: 'Please select at least one activity type',
//         trigger: 'change',
//         },
//     ],
//     resource: [
//         {
//         required: true,
//         message: 'Please select activity resource',
//         trigger: 'change',
//         },
//     ],
//     desc: [
//         { required: true, message: 'Please input activity form', trigger: 'blur' },
//     ],
// })


</script>

<style lang="less">
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