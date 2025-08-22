<template>
  <div class="dashboard-container">
    <!-- Top Section -->
    <div class="top-section">
      <div class="panel left-panel">
        <h3>总推荐</h3>
        <h1>1,131</h1>
      </div>
      <div class="panel right-panel">
        <h3>推荐的份额</h3>
        <h1>14.14%</h1>
      </div>
    </div>

    <!-- Line Chart -->
    <div class="chart-container">
      <line-chart :data="chartData" :options="chartOptions" />
    </div>
    <div class="tables">
      <div class="table-row">
        <!-- Referrals by AI Platform -->
        <div class="panel referrals-by-platform">
          <h3>人工智能平台推荐</h3>
          <table>
            <thead>
            <tr>
              <th>平台</th>
              <th>访问</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in aiPlatforms" :key="index">
              <td>{{ item.platform }}</td>
              <td>{{ item.visits }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- Share of All Traffic -->
        <div class="panel share-of-traffic">
          <h3>所有流量的份额</h3>
          <table>
            <thead>
            <tr>
              <th>类别</th>
              <th>访问</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in trafficCategories" :key="index">
              <td>{{ item.category }}</td>
              <td>{{ item.visits }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="table-row">
        <!-- Referrals by Country -->
        <div class="panel referrals-by-country">
          <h3>按国家划分的推荐</h3>
          <table>
            <thead>
            <tr>
              <th>国家</th>
              <th>访问</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in countries" :key="index">
              <td>{{ item.country }}</td>
              <td>{{ item.visits }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!-- Referrals by Operating System -->
        <div class="panel referrals-by-os">
          <h3>按操作系统划分的推荐</h3>
          <table>
            <thead>
            <tr>
              <th>操作系统</th>
              <th>访问</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in operatingSystems" :key="index">
              <td>{{ item.os }}</td>
              <td>{{ item.visits }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale } from 'chart.js'
import { useAsyncData } from '#app'

definePageMeta({
  layout: 'domains',
})

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale)

// 示例数据（可替换为真实 API 数据）
const chartData = {
  labels: ['Aug 14', 'Aug 15', 'Aug 16', 'Aug 17', 'Aug 18', 'Aug 19', 'Aug 20', 'Aug 21'],
  datasets: [
    {
      label: 'Total referrals',
      data: [160, 162, 160, 158, 157, 301, 333, 162],
      backgroundColor: 'rgba(54, 162, 235, 0.1)',
      borderColor: '#3b82f6',
      borderWidth: 2,
      tension: 0.3, // 曲线更平滑
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
    },
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
    },
  },
}

const aiPlatforms = [
  { platform: 'ByteDance', visits: 333 },
  { platform: 'Gemini 双子座', visits: 162 },
  { platform: 'Claude 克劳德', visits: 160 },
  { platform: 'ChatGPT', visits: 158 },
  { platform: 'You.com', visits: 158 },
  { platform: 'Perplexity 困惑', visits: 157 },
]

const trafficCategories = [
  { category: 'AI agent traffic 人工智能代理流量', visits: 3358 },
  { category: 'Direct traffic 直接交通', visits: 2212 },
  { category: 'Other bot traffic 其他机器人流量', visits: 1296 },
  { category: 'AI platform referrals 人工智能平台推荐', visits: 1131 },
]

const countries = [
  { country: 'Australia 澳大利亚', visits: 40 },
  { country: 'Canada 加拿大', visits: 38 },
  { country: 'France 法国', visits: 14 },
  { country: 'United Kingdom 联合王国', visits: 13 },
  { country: 'Italy 意大利', visits: 12 },
  { country: 'India 印度', visits: 12 },
  { country: 'Japan 日本', visits: 12 },
]

const operatingSystems = [
  { os: 'Windows 窗户', visits: 1202 },
  { os: 'iOS', visits: 1201 },
  { os: 'macOS 操作系统', visits: 1014 },
  { os: 'Android 安卓', visits: 783 },
  { os: 'Other 其他', visits: 352 },
  { os: 'ChromeOS', visits: 86 },
]
</script>
<style scoped>
.dashboard-container {
  max-width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  background-color: #f9fafb;
  font-size: 0.9rem; /* 整体字体略小 */
}

/* 顶部统计卡片 */
.top-section {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}
.tables {
  display: flex;
  flex-direction: column;
  gap: 16px; /* 行间距 */
}

.table-row {
  display: flex;
  gap: 16px; /* 面板间间距 */
}
.panel {
  flex: 1;
  min-width: 40%;
  background: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.panel:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

/* 左侧面板：总推荐 */
.left-panel {
  flex: 1;
  background: black;
  color: white;
}
.left-panel h3{
  color: white;
  margin: 4px 0;
  font-size: 1rem;
}
.left-panel p{
  color: white;
  margin: 4px 0;
  font-size: 0.85rem;
  opacity: 0.9;
}
.left-panel h1 {
  color: white;
  margin: 4px 0;
  font-size: 2rem;
  font-weight: 700;
}


/* 右侧面板：份额 */
.right-panel {
  flex: 1;
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
}

.right-panel h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #0369a1;
  margin: 4px 0;
}

.right-panel h3 {
  font-size: 1rem;
  margin: 4px 0;
}

.right-panel p {
  font-size: 0.85rem;
  margin: 4px 0;
  opacity: 0.9;
}

/* 图表容器 */
.chart-container {
  height: 240px;
  background: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
}

/* 所有 panel 的标题统一控制 */

/* 表格样式 - 优化对齐与视觉平衡 */
.panel table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto; /* 自然列宽分配 */
  margin-top: 8px;
}

.panel th,
.panel td {
  padding: 10px 14px; /* 增加呼吸感 */
  border-bottom: 1px solid #e2e8f0;
  color: #475569;
  font-size: 0.875rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 表头样式 */
.panel th {
  background-color: #f1f5f9;
  color: #1e293b;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: left;
  padding: 10px 14px;
  border-bottom: 1px solid #cbd5e1;
}

/* 第二列（访问量）：右对齐 + 视觉强调 */
.panel td:nth-child(2),
.panel th:nth-child(2) {
  text-align: right;
  font-weight: 500;
  color: #0f766e; /* 青绿色，突出数据 */
  font-feature-settings: 'tnum'; /* 等宽数字（如支持） */
  white-space: nowrap;
}

/* 悬停效果 */
.panel tbody tr:hover {
  background-color: #f8fafc;
  transition: background-color 0.1s ease;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .top-section {
    flex-direction: column;
  }

  .dashboard-container {
    padding: 12px;
  }

  .panel {
    padding: 12px;
  }

  .chart-container {
    height: 200px;
  }

  .panel h3 {
    font-size: 1rem;
  }

  .panel th,
  .panel td {
    padding: 8px 10px;
    font-size: 0.825rem;
  }

  /* 小屏下可选：让数字列不那么靠右 */
  .panel td:nth-child(2),
  .panel th:nth-child(2) {
    text-align: right;
    padding-right: 0;
  }
}
</style>