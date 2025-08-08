<script setup lang="ts">
import {ref} from 'vue';
import {ElCard, ElDatePicker, ElIcon, ElOption, ElSelect} from "element-plus";
import {Top} from "@element-plus/icons-vue";
definePageMeta(
    {
      layout:'about'
    }
)
const isDemo = ref(false);
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

<template>
  <!--  demo展示-->
  <div v-if="isDemo">
    <div class="container">
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
        <el-select
            v-model="selectedOption"
            placeholder="Select an option"
            class="select-container"
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
          />
        </el-select>
      </div>
      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 卡片网格 -->
        <div class="card-grid">
          <el-card
              :class="['card-base', activeCard === 'visibility' ? 'card-active' : '']"
              @mouseenter="hoverCard = 'visibility'"
              @mouseleave="hoverCard = null"
              @click="toggleCardActive('visibility')"
          >
            <div class="card-header">
              <h2>你的可见性分数</h2>
              <p>提及你的品牌的百分比</p>
            </div>
            <div class="card-body">
              <div class="card-value">{{ demoProject.totalUp }}%</div>
              <div class="card-footer">
                <el-icon><Top /></el-icon>
                <span>{{ demoProject.totalUp }}% 较往期上升</span>
              </div>
            </div>
          </el-card>

          <el-card
              :class="['card-base', activeCard === 'citations' ? 'card-active' : '']"
              @mouseenter="hoverCard = 'citations'"
              @mouseleave="hoverCard = null"
              @click="toggleCardActive('citations')"
          >
            <div class="card-header">
              <h2>你的引文</h2>
              <p>你的网站在答案中被引用的次数</p>
            </div>
            <div class="card-body">
              <div class="card-value">{{ demoProject.totalCite }}</div>
              <div class="card-footer">
                <span>与上一期提升 {{ demoProject.totalCite }}</span>
              </div>
            </div>
          </el-card>
        </div>

        <!-- 图表区域 -->
        <div class="chart-container">
          <div class="data-show card-base">
            <LineChart :data="demoProject.change_line"/>
          </div>
          <div class="mention-contain card-base">
            <TableShow :table-list="demoProject.mention" header="最明显的提及" description="所有答案中提及最多的" table_header="提到"/>
          </div>
        </div>
        <div class="chart-container">
          <div class="mention-contain card-base">
            <TableShow :table-list="demoProject.regional_division" header="按地区划分的可见性" description="来自特定区域的答案中的可见性分数" table_header="地区"/>
          </div>
          <div class="mention-contain card-base">
            <TableShow :table-list="demoProject.platform_division" header="按平台划分的可见性" description="按平台划分的答案可见性分数" table_header="平台"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <!--    文字部分-->
    <div  class="referral-text-container">
      <div class="refer-text">
        <h1>跟踪来自AI的引用</h1>
        <p>
          通过 AI 助手和搜索深入了解谁在访问，并将流量归因于人们向 DeepSeek 等 AI 平台提出的问题。
        </p>
      </div>
    </div>

    <!--    按钮部分-->
    <div>
      <div class="referral-button-container">
        <p class="referral-button-text">您还未连接API接口，是否前往配置？</p>
        <button class="referral-gotoSetting">前往配置</button>
        <button class="referral-checkDemo" @click="isDemo=true">查看Demo</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.referral-text-container{
  text-align:center;
}
.referral-button-container{
  text-align: center;
}
.referral-button-text{
  color: #f0f2f5;
  background-color: #f44336;
  border-radius: 10px;
  padding: 10px 20px;
  margin-top: 20px;
  width:300px;
  position: relative;
  left: 38%;
}
.referral-gotoSetting{
  color: #fff;
  background-color: #4a4e53;
  border-radius: 10px;
  padding: 10px 20px;
  margin-top: 20px;
  width:110px;
  position: relative;
}
.referral-gotoSetting:hover{
  background-color: #4a4a4a;
  cursor: pointer;
  transition: all 0.5s;
  color: #fff;
  border: 1px solid #4a4a4a;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);;
}
.referral-checkDemo{
  color: black;
  background-color: white;
  border-radius: 10px;
  padding: 10px 20px;
  margin-top: 20px;
  width:110px;
  position: relative;
  margin-left: 200px;
}

.referral-checkDemo:hover{
  background-color: #4a4a4a;
  cursor: pointer;
  transition: all 0.5s;
  color: #fff;
  border: 1px solid #4a4a4a;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);;
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