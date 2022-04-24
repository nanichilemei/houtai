<template>
  <div class="orderEchartsMain">
    <div id="orderEcharts" class="orderEcharts" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  props: {
    orderNum: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
    this.initOrderEcharts()
  },
  methods: {
    initOrderEcharts() {
      var dateList = []
      var orderList = []
      var returnList = []
      this.orderNum.forEach(el => {
        dateList.push(el.date)
        orderList.push(el.orderNum)
        returnList.push(el.backNum)
      })
      var odEchart = echarts.init(document.getElementById('orderEcharts'))
      var option = {
        title: {
          text: '订单退单柱状图',
          textStyle: {
            color: '#9AA8D4',
            fontSize: 22,
            fontWeight: 'normal'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          // 对应 series里的 name
          option,
          // 距离底部
          bottom: 10,
          // 字体样式
          textStyle: {
            color: '#A8AAB3', // 坐标值得具体的颜色
            fontSize: 12
          }
        },
        xAxis: {
          data: dateList,
          splitLine: {
            show: false
          }
          // axisLine: {
          //   lineStyle: {
          //     type: 'solid',
          //     color: '#A8AAB3', // 左边线的颜色
          //     width: '1'// 坐标线的宽度
          //   }
          // }
          // axisLabel: {
          //   // 坐标轴字体样式
          //   textStyle: {
          //     color: '#A8AAB3', // 坐标值得具体的颜色
          //     fontSize: 12
          //   }
          // }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          // y线的样式
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#A8AAB3', // 左边线的颜色
              width: '50'// 坐标线的宽度
            }
          },
          axisLabel: {
            // 坐标轴字体样式
            textStyle: {
              color: '#A8AAB3', // 坐标值得具体的颜色
              fontSize: 12
            }
          }
        },
        series: [
          {
            name: '订单',
            type: 'bar',
            data: orderList,
            itemStyle: {
              normal: {
                // 渐变柱状图
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#7D05E2' }, // 柱图渐变色
                    { offset: 0.5, color: '#B600FF' }, // 柱图渐变色
                    { offset: 1, color: '#BC04E2' } // 柱图渐变色
                  ]
                )
              }
            }
          },

          {
            name: '退单',
            type: 'bar',
            data: returnList,
            itemStyle: {
              normal: {
                // 渐变柱状图
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#24CBFF' }, // 柱图高亮渐变色
                    { offset: 0.5, color: '#24A3FF' }, // 柱图高亮渐变色
                    { offset: 1, color: '#2492FF' } // 柱图高亮渐变色
                  ]
                )
              }

            }
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
          return idx * 5
        }
      }
      odEchart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
.orderEchartsMain {
  width: 100%;
  height: 100%;
  .orderEcharts {
    width: 100%;
    height: 100%;
  }
}
</style>
