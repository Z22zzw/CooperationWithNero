<script setup lang="ts">
import { ref } from 'vue';
import ModalComponent from "~/components/ModalComponent.vue";
import {v4 as uuidv4} from 'uuid';
defineProps<{
  menu: {
    projects: { name: string; id: string }[] | [];
    domains: { name: string; id: string }[] | [];
  };
  profiles: {
    icon?: string;
    name: string;
    email: string;
  };
}>();

const projectName=ref("");
const DomainName=ref("");
const createNewProject = async () => {
  if (!projectName.value.trim()) {
    console.warn('项目名称不能为空')
    return
  }
  const projectId = uuidv4()
  try {
    await $fetch('/api/addProject', {
      method: 'PUT',
      baseURL: `http://121.41.121.90:8080`,
      body: {
        userid: 'admin',
        project: {
          id: projectId,
          name: projectName.value.trim()
        }
      }
    })
    console.log('项目创建成功:', projectId)
    projectName.value = ''
    await refreshNuxtData('dashboard-data')
    await refreshNuxtData('user-menu-data')
    await refreshNuxtData('user-base-data')
  } catch (error: any) {
    console.error('创建项目失败:', error)
  }
}
const createDomain=()=>{
  // Fetcher().withBaseUrl("http://192.68.0.10:8080").put()
}
</script>

<template>
  <nav class="sideBar">
    <!-- 项目 -->
    <div>
      <NuxtLink to="/" class="menuItem">
        <h3><span><i class="fas fa-home"></i></span> 主页</h3>
      </NuxtLink>
    </div>
    <span>你的项目</span>
    <ul>
      <li v-for="item in menu.projects" :key="item.id">
        <NuxtLink :to="`/projects/${item.id}/overview`" class="menuItem">
          {{ item.name }}
        </NuxtLink>
      </li>
      <li>
        <add-new-project-0r-domain title="添加新项目" @submit="createNewProject">
          <template v-slot:trigger="{open}">
          <a href="#" class="add-link" @click="open">+ 添加新项目</a>
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
      </li>
    </ul>
    <!-- 域名 -->
    <span>你的域名</span>
    <ul>
      <li v-for="item in menu.domains" :key="item.id">
        <NuxtLink :to="`/projects/${item.id}/overview`" class="menuItem">
          {{ item.name }}
        </NuxtLink>
      </li>
      <li>
        <add-new-project0r-domain title="添加新域名">
          <template v-slot:trigger="{open}">
            <a href="#" class="add-link" @click="open">+ 添加新域名</a>
          </template>
          <template #body>
            <label class="input-label">域名名</label>
            <el-input
                v-model="projectName"
                placeholder="输入域名名"
                class="custom-input">
            </el-input>
            <label class="input-label">域名地址</label>
            <el-input
                v-model="projectName"
                placeholder="输入域名地址"
                class="custom-input">
            </el-input>
            <div class="hint-text">建议输入2-20个字符的域名名称</div>
          </template>
        </add-new-project0r-domain>
      </li>
    </ul>

    <!-- 底部功能区 -->
    <div class="bottom-section">
      <ul>
        <li>
          <chat>
            <template v-slot:trigger="{ open }">
              <a href="#" class="menuItem" @click="open">
                <i class="fas fa-question-circle icon"></i>
                <span>获取帮助</span>
              </a>
            </template>
          </chat>
        </li>
        <li>
          <a href="#" class="menuItem">
            <i class="fas fa-cog icon"></i>
            <span>设置</span>
          </a>
        </li>
        <li class="profile-card">
          <img
              v-if="profiles?.icon"
              :src="profiles.icon"
              :alt="profiles.name"
              class="avatar-img"
          />
          <i v-else class="fas fa-user-circle avatar-icon"></i>
          <div class="profile-info">
            <span class="name">{{ profiles.name }}</span>
            <span class="email">{{ profiles.email }}</span>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
/* 侧边导航栏容器 */
.sideBar {
  width: 260px;
  height: 100dvh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #e2e8f0 #f7fafc;
}

.sideBar::-webkit-scrollbar {
  width: 6px;
}

.sideBar::-webkit-scrollbar-track {
  background: #f7fafc;
  border-radius: 3px;
}

.sideBar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 3px;
}

.sideBar::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

.sideBar > span {
  font-size: 12px;
  font-weight: 600;
  color: #718096;
  padding: 20px 24px 10px 24px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sideBar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sideBar li {
  position: relative;
}

.menuItem {
  display: block;
  padding: 11px 24px;
  text-decoration: none;
  color: #2d3748;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s ease;
  position: relative;
  align-items: center;
}
.menuItem:hover {
  background-color: #f8fafc;
  color: #1a73e8;
}

.add-link {
  display: block;
  padding: 11px 24px;
  color: #4a7fd4;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.15s ease;
  align-items: center;
}

.add-link:hover {
  color: #1a56db;
  background-color: #f5f9ff;
}

.bottom-section {
  margin-top: auto;
  border-top: 1px solid #eef2f7;
  padding-bottom: 30px;
}

.bottom-section li {
  margin-bottom: 4px;
}

.bottom-section .menuItem {
  color: #718096;
}

.bottom-section .menuItem:hover {
  color: #1a73e8;
  background-color: #f8fafc;
}

.icon {
  margin-right: 14px;
  font-size: 16px;
  width: 20px;
  text-align: center;
  color: #a0aec0;
}

.bottom-section .menuItem:hover .icon {
  color: #1a73e8;
}

.profile-card {
  padding: 15px 24px;
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.profile-info {
  margin-left: 12px;
}

.name {
  display: block;
  font-weight: 600;
  color: #1a202c;
  font-size: 14px;
}

.email {
  display: block;
  font-size: 13px;
  color: #718096;
  margin-top: 2px;
}

.avatar-icon {
  font-size: 38px;
  color: #38b2ac;
  background-color: #e6fffa;
  border-radius: 50%;
}

.avatar-img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
}

.menuItem::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 3px;
  background-color: transparent;
  border-radius: 0 3px 3px 0;
}

.menuItem:hover::after {
  background-color: #1a73e8;
}
.project-form-group {
  margin-bottom: 24px;
}

.input-label {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.label-text {
  font-size: 14px;
}

.required-indicator {
  margin-left: 4px;
  color: #ff4d4f;
}

.custom-input {
  width: 100%;
}

.custom-input :deep(.el-input__inner) {
  height: 40px;
  border-radius: 6px;
  padding-left: 36px;
}

.custom-input :deep(.el-icon-folder-opened) {
  color: #909399;
  font-size: 16px;
}

.hint-text {
  margin-top: 6px;
  font-size: 12px;
  color: #999;
}
</style>

<!-- 全局样式确保弹窗在最上层 -->
<style>
.chat-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
}
</style>
