<template>
  <!-- 图表容器，必须设置宽高 -->
  <div
      ref="chartRef"
      :style="{ width: width, height: height }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'

// 定义类型
type EChartsOption = echarts.EChartsOption

// 组件属性
interface Props {
  width?: string
  height?: string
}

// 默认值
withDefaults(defineProps<Props>(), {
  width: '300px',
  height: '400px'
})

// 图表 DOM 引用
const chartRef = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return

  // 销毁旧实例（防止重复初始化）
  if (myChart) {
    myChart.dispose()
  }

  myChart = echarts.init(chartRef.value)

  const option: EChartsOption = {
    graphic: {
      elements: [
        {
          type: 'group',
          left: 'center',
          top: 'center',
          children: new Array(7).fill(0).map((_, i) => ({
            type: 'rect',
            x: i * 20,
            shape: {
              x: 0,
              y: -40,
              width: 10,
              height: 80
            },
            style: {
              fill: '#5470c6'
            },
            keyframeAnimation: {
              duration: 1000,
              delay: i * 200,
              loop: true,
              keyframes: [
                {
                  percent: 0.5,
                  scaleY: 0.3,
                  easing: 'cubicIn'
                },
                {
                  percent: 1,
                  scaleY: 1,
                  easing: 'cubicOut'
                }
              ]
            }
          }))
        }
      ]
    }
  }

  myChart.setOption(option)
}

// 组件挂载后初始化
onMounted(() => {
  initChart()
  // 延迟触发 resize，确保容器尺寸已计算
  setTimeout(() => {
    myChart?.resize()
  }, 100)
})

// 监听容器尺寸变化（可选：使用 ResizeObserver 更佳）
window.addEventListener('resize', () => {
  myChart?.resize()
})

// 组件卸载前销毁图表实例
onBeforeUnmount(() => {
  if (myChart) {
    myChart.dispose()
    myChart = null
  }
  window.removeEventListener('resize', () => {
    myChart?.resize()
  })
})

// 如果 width/height 是响应式的，可以监听它们变化（可选）
// 这里简单处理：父组件变化时触发 resize
defineExpose({
  refresh: () => {
    nextTick(() => {
      myChart?.resize()
    })
  }
})
</script>

<style scoped>
/* 可选：添加边框或阴影 */
</style>