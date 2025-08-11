<script setup lang="ts">
// menu:{
//   projects:{name:string,url:string}[],
//       domains:{name:string,url:string}[]
// }
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { ProjectDetails } from "@/interface/ProjectDetails"
import {Fetcher} from "~/composables/fetcher";

const route = useRoute();
const router = useRouter();
const menu = ref<{
  projects: { name: string,id: string }[];
  domains: { name: string,id: string }[];
} >({
  projects:[],
  domains:[]
})
const profiles = ref<{
  icon?: string
  name: string
  email: string
}>({
  name: 'Unknown',
  email: 'unknown@example.com'
})
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
// 在组件挂载后获取数据
onMounted(async () => {
  try {
    const res = await $fetch<{menu: {
        projects: { name: string, id: string }[];
        domains: { name: string, id: string }[];
      },
      profiles: {  icon?:string,name: string, email: string ,};
    }>(`${useRuntimeConfig().public.apiBase}/api/menuDetails`) // 将获取的数据赋值给 ref
    menu.value=res.menu
    profiles.value=res.profiles
    console.log(menu.value)
  } catch (error) {
    console.error('获取菜单数据失败:', error)
  }
})
// 获取项目数据
async function fetchProjectData() {
  try {
    const res = await Fetcher().get<{
      options: {name: string, value: string}[],
      demoProject: ProjectDetails
    }>(`/api/projectDetails/${route.params.id}`)
    options.value = res.options
    demoProject.value = res.demoProject
  } catch (error) {
    console.error("获取项目数据失败:", error)
  }
}

// 初始获取数据
fetchProjectData()

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchProjectData()
  }
})
// 定义导航标签数据
const computedTabs = computed(() => {
  const projectId = demoProject.value.id;
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
const handleTabClick = (url: string) => {
  router.push(url);
};
</script>
<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <SideBar :menu="menu" :profiles="profiles"/>
    <!-- 主内容区 -->
    <div class="main-content">
      <div class="main-header">
        <h2 class="project-title">{{ demoProject.name }}</h2>
        <div class="header-actions">
          <button class="action-btn edit-btn">
            <i class="icon-edit"></i> 编辑
          </button>
          <button class="action-btn share-btn">
            <i class="icon-share"></i> 分享
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
        <slot/>
      </div>
    </div>
  </div>
</template>


<style scoped>
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
    width: 100%;
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