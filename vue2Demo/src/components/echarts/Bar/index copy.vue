<template>
  <div id="basicBarChart" ref="myChart" class="bar-canvas" :style="{ height: '100%', width: '100%' }"></div>
</template>
<script>
import * as echarts from 'echarts';

export default {
  name: 'BasicBarChart',
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
    setOption(data = [120, 200, 150, 80, 70, 110, 130]) {
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
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
          },
        },
        legend: {
          data: ['Evaporation', 'Precipitation', 'Temperature'],
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisPointer: {
              type: 'shadow',
            },
            boundaryGap: '100%',
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Precipitation',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml',
            },
          },
          {
            type: 'value',
            name: 'Temperature',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C',
            },
          },
        ],
        barGap: '-80%',
        series: [
          {
            name: 'Evaporation',
            type: 'bar',
            barWidth: '50%',
            showBackground: true,
            // backgroundStyle: {
            //   color: 'rgba(180, 180, 180, 0.2)',
            // },
            tooltip: {
              valueFormatter(value) {
                return `${value} ml`;
              },
            },
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
          },
          {
            name: 'Precipitation',
            type: 'bar',
            barWidth: '30%',
            tooltip: {
              valueFormatter(value) {
                return `${value} ml`;
              },
            },
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
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
