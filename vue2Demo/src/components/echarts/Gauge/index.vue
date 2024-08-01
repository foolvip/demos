<template>
    <div id="echarts-gauge" style=" width: 100%; height: 1.02rem;" ref="myEchart"></div>
</template>
<script>
import * as echarts from 'echarts'

export default {
    props: {
        chartData: {
            type: Number,
            default: () => 0,
        },
    },
    name: 'echartsMap',
    data() {
        return {
            myChart: null
        }
    },
    mounted() {
        this.init()
    },
    watch: {
        chartData(newVal) {
            this.setOption(newVal)
        }
    },
    methods: {
        init() {
            this.myChart = echarts.init(this.$refs.myEchart)
            
            window.addEventListener('resize', () => {
                this.myChart.resize()
            })
        },
        setOption(data){
            let option = {
                series: [
                    {
                    type: 'gauge',
                    radius: '95%', // 仪表盘半径
                    startAngle: 180,
                    endAngle: 0,
                    center: ['49%', '70%'],
                    min: 0, 
                    max: 100,
                    itemStyle: {
                        color: '#0063F2'
                    },
                    progress: {
                        show: true,
                        width: 5,
                    },
                    axisLine: { // 外圈
                        lineStyle: {
                            width: 5,
                            color: [
                                [1, '#F2F5FF']
                            ]
                        }
                    },
                    axisTick: { // 刻度线
                        show: false,
                        // length: 5,
                        // distance: 5,
                        // splitNumber: 2,
                        // lineStyle: {
                        //     width: 2,
                        //     color: '#C9DDFF'
                        // }
                    },
                    splitLine: { // 分割线
                        // show: false,
                        length: 5,
                        distance: 5,
                        splitNumber: 2,
                        lineStyle: {
                            width: 1,
                            color: '#C9DDFF'
                        }
                    },
                    axisLabel: {
                        show: false, // 隐藏刻度数字
                        // color: '#7B7B84',
                        // fontSize: 5,
                    },
                    pointer: {
                        length: '50%',
                        width: 2,
                        offsetCenter: [0, '-6%']
                    },
                    anchor: {
                        show: true,
                        showAbove: true,
                        size: 5,
                        itemStyle: {
                            borderWidth: 2,
                            borderColor: '#0063F2'
                        }
                    },
                    title: {
                        show: false
                    },
                    detail: {
                        show: false,
                        valueAnimation: true,
                        fontSize: 80,
                        offsetCenter: [0, '70%']
                    },
                    data: [
                        {
                            value: data
                        }
                    ]
                    }
                ]
            };
            this.myChart.setOption(option)
        }
        
    }
}
</script>
<style lang="less" scoped>

</style>