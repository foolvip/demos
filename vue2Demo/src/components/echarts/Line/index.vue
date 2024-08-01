<template>
  <div id="lineChart" ref="myChart" class="line-canvas" :style="{ height: '100%', width: '100%' }"></div>
</template>
<script>
import * as echarts from 'echarts';
import { Toast } from 'vant';

export default {
  name: 'LineChart',
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
    setOption(data = [820, 932, 901, 934, 1290, 1330, 1320]) {
      const option = {
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
            type: 'line',
            smooth: true,
            showSymbol: false, // 隐藏数据标记的图形
            data,
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
.line-canvas {
  overflow: hidden;
  height: auto;
}
</style>
