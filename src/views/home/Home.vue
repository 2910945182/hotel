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

// 定义数据
let data = reactive({
    // 定义echarts实例
    myChart: {},
    // 每种房型的销售额
    totalTypePriceList: []
});

// 加载各种房型的销售额数组
let loadTotalTypePriceList = async()=>{
    let ret = await totalTypePrice()
    console.log(ret);
    data.totalTypePriceList = ret
}

// 页面挂载之前
onBeforeMount(()=>{
    loadTotalTypePriceList()
})

// 获取当前实例
let $this = getCurrentInstance();

watch(()=>data.totalTypePriceList,()=>{
    // 基于准备好的dom,初始化echarts实例
    data.myChart = echarts.init($this.refs.box);
    // 绘制图表
    data.myChart.setOption({
        title: {
            text: "房型累计销售额",
        },
        tooltip: {},
        // 系列
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



// onMounted(()=>{
//     // 基于准备好的dom，初始化echarts实例
//     var myChart = echarts.init(document.getElementById('main'));
//     // 绘制图表
//     myChart.setOption({
//         title: {
//             text: 'ECharts 入门示例'
//         },
//         tooltip: {},
//         xAxis: {
//             data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//         },
//         yAxis: {},
//         series: [
//             {
//                 name: '销量',
//                 type: 'bar',
//                 data: [5, 20, 36, 10, 10, 20]
//             }
//         ]
//     });
// })
</script>

<style lang="less" scoped>
.home {
    width: 100%;
    height: 100%;
    // border: 1px solid blue;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: space-between;
}
.box {
    width: 1000px;
    height: 400px;
    // border: 1px solid red;
}
</style>