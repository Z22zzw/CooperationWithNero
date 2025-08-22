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
  myChart = echarts.init(chartRef.value as HTMLElement)
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
  /* 整体卡片容器 - 增加立体感和边框 */
.rank-card {
  background: white;
  border-radius: 16px;
  width:  500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); /* 更柔和的阴影 */
  overflow: hidden; /* 确保圆角和阴影效果 */
  border: 1px solid #e5e7eb; /* 细边框，增加边界感 */
  transition: all 0.3s ease; /* 平滑过渡效果 */
}

/* 鼠标悬停效果 - 提升交互感 */
.rank-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

/* 卡片头部 - 优化布局和视觉 */
.rank-card-header {
  padding: 24px 24px 16px 24px; /* 调整内边距 */
  border-bottom: 1px solid #f3f4f6; /* 轻柔的分隔线 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); /* 微妙的渐变背景 */
}

/* 标题样式 - 更大、更清晰 */
.rank-card-header h3 {
  font-size: 1.25rem; /* 20px */
  font-weight: 600;
  color: #1f2937; /* 深灰色，接近黑色但更柔和 */
  margin: 0;
  line-height: 1.4;
}

/* 选项卡控件容器 */
.tab-controls {
  display: flex;
  gap: 8px; /* 按钮间距 */
}

/* 选项卡按钮基础样式 */
.tab-btn {
  padding: 8px 16px;
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  color: #6b7280; /* 默认为灰色 */
  background: transparent;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

/* 选项卡按钮悬停效果 */
.tab-btn:hover {
  color: #4b5563;
  border-color: #9ca3af;
}

/* 激活的选项卡样式 - 更突出 */
.tab-btn.active {
  background: #3b82f6; /* 主题蓝色 */
  color: white;
  border-color: #3b82f6;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}


</style>

