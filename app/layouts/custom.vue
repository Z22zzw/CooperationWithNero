<script setup lang="ts">
// menu:{
//   projects:{name:string,url:string}[],
//       domains:{name:string,url:string}[]
// }
import {useRoute} from "#app";

const isDomain=ref(false);
onMounted(()=>{
  isDomain.value=route.path.startsWith("/domain")
})
const isReferral = ref(false);
onMounted(()=>{
  isReferral.value=route.path.startsWith("/referral")
})
const isProblem = ref(false);
onMounted(()=>{
  isProblem.value = route.path.startsWith("/problem")
})

if(isReferral||isProblem){
  isDomain.value = true;
}
const menu={
  projects:[
    {
      name:"first",
      url:"#",
    },
    {
      name:"second",
      url:"#",
    },
  ],
  domains:[
      {
    name: "当夏科技",
    url: "#",
  },

  ]
}
const profiles ={
  name:"nero",
  email:"123@qq.com"
}
import {type ProjectDetails} from "@/interface/ProjectDetails"
import {onMounted} from "vue";
// const details=ref<ProjectDetails>();
// onMounted(async () => {
//   const response=await fetch("#")
//   details.value=await response.json()
// })
const demoProject: ProjectDetails = {
  name: "智能云计算平台",
  totalUp: 158246,
  totalCite: 12657,
  mention: [
    {
      name: "技术博客",
      visibility: 35842,
      change: 12.5
    },
    {
      name: "社交媒体",
      visibility: 45628,
      change: 8.3
    },
    {
      name: "行业报告",
      visibility: 42173,
      change: -4.2
    },
    {
      name: "新闻门户",
      visibility: 34603,
      change: 15.1
    }
  ],
  regional_division: [{
    name: "亚太区",
    visibility: 74563,
    change: 9.6
  }],
  platform_division: [
    {
      name: "Web",
      visibility: 61254,
      change: 5.7
    },
    {
      name: "Android",
      visibility: 47532,
      change: 14.3
    },
    {
      name: "iOS",
      visibility: 34182,
      change: 10.8
    },
    {
      name: "API",
      visibility: 15278,
      change: -2.4
    }
  ],
  change_line: [
    { x: "2023-09-01", y: 12541 },
    { x: "2023-09-02", y: 12638 },
    { x: "2023-09-03", y: 11895 },
    { x: "2023-09-04", y: 12987 },
    { x: "2023-09-05", y: 13524 },
    { x: "2023-09-06", y: 14215 },
    { x: "2023-09-07", y: 15208 }
  ]
};
import { ref } from 'vue'

// 定义导航标签数据
const tabs = [
  { key: 'overview', label: '概述',url:"/overview" },
  { key: 'report', label: '报告',url:"/report" },
  { key: 'issue', label: '问题' ,url:"/questions" },
]

const domainTabs = [
  {key: 'domain', label:'问题',url:"/domain"},
  {key: 'referral',label:'转介',url:"/referral"},
  {key: 'proxy',label:'代理活动',url:"/proxy"}
]
const route = useRoute();
const isActive = (data: {name:string, label:string,url:string}
) => {
  return route.path === data.url;
};

const handleTabClick = (key: {key:string,label:string,url:string}) => {
  navigateTo(key.url)
}
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

      <div class="main-header-row" v-if="!isDomain">
        <a
            v-for="tab in tabs"
            :key="tab.key"
            :href="tab.url"
            class="nav-link"
            :class="{ active: isActive(tab) }"
            @click.prevent="handleTabClick(tab)"
        >
          {{ tab.label }}
        </a>
      </div>

      <div class="main-header-row" v-if="isDomain">
        <a
            v-for="tab in domainTabs"
            :key="tab.key"
            :href="tab.url"
            class="nav-link"
            :class="{ active: isActive(tab) }"
            @click.prevent="handleTabClick(tab)"
        >
          {{ tab.label }}
        </a>
      </div>
      <div class="main">
        <NuxtPage />
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
.layout{
  position: fixed;
  width:100%;
  height:100%;
}
</style>