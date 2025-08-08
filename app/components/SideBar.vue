<script setup lang="ts">
import {useStore} from "~/stores";
const status = useStore();
defineProps<{
  menu:{
    projects:{name:string,url:string}[],
    domains:{name:string,url:string}[]
  },
  profiles:{
    icon?:string,
    name:string,
    email:string,
  }
}>()

const gotoDomain = () => {
  window.location.href = "/domain";
};
</script>

<template>
  <nav class="sideBar">
    <!-- 项目 -->
    <div>
      <a href="/dashboard" class="menuItem">
        <h3>
          <span>
            <i class="fas fa-home"></i>
          </span>
          dashboard
        </h3>
      </a>
    </div>
    <span>你的项目</span>
    <ul>
      <li v-for="item in menu.projects" :key="item.url">
        <a :href="item.url" class="menuItem">{{ item.name }}</a>
      </li>
      <li>
        <a href="#" class="add-link">+ 添加新项目</a>
      </li>
    </ul>
    <!-- 域名 -->
    <span>你的域名</span>
    <ul>
      <li v-for="item in menu.domains" :key="item.url">
          <a :href="item.url" class="menuItem" @click.prevent="gotoDomain">{{ item.name }}</a>
      </li>
      <li>
        <a href="#" class="add-link">+ 添加新域名</a>
      </li>
    </ul>

    <!-- 底部功能区 -->
    <div class="bottom-section">
      <ul>
        <li>
          <a href="#" class="menuItem"  @click="status.isModalOpened=true ">
            <i class="fas fa-question-circle icon"></i>
            <span>获取帮助</span>
          </a>
        </li>
        <li>
          <a href="#" class="menuItem">
            <i class="fas fa-cog icon"></i>
            <span>设置</span>
          </a>
        </li>
        <li class="profile-card">
          <!-- 使用绿色头像图标 -->
          <i class="fas fa-user-circle avatar-icon"></i>
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
  height: 100dvh; /* 更现代，适配移动端高度变化 */
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 24px 0;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);

  /* 🔥 关键修改：固定定位 */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; /* 确保在最上层 */

  /* 可选：添加滚动，防止内容过多时溢出 */
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #e2e8f0 #f7fafc; /* thumb 和 track 颜色 */
}

/* WebKit 浏览器滚动条样式（可选美化） */
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
/* 分类标题样式 */
.sideBar > span {
  font-size: 12px;
  font-weight: 600;
  color: #718096;
  padding: 20px 24px 10px 24px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* 列表样式 */
.sideBar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sideBar li {
  position: relative;
}

/* 常规菜单项样式 */
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

/* 添加链接样式 */
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

/* 底部功能区样式 */
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

/* 图标样式 */
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

/* 用户信息卡片样式 */
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

/* 头像样式 */
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

/* 状态指示器 */
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
</style>
