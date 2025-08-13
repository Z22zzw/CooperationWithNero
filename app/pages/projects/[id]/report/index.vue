<script setup lang="ts">

import {ref} from "vue";

definePageMeta({
  layout: 'reports'
})
const chartData = ref({
  xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  series: [
    {
      name: '社交媒体营销',
      data: [0.22, 0.24, 0.25, 0.27, 0.26, 0.28, 0.30],
      color: '#FF6B6B'
    },
    {
      name: 'KOL合作',
      data: [0.18, 0.19, 0.21, 0.23, 0.25, 0.24, 0.26],
      color: '#4ECDC4'
    },
    {
      name: '品牌联名',
      data: [0.15, 0.17, 0.16, 0.19, 0.22, 0.24, 0.25],
      color: '#FFD166'
    },
    {
      name: '内容营销',
      data: [0.28, 0.25, 0.27, 0.29, 0.30, 0.32, 0.34],
      color: '#6A0572'
    }
  ]
});
const rankingItems = ref([
  {
    id: 1,
    name: "情感共鸣营销",
    value: "4.8 用户参与度",
    changeDirection: "up",
    changePercentage: "+5.2%",
    score: 0.89,
    color: "#FF6B6B"
  },
  {
    id: 2,
    name: "可持续发展主张",
    value: "92% 认可度",
    changeDirection: "up",
    changePercentage: "+3.4%",
    score: 0.85,
    color: "#4ECDC4"
  },
  {
    id: 3,
    name: "元宇宙体验",
    value: "78K 访问量",
    changeDirection: "down",
    changePercentage: "-1.2%",
    score: 0.76,
    color: "#6A0572"
  },
  {
    id: 4,
    name: "用户共创计划",
    value: "2.1K 参与数",
    changeDirection: "up",
    changePercentage: "+7.8%",
    score: 0.72,
    color: "#FFD166"
  },
  {
    id: 5,
    name: "怀旧营销",
    value: "35% 转化率",
    changeDirection: "down",
    changePercentage: "-2.1%",
    score: 0.68,
    color: "#1A535C"
  }
]);
const tabs = ['可见性', '互动率', '影响度'];
const activeTab = ref(0);

</script>

<template>
  <div class="dashboard-container">
    <header class="main-header">
      <h2>数据分析概览</h2>
    </header>

    <main class="main-content">
      <section class="chart-section">
        <!-- 折线图区域 -->
        <div class="chart-card">
          <StackedLineChart
              :data="chartData"
              title="各产品销售趋势对比"
              :width="'100%'"
              :height="'400px'"
              :stack="false"
          />
        </div>

        <!-- 排行榜表格区域（带独立滚动） -->
        <div class="rank-card">
          <div class="rank-card-header">
            <h3>最明显的提及</h3>
            <div class="tab-controls">
              <button
                  v-for="(tab, index) in tabs"
                  :key="index"
                  class="tab-btn"
                  :class="{ active: activeTab === index }"
                  @click="activeTab = index"
              >
                {{ tab }}
              </button>
            </div>
          </div>

          <div class="rank-card-body">
            <rank-table
                :items="rankingItems"
                :items-per-page="5"
            />
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8fafc;
  font-family: 'Inter', 'Segoe UI', 'Microsoft YaHei', sans-serif;
  width:150%;
  padding-left: 20px;
}

.main-header {
  padding: 20px 30px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.main-header h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow: hidden;
}

.chart-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
}

.chart-card {
  min-height: 300px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.chart-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.rank-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  height: 100%;
}

.rank-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.rank-card-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
}

.rank-card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #1a1a1a;
}

.tab-controls {
  display: flex;
  gap: 8px;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 5px;
}

.tab-btn {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: transparent;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
}

.rank-card-body {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 10px;
  }

  .chart-section {
    gap: 15px;
  }

  .rank-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .tab-controls {
    width: 100%;
    justify-content: center;
  }
}
</style>