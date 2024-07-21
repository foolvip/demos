<template>
  <div ref="mapChartRef" class="map-chart"></div>
</template>

<script>
import * as echarts from 'echarts';
import chinamap from './china.json';

export default {
  name: 'MapChart',
  // props: {},
  data() {
    return {
      myChart: null,
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.mapChartRef);
    this.init();
  },
  methods: {
    init() {
      // 2. 注册可用的地图，只在 geo 组件或者map图表类型中使用
      echarts.registerMap('china', chinamap); // 用导入的json文件注册一个name:china的地图组件
      const option = {
        series: [
          {
            type: 'map',
            mapType: 'china',
            aspectScale: 0.85,
            layoutCenter: ['50%', '50%'], // 地图位置
            layoutSize: '100%',
            zoom: 1, // 当前视角的缩放比例
            roam: true, // 是否开启平游或缩放
            scaleLimit: {
              // 滚轮缩放的极限控制
              min: 1,
              max: 2,
            },
            itemStyle: {
              normal: {
                areaColor: '#D8E5FB',
                borderColor: '#fff',
                borderWidth: 1.5,
              },
              emphasis: {
                areaColor: '#02102b',
                label: {
                  color: '#fff',
                },
              },
            },
            data: [{ name: '四川省', value: 22 }],
          },
        ],
      };
      // 4. 显示地图
      this.myChart.setOption(option); // 用 option 和 option2 效果一样
    },
  },
};
</script>

<style lang="less" scoped>
.map-chart {
  width: 100%;
  height: 500px;
  background-color: #f1f3f4;
}
</style>
