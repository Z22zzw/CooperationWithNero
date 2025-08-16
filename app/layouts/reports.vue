<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ProjectDetails } from "@/interface/ProjectDetails"
import {type card} from "~/pages/index.vue";
const route = useRoute();
const router = useRouter();
const { data, pending, error, refresh } = await useFetch<{
  menu:{
    projects:card[],
    domains:{
      id:string,
      name:string
    }[]
  },
  profiles:{
    icon?:string,
    name:string,
    email:string
  }
}>('/api/base', {
  method: 'POST',
  body: {
    userid: 'admin'
  },
  key: 'user-base-data' // 用于缓存和刷新
})

// 响应式数据绑定
const menu = computed(() => data.value?.menu || { projects: [], domains: [] })
const profiles = computed(() => data.value?.profiles || { name: '', email: '' })

// 获取项目数据
interface Option {
  name: string
  value: string
}
// 使用 useFetch 获取项目数据（支持 SSR）
const {
  data: projectData,
  pending: isLoading,
  error: fetchError,
  refresh: refreshProject
}= await useFetch<ProjectDetails>(
    () => `/api/projectDetails?projectId=${route.params.id}`,
    {
      key: `project-details-${route.params.id}`,
      watch: [() => route.params.id],
      timeout: 10000,
      retry: 2
    }
)
// 响应式数据（自动更新）
const demoProject = computed(() => projectData.value || null)

// 定义导航标签数据
const computedTabs = computed(() => {
  const projectId = demoProject.value?.id;
  return [
    { key: 'overview', label: '概述', url: `/projects/${projectId}/overview` },
    { key: 'report', label: '报告', url: `/projects/${projectId}/report` },
    { key: 'issue', label: '问题', url: `/projects/${projectId}/questions` },
  ];
});
// 简化isActive函数
const isActive = (url: string) => {
  // 获取当前路由路径
  const currentPath = route.path;
  // 构造问题页面的基础路径 (不含子路由)
  const questionsBasePath = `/projects/${route.params.id}/questions`;
  // 特殊处理问题页面的路径：匹配自身及所有子路径
  if (url === questionsBasePath) {
    return currentPath === url || currentPath.startsWith(`${url}/`);
  }
  // 其他菜单（如答案页）保持精确匹配
  return currentPath === url;
};
// 使用router.push进行导航
const id=ref(useRoute().params.id);
const handleTabClick = (url: string) => {
  router.push(url);
};

const deleteProject = async () => {
  const projectId = route.params.id as string
  try {
    await $fetch('/api/deleteProject', {
      method: 'DELETE',
      body: {
        projectId: projectId
      }
    })
    console.log('项目删除成功:', projectId)
    await navigateTo('/', { replace: true })
    await nextTick()
    await refreshNuxtData('user-menu-data')
  } catch (error: any) {
    console.error('删除失败:', error)
  }
}
</script>

<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <SideBar :menu="menu" :profiles="profiles"/>
    <!-- 主内容区 -->
    <div class="main-content">
      <div class="main-header">
        <h2 class="project-title">{{ demoProject?.name }}</h2>
        <div class="header-actions">
          <button class="action-btn share-btn" style="background-color: #dc0404" @click="deleteProject">
            <i class="fas fa-trash"></i> 删除项目
          </button>
        </div>
      </div>

      <div class="main-header-row">
        <a
            v-for="tab in computedTabs"
            :key="tab.key"
            :href="tab.url"
            class="nav-link"
            :class="{ active: isActive(tab.url) }"
            @click.prevent="handleTabClick(tab.url)"
        >
          {{ tab.label }}
        </a>
      </div>

      <div class="main">
        <div class="sidebar">
          <ul>
            <li class="sidebar-title">能见度</li>
            <li class="sidebar-item">
              <a
                  :href="`/projects/${id}/report`"
                  class="nav-link"
                  :class="{ active: isActive(`/projects/${id}/report`) }"
                  @click.prevent="handleTabClick(`/projects/${id}/report`)"
              >
                提到
              </a>
            </li>
            <li class="sidebar-item">
              <a
                  :href="`/projects/${id}/report/visibility-platforms`"
                  class="nav-link"
                  :class="{ active: isActive(`/projects/${id}/report/visibility-platforms`) }"
                  @click.prevent="handleTabClick(`/projects/${id}/report/visibility-platforms`)"
              >
                平台
              </a>
            </li>
            <li class="sidebar-item">
              <a
                  :href="`/projects/${id}/report/voice-occupation`"
                  class="nav-link"
                  :class="{ active: isActive(`/projects/${id}/report/voice-occupation`) }"
                  @click.prevent="handleTabClick(`/projects/${id}/report/voice-occupation`)"
              >
                声音份额
              </a>
            </li>
            <li class="sidebar-item">
              <a
                  :href="`/projects/${id}/report/area`"
                  class="nav-link"
                  :class="{ active: isActive(`/projects/${id}/report/area`) }"
                  @click.prevent="handleTabClick(`/projects/${id}/report/area`)"
              >
              地区
              </a>
            </li>
            <li class="sidebar-title">引文</li>
            <li class="sidebar-item">
              <a
                  :href="`/projects/${id}/report/area`"
                  class="nav-link"
                  :class="{ active: isActive(`/projects/${id}/report/hot-domain`) }"
                  @click.prevent="handleTabClick(`/projects/${id}/report/hot-domain`)"
              >
                热门域名
              </a>
            </li>
            <li class="sidebar-item">
              <a
                  :href="`/projects/${id}/report/main-index`"
                  class="nav-link"
                  :class="{ active: isActive(`/projects/${id}/report/main-index`) }"
                  @click.prevent="handleTabClick(`/projects/${id}/report/main-index`)"
              >
                首页
              </a>
            </li>
            <li class="sidebar-title">问题</li>
            <li class="sidebar-item">
              <a
                  :href="`/projects/${id}/report/search-request`"
                  class="nav-link"
                  :class="{ active: isActive(`/projects/${id}/report/search-request`) }"
                  @click.prevent="handleTabClick(`/projects/${id}/report/search-request`)"
              >
                搜索需求
              </a>
            </li>
          </ul>
        </div>
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 基础样式重置 */
.layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 40px;
  background-color: #f5f7f9;
  margin-left: 260px;
}

/* 主标题区域美化 */
.main-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e1e5e9;
}

.project-title {
  font-size: 28px;
  font-weight: 600;
  color: #1a1d21;
  margin: 0;
  line-height: 1.2;
}

/* 操作按钮 */
.header-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 36px;
}

.edit-btn {
  background-color: #f0f2f5;
  color: #4a4e53;
}

.edit-btn:hover {
  background-color: #e1e5e9;
  transform: translateY(-1px);
}

.share-btn {
  background-color: #5470c6;
  color: white;
}

.share-btn:hover {
  background-color: #435ca1;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(84, 112, 198, 0.2);
}

/* 导航行美化 */
.main-header-row {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  border-bottom: 1px solid #e1e5e9;
  padding-bottom: 12px;
}

.nav-link {
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  padding: 8px 0;
  position: relative;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #333;
}

.nav-link.active {
  color: #5470c6;
  font-weight: 600;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #5470c6;
  border-radius: 3px;
}

.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  padding: 1.5rem 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 标题样式 */
.sidebar-title {
  padding: 1rem 1.5rem 0.5rem;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  font-weight: 600;
  color: #555;
  margin-top: 1rem;
}

/* 分隔线 */
.sidebar-title:not(:first-child) {
  border-top: 1px solid #f0f0f0;
  padding-top: 1.5rem;
}

/* 菜单项样式 */
.sidebar-item {
  padding: 0.65rem 1.5rem;
  transition: background-color 0.25s ease;
}

.sidebar-item:hover {
  background-color: #f7f7f7;
}

.sidebar-item a {
  display: block;
  position: relative;
  font-size: 1rem;
  color: #333;
}

/* 激活状态 */
.sidebar-item .active {
  color: #000;
  font-weight: 500;
}

.sidebar-item .active::before {
  content: '';
  position: absolute;
  left: -1.5rem;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #000;
}

/* 悬动效果 */
.sidebar-item a:hover {
  color: #111;
}

.main {
  display: flex;
  flex-direction: row;
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    padding: 20px;
  }

  .main-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .header-actions {
    width:100%;
    justify-content: flex-end;
  }

  .main-header-row {
    gap: 20px;
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 8px;
    margin-bottom: 24px;
  }
}
</style>



