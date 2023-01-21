<template>
    <el-row :gutter="24" style="width:800px;background-color:red;
        margin: auto;">
        <el-col :span="12">
            <el-form-item label="姓名">
                <el-input/>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-input></el-input>
        </el-col>
    </el-row>
</template>

<script setup>

</script>

<style>
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