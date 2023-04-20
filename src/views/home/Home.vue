<template>
    <div class="home">
        <div class="box" ref="box"></div>
        <div id="main" style="width:200px;height: 100px;"></div>
    </div>
    
</template>

<script setup>
import * as echarts from "echarts";
import { getCurrentInstance, onBeforeMount, onMounted, reactive } from "vue";
import { totalTypePrice } from '../../api/roomType'
import { watch } from "vue";

let data = reactive({
    myChart: {},
    totalTypePriceList: []
});

let loadTotalTypePriceList = async()=>{
    let ret = await totalTypePrice()
    data.totalTypePriceList = ret
}

onBeforeMount(()=>{
    loadTotalTypePriceList()
})

let $this = getCurrentInstance();

watch(()=>data.totalTypePriceList,()=>{
    data.myChart = echarts.init($this.refs.box);
    data.myChart.setOption({
        title: {
            text: "房型累计销售额",
        },
        tooltip: {},
        xAxis: {
            data: data.totalTypePriceList.map(r=>r.roomtypeName),
        },
        yAxis: {},
        series: [
            {
                name: "销量",
                type: "bar",
                data: data.totalTypePriceList.map(r=>r.totalMoney),
            },
        ],
    });
})
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: space-between;
}
.box {
    width: 1000px;
    height: 400px;
}
</style>