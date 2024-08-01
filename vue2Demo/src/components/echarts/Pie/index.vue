<template>
  <div id="basicPieChart" ref="myChart" class="bar-canvas" :style="{ height: '100%', width: '100%' }"></div>
</template>
<script>
import * as echarts from 'echarts';

export default {
  name: 'BasicPieChart',
  props: {
    chartData: {
      // 图表数据
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  watch: {
    chartData(newVal) {
      this.setOption(newVal);
    },
  },

  mounted() {
    this.init(); // 初始化地图
  },
  methods: {
    init() {
      this.myChart = echarts.init(this.$refs.myChart, null, { width: 'auto', height: 'auto' });
      this.setOption();
    },
    // 设置option
    setOption() {
      // const option = {
      //   xAxis: {
      //     type: 'category',
      //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      //   },
      //   yAxis: {
      //     type: 'value',
      //   },
      //   series: [
      //     {
      //       data,
      //       type: 'bar',
      //       showBackground: true,
      //       backgroundStyle: {
      //         color: 'rgba(180, 180, 180, 0.2)',
      //       },
      //     },
      //   ],
      // };
      const option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          top: '10%',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['20%', '50%'],
            left: '-50%',
            avoidLabelOverlap: false,
            // padAngle: 5, // 扇形区域的间距
            itemStyle: {
              // borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' },
            ],
          },
        ],
      };
      this.myChart.setOption(option, true);
      window.addEventListener('resize', () => {
        console.log(' this.$refs.myMap.myChart.resize()----');
        this.myChart.resize();
      });
    },
  },
};
</script>

<style lang="less">
.bar-canvas {
  overflow: hidden;
  height: auto;
}
</style>
