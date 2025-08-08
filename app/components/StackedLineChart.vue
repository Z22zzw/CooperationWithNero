<template>
  <div ref="chartRef" :style="{ width: width, height: height, position: 'relative' }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'

interface SeriesData {
  name: string
  data: number[]
  color?: string
}

interface ChartData {
  xAxisData: string[]
  series: SeriesData[]
}

const props = withDefaults(
    defineProps<{
      data?: ChartData
      width?: string
      height?: string
      title?: string
      showToolbox?: boolean
      showLegend?: boolean
      stack?: boolean
    }>(),
    {
      data: () => ({
        xAxisData: [],
        series: []
      }),
      width: '100%',
      height: '400px',
      title: '',
      showToolbox: true,
      showLegend: true,
      stack: true
    }
)

const chartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

// 默认颜色配置
const defaultColors = [
  '#5470c6', // 蓝色
  '#91cc75', // 绿色
  '#fac858', // 黄色
  '#ee6666', // 红色
  '#73c0de', // 浅蓝色
  '#3ba272', // 深绿色
  '#fc8452', // 橙色
  '#9a60b4', // 紫色
  '#ea7ccc', // 粉色
  '#87ceeb'  // 天蓝色
]

onMounted(() => {
  if (!chartRef.value) return

  // 初始化图表实例
  myChart = echarts.init(chartRef.value)
  updateChart()

  // 监听窗口 resize
  const handleResize = () => myChart?.resize()
  window.addEventListener('resize', handleResize)

  // 组件卸载前清理
  onBeforeUnmount(() => {
    if (myChart) {
      myChart.dispose()
      myChart = null
    }
    window.removeEventListener('resize', handleResize)
  })
})

// 监听数据变化
watch(
    () => props.data,
    () => updateChart(),
    { deep: true, immediate: true }
)

function updateChart() {
  if (!myChart || !props.data) return

  // 确保数据有效
  const xData = Array.isArray(props.data.xAxisData) ? props.data.xAxisData : []
  const seriesData = Array.isArray(props.data.series) ? props.data.series : []

  // 构建系列数据
  const series = seriesData.map((item, index) => ({
    name: item.name,
    type: 'line',
    stack: props.stack ? 'Total' : undefined,
    data: Array.isArray(item.data) ? item.data : [],
    itemStyle: {
      color: item.color || defaultColors[index % defaultColors.length]
    },
    lineStyle: {
      width: 2
    },
    symbol: 'circle',
    symbolSize: 6,
    emphasis: {
      itemStyle: {
        borderWidth: 2,
        borderColor: '#fff'
      }
    },
    smooth: false,
    areaStyle: props.stack ? {
      opacity: 0.6
    } : undefined
  }))

  // 更新图例数据
  const legendData = seriesData.map(item => item.name)

  // 设置图表配置
  const option = {
    title: {
      text: props.title,
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(50,50,50,0.8)',
      borderColor: '#333',
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(150,150,150,0.5)',
          width: 1
        }
      },
      formatter: function(params: any) {
        let result = `${params[0].axisValue}<br/>`
        params.forEach((item: any) => {
          const percent = (item.value * 100).toFixed(0)
          result += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${item.color};"></span>`
          result += `${item.seriesName}: ${percent}%<br/>`
        })
        return result
      }
    },
    legend: {
      show: props.showLegend,
      data: legendData,
      top: 'bottom',
      left: 'center',
      itemGap: 20,
      textStyle: {
        fontSize: 12,
        color: '#666'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: props.showLegend ? '15%' : '3%',
      top: props.title ? '10%' : '3%',
      containLabel: true
    },
    toolbox: {
      show: props.showToolbox,
      feature: {
        saveAsImage: {
          title: '保存为图片'
        },
        dataZoom: {
          title: {
            zoom: '区域缩放',
            back: '区域缩放还原'
          }
        },
      },
      right: '2%',
      top: '2%'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData,
      axisLine: {
        lineStyle: {
          color: '#e0e0e0'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#666',
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#666',
        fontSize: 12,
        formatter: (value: number) => `${(value * 100).toFixed(0)}%`
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0',
          type: 'dashed'
        }
      }
    },
    series: series
  }

  myChart.setOption(option)
}
</script>

<style scoped>
/* 图表容器样式 */
</style>
