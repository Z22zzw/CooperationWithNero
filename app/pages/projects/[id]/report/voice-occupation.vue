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
      name: '邮件营销',
      data: [0.12, 0.13, 0.11, 0.10, 0.09, 0.08, 0.07],
      color: '#5470c6'
    },
    {
      name: '联盟广告',
      data: [0.18, 0.17, 0.19, 0.18, 0.16, 0.15, 0.14],
      color: '#91cc75'
    },
    {
      name: '视频广告',
      data: [0.20, 0.21, 0.22, 0.23, 0.20, 0.21, 0.22],
      color: '#fac858'
    },
    {
      name: '直接访问',
      data: [0.25, 0.24, 0.23, 0.24, 0.25, 0.26, 0.27],
      color: '#ee6666'
    },
    {
      name: '搜索引擎',
      data: [0.24, 0.23, 0.23, 0.23, 0.28, 0.28, 0.28],
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



