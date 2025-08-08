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

<script setup>
import { ref } from 'vue';


// 图表数据
const chartData = ref({
  xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  series: [
    {
      name: '邮件营销',
      data: [0.12, 0.132, 0.101, 0.134, 0.09, 0.23, 0.21],
      color: '#5470c6'
    },
    {
      name: '联盟广告',
      data: [0.22, 0.182, 0.191, 0.234, 0.29, 0.33, 0.31],
      color: '#91cc75'
    },
    {
      name: '视频广告',
      data: [0.15, 0.232, 0.201, 0.154, 0.19, 0.33, 0.41],
      color: '#fac858'
    },
    {
      name: '直接访问',
      data: [0.32, 0.332, 0.301, 0.334, 0.39, 0.33, 0.32],
      color: '#ee6666'
    },
    {
      name: '搜索引擎',
      data: [0.82, 0.932, 0.901, 0.934, 1.29, 1.33, 1.32],
      color: '#73c0de'
    }
  ]
});

// 排行榜数据
const rankingItems = ref([
  {
    id: 1,
    name: "艾森豪威尔矩阵",
    value: "127 答案",
    changeDirection: "up",
    changePercentage: "+3.2%",
    score: 0.54,
    color: "#3b82f6"
  },
  {
    id: 2,
    name: "摩根优先因子",
    value: "89 答案",
    changeDirection: "up",
    changePercentage: "+1.8%",
    score: 0.47,
    color: "#10b981"
  },
  {
    id: 3,
    name: "体式",
    value: "75 答案",
    changeDirection: "down",
    changePercentage: "-0.8%",
    score: 0.41,
    color: "#8b5cf6"
  },
  {
    id: 4,
    name: "团队合作",
    value: "62 答案",
    changeDirection: "up",
    changePercentage: "+0.5%",
    score: 0.38,
    color: "#f97316"
  },
  {
    id: 5,
    name: "项目优先顺序",
    value: "58 答案",
    changeDirection: "down",
    changePercentage: "-1.2%",
    score: 0.36,
    color: "#ec4899"
  },
  {
    id: 6,
    name: "需求分析",
    value: "52 答案",
    changeDirection: "up",
    changePercentage: "+2.7%",
    score: 0.33,
    color: "#8b5cf6"
  },
  {
    id: 7,
    name: "迭代计划",
    value: "47 答案",
    changeDirection: "up",
    changePercentage: "+1.1%",
    score: 0.29,
    color: "#06b6d4"
  }
]);

// 标签控制
const tabs = ['可见性', '互动率', '影响度'];
const activeTab = ref(0);
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f8fafc;
  font-family: 'Inter', 'Segoe UI', 'Microsoft YaHei', sans-serif;
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
  background: white;
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