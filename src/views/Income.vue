<template>
    <div>
        <Layout>
            <template v-slot:main> 
                <el-card id="main" style="padding: 24px 0 0 20px">
                  
                </el-card>
                <el-card id="main01" style="padding: 24px 0 0 0"></el-card>
                <el-card id="main02" style="padding-top: 24px"></el-card> 
                
            </template>
        </Layout>
    </div>
</template>

<script setup>
import Layout from '../components/Layout.vue'
import { onMounted, reactive, ref } from 'vue'
import OrderDetails from '../views/OrderDetails.vue'
import * as echarts from 'echarts';

onMounted(()=>{
    // 基于准备好的dom,初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    
    myChart.setOption({
        baseOption: {
            title: {
                text: '营业额'
            },
            timeline: {
                axisType: 'category',
                show: true,
                // autoPlay: false,
                // playInterval: 1000,
                data: ['2016', '2017', '2018', '2019', '2020'],
            },
            grid: {
                containLabel: true,
            },
            xAxis: [
                {
                type: 'category',
                axisLabel: {
                    show: true,
                    interval: 0,
                    textStyle: {
                        color: '#A6D3FD',
                        fontSize: 14,
                    },
                },
                axisPointer: {
                    show: true,
                    type: 'shadow',
                },
                data: [
                    '一月',
                    '二月',
                    '三月',
                    '四月',
                    '五月',
                    '六月',
                    '七月',
                    '八月',
                    '九月',
                    '十月',
                    '十一月',
                    '十二月',
                ],
                },
            ],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value}',
                }
            }],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                },
            },
        },
        //变量则写在options中
        options: [
            {
                series: [{
                    type: 'bar',
                    data: [
                        19418,
                        15240,
                        43193,
                        220210,
                        43943,
                        485361,
                        176160,
                        219901,
                        188151,
                        26884,
                        71789,
                        19680,
                    ]
                }],
            },
            {
                series: [{
                    type: 'bar',
                    data: [
                        18023,
                        14874,
                        43163,
                        23090,
                        44098,
                        4899,
                        18283,
                        20517,
                        19098,
                        282382,
                        8075,
                        2164,
                    ],
                }],
            },
          //2018
          {
            series: [
              {
                type: 'bar',
                data: [
                    18953,
                    16197,
                    44491,
                    2590,
                    452997,
                    515929,
                    206441,
                    209326,
                    198,
                    31479,
                    8798,
                    23087,
                ],
              },
            ],
          },
          //2019
          {
            series: [
              {
                type: 'bar',
                data: [
                    2008,
                    17084,
                    46477,
                    28717,
                    47082,
                    5476,
                    22,
                    222,
                    2082,
                    3433,
                    9221,
                    243,
                ],
              },
            ],
          },
          //2020
          {
            series: [
              {
                type: 'bar',
                data: [
                  3591,
                  2694,
                  3138,
                  221,
                  208,
                  3994,
                  4850,
                  6611,
                  3082,
                  7968,
                  521,
                  9674,
                ],
              },
            ],
          },
        ],
    })  
});

onMounted(()=>{
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main01'));

    // 指定宽度和高度
    myChart.resize({
        width: 400,
        height: 400
    });

    // 绘制图表
    myChart.setOption({
        title: {
            text: '上月开销',
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 'right',
            data: ['水', '电', '零食', '上网', '早餐']
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            // center: ['50%', '60%'],
            data: [
                { value: 335, name: '水' },
                { value: 310, name: '电' },
                { value: 234, name: '零食' },
                { value: 135, name: '上网' },
                { value: 1548, name: '早餐' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                }
            }
        }]
    });
});

let currentIndex = -1;

setInterval(function() {
    // var dataLen = option.series[0].data.length;
    // 取消之前高亮的图形
    myChart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
    currentIndex = (currentIndex + 1) % dataLen;
    // 高亮当前图形
    myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
    // 显示 tooltip
    myChart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: currentIndex
    });
}, 1000);

onMounted(()=>{
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.getElementById('main02'));

    // 绘制图表
    myChart.setOption({
        title: {
            text: '当月营业额',
        },
        xAxis: {
            data: [
                '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
            ]
        },
        yAxis: {},
        series: [{
            data: [
                10, 22, 16, 23, 19, 10, 12, 16, 13, 15, 
                10, 12, 13, 23, 29, 20, 18, 16, 13, 19, 
                24, 14, 16, 20, 15, 30, 22, 19, 24, 20,
            ],
            type: 'line'
        }]
    });
});

</script>

<style lang="less" scoped>
#main {
    width: 870px; 
    height: 340px;
    float: left;
}
#main01 {
    width: 446px; 
    height: 340px;
    float: right;
}
#main02 {
    width: 1353px; 
    height: 280px;
    position: relative;
    top: 16px;
}
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
</style>