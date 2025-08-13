<script setup lang="ts">
import { ref } from "vue";
import PlatformLineChart from "~/components/PlatformLineChart.vue";

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
  <div class="rank-card">
    <div class="rank-card-header">
      <div class="rank-card-title">
        <p class="question">什么是声音份额？</p>
        <p class="answer">语音份额报告提供了所选品牌在 AI 响应中被提及方式的相对比较。自定义此报告以比较竞争对手或您最感兴趣的品牌之间的份额。</p>
      </div>
      <section class="chart-section">
        <!-- 折线图区域 -->
        <div class="chart-card">
          <PlatformLineChart
              :data="chartData"
              title="各平台提及前后趋势对比"
              :width="'100%'"
              :height="'400px'"
              :stack="false"
          />
        </div>
      </section>
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
</template>

<style scoped>
.rank-card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin: 24px;
}

.rank-card-header {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.rank-card-title {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  background-color: #edf2f7;
}

.question {
  font-size: 24px;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.answer {
  font-size: 16px;
  color: #4a5568;
  margin: 0;
}

.chart-section {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.chart-card {
  padding: 16px;
  background-color: #ffffff;
}

.tab-controls {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.tab-btn {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
  background-color: transparent;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active {
  background-color: #111827;
  color: #ffffff;
  border-color: #111827;
}

.tab-btn:hover {
  background-color: #f1f5f9;
  border-color: #a0aec0;
}

.rank-card-body {
  margin-top: 24px;
}

.rank-table {
  width: 100%;
  border-collapse: collapse;
}

.rank-table th, .rank-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.rank-table th {
  background-color: #edf2f7;
  font-weight: 600;
  color: #1a202c;
}

.rank-table tr:nth-child(even) {
  background-color: #f7fafc;
}
</style>



