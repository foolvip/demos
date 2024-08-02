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
      hookToolTip: {},
      tooltipButton: [],
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.mapChartRef);
    this.init();
    this.myChart.on('showTip', () => {
      const tooltipButton = document.querySelectorAll('.btn-tooltip');
      console.log('showTip 33333---:', tooltipButton);
      if (tooltipButton.length > 0) {
        tooltipButton.forEach((item) => {
          item.addEventListener('click', (e) => {
            const { target } = e;
            const res = target.getAttribute('data-param');
            console.log('showTip res---:', res);
            this.$router.push({
              path: '/about',
            });
            // emits('chartClick', res);
          });
        });
      }
    });

    // this.myChart.on('hideTip', () => {
    //   const tooltipButton = document.querySelectorAll('.btn-tooltip');
    //   console.log('hideTip 33333---:', tooltipButton);
    //   for (let i = 0; i < tooltipButton.length; i++) {
    //     tooltipButton[i].addEventListener('click', (e) => {
    //       const { target } = e;
    //       const res = target.getAttribute('data-param');
    //       console.log('showTip res---:', res);
    //       // emits('chartClick', res);
    //     });
    //   }
    // });
  },
  methods: {
    chartClick(e) {
      // this.$router.push({
      //   path: '/about',
      // });
      console.log('-------addEventList', this.hookToolTip);
      console.log('----eee---addEventList', e.target, e.currentTarget);
    },
    init() {
      const that = this;
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
        tooltip: {
          trigger: 'item',
          triggerOn: 'click',
          enterable: true, // 可以让鼠标进入tooltip
          // position(p) {
          //   // 修改位置跟鼠标的距离
          //   return [p[0] - 20, p[1] - 20];
          // },
          // confine: true,
          extraCssText:
            'padding: 0px; background: linear-gradient(#00A6F9, #4385FF); border-radius: 0.08rem;z-index: 99;',
          formatter(item) {
            console.log('tooltip params---:', item);
            that.hookToolTip = item;
            // 需要绑定点击事件
            let tipHtml = '';
            tipHtml =
              `<p >` +
              `<div class="btn-tooltip"  data-param="list111" style="font-size: 14px; color: #fff;">list111</div>` +
              `<div class="btn-tooltip" data-param="list222" style="font-size: 14px; color: #fff;">list222</div>` +
              `</p>`;

            return tipHtml;
            // const getHtml = (data = []) => {
            //   let str = '';
            //   data.forEach((item) => {
            //     str += `<div id="btn-tooltip" class="li" data-param="${params.name}">${item} <span class="link"> > </span></div>`;
            //   });
            //   return str;
            // };
            // const htmlStr = `
            //             <div class="map-tooltip">${getHtml(['厦门惠民保', '福建惠闽保'])}</div>
            //             `;
            // return htmlStr;
          },
        },
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
                // 地图区域的颜色
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
                areaColor: '#02102b', // 鼠标经过地图区域的颜色
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
            data: [{ name: '四川省', value: 22 }],
            select: {
              itemStyle: {
                areaColor: 'green', // 点击选中区域的颜色
              },
            },
            data: [{ name: '四川省', value: 22, itemStyle: { color: 'red' } }],
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
