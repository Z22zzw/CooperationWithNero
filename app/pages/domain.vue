<template>
  <div class="container">
    <header class="domain-header">
    <!-- 页面头部 -->
    <div class="header-controls">
      <el-date-picker
          v-model="range"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          class="date-picker"
          :clearable="false"
      />
<!--      <el-select-->
<!--          v-model="selectedOption"-->
<!--          placeholder="Select an option"-->
<!--          class="select-container"-->
<!--      >-->
<!--        <el-option-->
<!--            v-for="item in options"-->
<!--            :key="item.value"-->
<!--            :label="item.name"-->
<!--            :value="item.value"-->
<!--        />-->
<!--      </el-select>-->
    </div>
    <!-- 主内容区 -->
      </header>
    <div class="main-content">
      <!-- 卡片网格 -->
      <div class="card-grid">

              <RelatedQuestions></RelatedQuestions>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 指定使用 custom 布局
definePageMeta({
  layout: 'about'
})
import { ref } from 'vue'
import {
  ElDatePicker,
  ElSelect,
  ElOption,
  ElCard,
  ElIcon
} from 'element-plus'
import { Top } from '@element-plus/icons-vue'
import type {ProjectDetails} from "~/interface/ProjectDetails"; // 引入向上的箭头图标


// 日期范围
const today = new Date()
const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
const range = ref([formatDate(today), formatDate(today)])

// 下拉选项（添加 value 字段）
const options = [
  { name: 'Eisenhower Matrix', value: 'eisenhower' },
  { name: 'Morgen Priority Factor', value: 'morgen' },
  { name: 'Asana', value: 'asana' },
  { name: 'Beyond the Chaos', value: 'chaos' },
  { name: 'BMC Training', value: 'bmc' },
  { name: 'InLoox', value: 'inloox' },
  { name: 'Medium', value: 'medium' },
  { name: 'Microsoft', value: 'microsoft' },
  { name: 'Monitask', value: 'monitask' },
]
const selectedOption = ref('eisenhower')

// 模拟数据
const demoProject: ProjectDetails = {
  name: "智能云计算平台",
  totalUp: 15,
  totalCite: 12657,
  mention: [
    { name: "技术博客", visibility: 35842, change: 12.5 },
    { name: "社交媒体", visibility: 45628, change: 8.3 },
    { name: "行业报告", visibility: 42173, change: -4.2 },
    { name: "新闻门户", visibility: 34603, change: 15.1 }
  ],
  regional_division: [{
    name:"亚太区",
    visibility: 74563,
    change: 9.6
  }],
  platform_division: [
    { name: "Web", visibility: 61254, change: 5.7 },
    { name: "Android", visibility: 47532, change: 14.3 },
    { name: "iOS", visibility: 34182, change: 10.8 },
    { name: "API", visibility: 15278, change: -2.4 }
  ],
  change_line: [
    { x: "2023-09-01", y: 12 },
    { x: "2023-09-02", y: 12 },
    { x: "2023-09-03", y: 11 },
    { x: "2023-09-04", y: 12 },
    { x: "2023-09-05", y: 13 },
    { x: "2023-09-06", y: 14 },
    { x: "2023-09-07", y: 15 }
  ]
}

// 卡片交互状态
const hoverCard = ref<string | null>(null)
const activeCard = ref<string | null>(null)

const toggleCardActive = (cardType: string) => {
  activeCard.value = activeCard.value === cardType ? null : cardType
}
</script>
<style scoped>
.domain-header{
  position: fixed;

}
/* 全局容器 */
.container {
  max-width: 1200px;           /* 扩大最大宽度 */
  margin: 0 auto;
  padding: 24px;               /* 增加内边距，更美观 */
  width: 100%;
  box-sizing: border-box;
}

/* 头部控制栏 - 水平居中对齐 */
/* 头部控件容器 */
.header-controls {
  display: flex;
  gap:  30%;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e4e4e4;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  margin-top: -30px;
  max-width:300px;
}

/* 深色模式适配 */
.dark .header-controls {
  background-color: #1f2937;
  border-color: #374151;
}

/* 日期选择器样式 */
.date-picker {
  max-width: 300px;
}

/* 下拉选择器样式 */
.select-container {
  margin-left: auto;
  max-width: 300px;
}
/* 主内容区 */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%; /* 明确继承宽度 */
}

/* 卡片网格 - 左右对齐，间距一致 */
.card-grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  position: fixed;
  width: 2000px;
  height: 650px;
}

/* 移动端：单列 */
@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

/* 卡片基础样式 */
.card-base {
  border-radius: 12px;
  border: 1px solid #e4e4e4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
}

/* 悬停效果 */
.card-base:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-color: #c0c0c0;
}

/* 激活状态 */
.card-active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

/* 卡片内容 */
.card-header {
  padding: 16px 20px 12px;
  border-bottom: 1px solid #eee;
}

.card-header h2 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.card-header p {
  font-size: 13px;
  color: #6b7280;
  margin: 4px 0 0;
}

.card-body {
  padding: 16px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-value {
  font-size: 24px;
  font-weight: 700;
  color: #111;
  margin: 8px 0;
}

.card-footer {
  margin-top: 12px;
  font-size: 13px;
  color: #059669;
  display: flex;
  align-items: center;
  gap: 6px;
}

.card-footer .el-icon {
  font-size: 14px;
}

/* 图表容器 - 水平布局 */
.chart-container {
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.data-show {
  flex: 1;
  min-width: 300px;
  transform: scale(0.92);
  transform-origin: top left;
}

.mention-contain {
  flex: 1;
  min-width: 300px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .chart-container {
    flex-direction: column;
  }

  .data-show, .mention-contain {
    width: 100%;
    transform: scale(1);
  }

  .container {
    padding: 16px;
  }
}

/* 深色模式支持（可选） */
.dark .header-controls,
.dark .card-base {
  background-color: #1f2937;
  border-color: #374151;
}

.dark .card-header h2,
.dark .card-value {
  color: #e5e7eb;
}

.dark .card-header p {
  color: #9ca3af;
}

.dark .card-footer {
  color: #34d399;
}
</style>