<template>
  <div ref="mapContainerRef" class="chartsContainer">
    <div class="chartWrap">
      <CustomBar />
    </div>
    <div class="chartWrap">
      <BasicPie :chart-data="[820, 932, 901, 934, 1290, 1330, 1320]" />
    </div>
    <div class="chartWrap">
      <BasicBar :chart-data="[820, 932, 901, 934, 1290, 1330, 1320]" />
    </div>
    <div class="chartWrap">
      <BasicLine :chart-data="[820, 932, 901, 934, 1290, 1330, 1320]" />
    </div>
    <div class="chartWrap">
      <BasicMap ref="myMap"></BasicMap>
    </div>
  </div>
</template>
<script>
import BasicMap from '@/components/echarts/Map/index.vue';
import BasicLine from '@/components/echarts/Line/index.vue';
import BasicBar from '@/components/echarts/Bar/index.vue';
import BasicPie from '@/components/echarts/Pie/index.vue';
import CustomBar from '@/components/echarts/Custom/bar.vue';

export default {
  name: 'EchartDemo',
  components: {
    BasicMap,
    BasicLine,
    BasicBar,
    BasicPie,
    CustomBar,
  },
  data() {
    return {
      orientation: false,
    };
  },
  mounted() {
    // window.addEventListener('resize', this.resize)
  },
  methods: {
    toggle() {
      this.orientation = !this.orientation;
      this.$nextTick(() => {
        // this.$refs.myMap.myChart.resize()

        // setTimeout(()=>{

        this.$refs.myMap.myChart.resize();
        // },100)
      });
    },
  },
};
</script>
<style lang="less" scoped>
.chartsContainer {
  margin-top: 30px;
  .chartWrap {
    width: 100%;
    height: 300px;
  }
}
.landsCape-container {
  position: absolute;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  transform: none;
  transform-origin: 50% 50%;
  &.landscape {
    width: 100vh;
    height: 100vw;
    right: 0;
    left: auto;
    top: calc((100vh - 100vw) / 2);
    left: calc((100vw - 100vh) / 2);
    transform: rotate(90deg);
  }
  .scroll {
    overflow: auto;
    width: 100%;
    height: 100%;
  }
}
</style>
