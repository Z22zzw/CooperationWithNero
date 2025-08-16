<script setup lang="ts">
import {ref} from "vue";

export interface card {
  id: string,
  name: string,
  issues: number,
  updateTime: string,
  mostVisible: string,
  yourVisibility: string,
  topCitation: string,
  yourCitation: string,
}
const gotoProject=(item:card)=>{
  console.log(item.id)
  navigateTo(`/projects/${item.id}/overview`)
}
const cards =ref<card[]>([])
definePageMeta({
  layout: 'default'
})
const { data, pending, error, refresh } = await useFetch<{
  menu: {
    projects: card[]
    domains: { id: string; name: string }[]
  }
  profiles: {
    icon?: string
    name: string
    email: string
  }
}>('/api/base', {
  method: 'POST',
  body: { userid: 'admin' },
  key: 'dashboard-data'
})

watch(
    () => data.value,
    (newData) => {
      if (newData) {
        cards.value = newData.menu.projects
      }
    },
    { immediate: true } // 立即执行一次
)
import {v4 as uuidv4} from "uuid";
const projectName=ref("");
const createNewProject=async ()=>{
  try {
    const response = await $fetch('/api/addProject', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        userid: 'admin',
        project: {
          id: uuidv4(),
          name: projectName.value
        }
      }
    })
    console.log('创建成功:', response)
    await refreshNuxtData('dashboard-data')
    await refreshNuxtData('user-menu-data')
  } catch (error) {
    console.error('创建失败:', error)
  }
}
</script>

<template>
  <div class="page-container">
    <div class="PageShow">
      <h1>主页</h1>
    </div>

    <div class="main">
      <div class="header-row">
        <h2>你的项目</h2>
        <add-new-project-0r-domain title="添加新项目" @submit="createNewProject">
          <template v-slot:trigger="{open}">
            <a href="#" class="add-project"  @click="open">
              <i class="fas fa-plus add-icon"/>
              添加新项目
            </a>
          </template>
          <template #body>
            <label class="input-label">项目名</label>
            <el-input
                v-model="projectName"
                placeholder="输入项目名"
                class="custom-input">
            </el-input>
            <div class="hint-text">建议输入2-20个字符的项目名称</div>
          </template>
        </add-new-project-0r-domain>
      </div>
      <div class="projectContainer">
        <div  @click="gotoProject(card)"
            v-for="card in cards"
            :key="card.name"
            class="projectCard"
        >
          <!-- 项目名 + 问题数 -->
          <div class="card-header">
            <h3 class="project-name">{{ card.name }}</h3>
            <span class="issue-badge" :class="{ 'high': card.issues > 10, 'medium': card.issues > 5 }">
              {{ card.issues }} 个问题
            </span>
          </div>

          <!-- 更新时间 -->
          <p class="update-time">更新于：{{ card.updateTime }}</p>

          <!-- 指标行 -->
          <div class="metrics">
            <div class="metric">
              <label>最高可见性</label>
              <span>{{ card.mostVisible }}</span>
            </div>
            <div class="metric">
              <label>你的可见性</label>
              <span class="highlight">{{ card.yourVisibility }}</span>
            </div>
          </div>

          <div class="metrics">
            <div class="metric">
              <label>最常引用</label>
              <span>{{ card.topCitation }}</span>
            </div>
            <div class="metric">
              <label>你的引用</label>
              <span class="highlight">{{ card.yourCitation }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-project {
  display: inline-flex;
  align-items: center;
  gap: 8px; /* 图标和文字间距 */

  font-size: 16px;
  font-weight: 500;
  color: #1a73e8;

  margin: 0;
  padding: 10px 16px; /* 增加点击区域 */

  background-color: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 8px;

  cursor: pointer;
  text-decoration: none;

  transition: all 0.2s ease;
}

.add-project:hover {
  color: #1557b0;
  background-color: #ebf5ff;
  border-color: #1a73e8;

  /* 图标轻微上浮 */
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(26, 115, 232, 0.1);
}

.add-icon {
  font-size: 14px;
  transition: transform 0.2s ease;
}

.add-project:hover .add-icon {
  transform: scale(1.2); /* 悬停时图标放大 */
}
.header-row {
  display: flex;
  justify-content: space-between; /* 左右分开 */
  align-items: center;           /* 垂直居中 */
  margin: 32px 0 16px 0;
}
.page-container {
  padding: 24px;
  background-color: #f9fafb;
  min-height: 100vh;
  font-family: 'Segoe UI', system-ui, sans-serif;
  color: #1f2937;
}

.PageShow h1 {
  font-size: 28px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 24px;
}

.main h2 {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 32px 0 16px 0;
}

.projectContainer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 12px;
}

.projectCard {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
}

.projectCard:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* 卡片头部：项目名 + 问题数 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.project-name {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.issue-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  background-color: #fee2e2;
  color: #86959e;
}

.issue-badge.medium {
  background-color: #fef3c7;
  color: #92400e;
}

.issue-badge.high {
  background-color: #fecaca;
  color: #b91c1c;
}

.update-time {
  font-size: 13px;
  color: #6b7280;
  margin: 0 0 16px 0;
}

/* 指标区域 */
.metrics {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 8px;
}

.metric {
  flex: 1;
}

.metric label {
  display: block;
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.metric span {
  color: #374151;
  font-weight: 500;
}

.metric .highlight {
  color: #1a73e8;
  font-weight: 600;
}
</style>