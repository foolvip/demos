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
      const option = {
        color: ['#0063F2'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              // type: 'solid',
              width: 2,
              color: '#fff',
            },
          },
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
          splitLine: { show: false },
        },
        series: [
          {
            data,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: '#F2F5FF',
            },
            itemStyle: {
              borderRadius: 2,
            },
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
