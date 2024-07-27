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
        // visualMap: {
        //     min: 0,
        //     max: 10000,
        //     // text: ['高', '低'],
        //     realtime: false,
        //     calculable: false,
        //     itemWidth: 16,
        //     itemHeight: 79,
        //     left: 0,
        //     top: 40,
        //     inverse: true,
        //     orient: 'horizontal',
        //     inRange: {
        //         color: ['#E6F0FF', '#0955CE']
        //     }
        // },
        // dataZoom: {
        //     type: 'inside'
        // },
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
                // areaColor: {
                //     type: 'radial',
                //     x: 0.5,
                //     y: 0.5,
                //     r: 0.8,
                //     colorStops: [
                //         {
                //             offset: 0,
                //             color: '#0063F2' // 0% 处的颜色
                //         },
                //         {
                //             offset: 1,
                //             color: '#D1E2FF' // 100% 处的颜色
                //         }
                //     ],
                //     globalCoord: false // 缺省为 false
                // },
                // shadowColor: 'rgba(128, 217, 248, 1)', // 文字块的背景阴影颜色
                // shadowOffsetX: -2,
                // shadowOffsetY: 2,
                // shadowBlur: 10
              },
              emphasis: {
                areaColor: '#02102b',
                label: {
                  color: '#fff',
                },
              },
            },
            // markPoint: { //标记点
            //     // symbol设置的为小旗子图片
            //     symbol: `image://${flagImg}`,
            //     symbolSize: 14, //图形大小
            //     label: {
            //     normal: {
            //         formatter: function(params) {
            //         console.log(params);
            //         return params.name;
            //         },
            //         show: false,
            //     },
            //     emphasis: {
            //         show: false,
            //     }
            //     },
            //     data: [{ name: '河南省', coord: [113.619717, 33.902648] }]
            // },
            data: [{ name: '四川省', value: 22 }],
          },
        ],
      };
      const option1 = {
        // 背景颜色
        backgroundColor: '#00477f',
        geo: {
            map: 'china',
            layoutCenter: ['50%', '50%'], // 地图所在的位置
            layoutSize: 600, // 地图视图大小
            roam: true, // 开启地图缩放和移动
            label: {
                // 通常状态下的样式
                normal: {
                    show: true,
                    textStyle: {
                        color: '#fff',
                    },
                },
                // 鼠标放上去的样式
                emphasis: {
                    textStyle: {
                        color: '#fff',
                    },
                },
            },
            // 地图区域的样式设置
            itemStyle: {
                normal: {
                    borderColor: '#addef8',
                    borderWidth: 1,
                    areaColor: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.8,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#61bba1', // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: '#61bba1', // 100% 处的颜色
                            },
                        ],
                        globalCoord: false, // 缺省为 false
                    },
                    shadowColor: 'rgba(128, 217, 248, 1)', // 文字块的背景阴影颜色
                    shadowOffsetX: -2,
                    shadowOffsetY: 2,
                    shadowBlur: 10,
                },
                // 鼠标放上去高亮的样式
                emphasis: {
                    areaColor: '#addef8',
                    borderWidth: 0,
                },
            },
        },
    }
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
