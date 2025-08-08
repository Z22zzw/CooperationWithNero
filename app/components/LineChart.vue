<template>
  <div ref="chartRef" style="width: 500px; height: 400px; position: relative;"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'
import type { ProjectDetails } from '~/interface/ProjectDetails'

// 使用 withDefaults 给 data 设置默认空数组，防止 undefined
const props = withDefaults(
    defineProps<{
      data: ProjectDetails['change_line']
    }>(),
    {
      data: () => [] // 默认为空数组
    }
)

const chartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

onMounted(() => {
  if (!chartRef.value) return

  // 初始化图表实例
  myChart = echarts.init(chartRef.value)

  //先设置基础配置（不包含数据）
  const baseOption = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b}<br/>{a}: {c}',
      backgroundColor: 'rgba(50,50,50,0.7)',
      borderColor: '#333',
      textStyle: {
        color: '#fff',
        fontSize: 14
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: 'rgba(150,150,150,0.5)',
          width: 1
        }
      }
    },
    xAxis: {
      type: 'category',
      data: [] // 先为空
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '可见性分数',
        type: 'line',
        data: [], // 先为空
        itemStyle: { color: '#5470c6' },
        emphasis: {
          itemStyle: {
            color: '#dd6b66',
            borderWidth: 2,
            borderColor: '#fff'
          }
        },
        smooth: false,
        areaStyle: {
          color: 'rgba(84, 112, 198, 0.1)'
        }
      }
    ]
  }

  // 设置基础配置
  myChart.setOption(baseOption)

  //监听数据变化，动态更新图表
  watch(
      () => props.data,
      (newData) => {
        if (!myChart || !newData) return

        // 确保 newData 是数组且非 null/undefined
        const xData = Array.isArray(newData) ? newData.map(item => item.x) : []
        const yData = Array.isArray(newData) ? newData.map(item => item.y) : []

        myChart.setOption({
          xAxis: { data: xData },
          series: [{ data: yData }]
        })
      },
      { immediate: true } // 立即执行一次，兼容初始数据
  )

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
</script>
