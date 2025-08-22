<template>
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
          <LineChart :data="transformToChartData(demoProject.change_line)"/>
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
</template>

<script setup lang="ts">
import type {ProjectDetails} from "~/interface/ProjectDetails";

definePageMeta({
  layout: 'custom'
})
import { ref, watch } from 'vue'
import { Top } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

// 使用路由实例
const route = useRoute()

// 响应式数据
const range = ref([getCurrentDate(), getCurrentDate()])
const options = ref<{name:string,value:string}[]>([])
const demoProject = ref<ProjectDetails>({
  id:"UNKNOW",
  name: "UNKNOW",
  totalUp: 0,
  totalCite:0,
  mention: [],
  regional_division: [],
  platform_division:[],
  change_line:[]
})
const selectedOption = ref<string>('')
const hoverCard = ref<string | null>(null)
const activeCard = ref<string | null>(null)

// 获取当前日期格式
function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
// 获取项目数据
const { data, pending, error, refresh } = await useFetch<ProjectDetails>(() => `/api/projectDetails?projectId=${route.params.id}`, {
  key: `project-details-${route.params.id}`, // 缓存 key，避免不同 id 混淆
  watch: [() => route.params.id] // 路由变化时自动刷新
})
watch(
    () => data.value,
    (newData) => {
      if (newData) {
        options.value =[
          {name:"1",
            value:"1"
          }
        ]
        demoProject.value = newData;
        selectedOption.value =options.value[0]!.value
      }
      console.log(demoProject.value)
    },
    { immediate: true }
)
// 卡片交互函数保持不变
const toggleCardActive = (cardType: string) => {
  activeCard.value = activeCard.value === cardType ? null : cardType
}
function transformToChartData(data, options = {}) {
  // 提取 labels 和 values
  const labels = data.map(item => item.x)
  const values = data.map(item => item.y)

  // 配置项默认值
  const {
    label = 'Total referrals',
    backgroundColor = 'rgba(54, 162, 235, 0.2)',
    borderColor = 'rgba(54, 162, 235, 1)',
    borderWidth = 1
  } = options

  return {
    labels,
    datasets: [
      {
        label,
        data: values,
        backgroundColor,
        borderColor,
        borderWidth
      }
    ]
  }
}
</script>
<style scoped>
/* 全局容器 */
.container {
  max-width: 1200px;           /* 扩大最大宽度 */
  margin-top: -5px;
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
  gap: 40px;
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
  min-width: 100%;
  transform: scale(100%);
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
.container {
  max-width: 100%; /* 改为全宽 */
  padding: 1.5rem; /* 使用相对单位 */
}


/* 修改最小宽度 */
.data-show, .mention-contain {
  min-width: unset; /* 移除固定限制 */
  width: 100%; /* 添加弹性宽度 */
}

/* 头部控件响应式 */
.header-controls {
  gap: 1rem; /* 改用相对单位 */
  flex-wrap: wrap; /* 允许换行 */
}

/* 卡片网格响应式 */
.card-grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* 弹性列数 */
}

/* 图表容器优化 */
.chart-container {
  flex-wrap: wrap; /* 允许换行 */
}

/* 添加响应式断点 */
@media (max-width: 1024px) {
  .header-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .date-picker,
  .select-container {
    width: 100%;
    max-width: none;
  }
}

/* 使用视口单位 */
.card-value {
  font-size: clamp(1.5rem, 4vw, 2rem); /* 响应式字体 */
}
</style>