<script setup lang="ts">
import { ref } from 'vue';
import Home from "@/components/Home.vue";
import SideMenu from "@/components/SideMenu.vue";
import About from "@/components/About.vue";
const menu = {
  'Home': [],
  '用户管理': ['用户列表', '角色权限'],
  '产品管理': ['产品列表', '库存管理', '分类管理'],
  '订单': ['订单列表', '退货管理'],
  "About":[]
}
const currentView = ref('Home')

const components: { [key: string]: any } = {
  Home,
  About
}
const handleNavigate = (componentName: string) => {
  currentView.value = componentName
}
</script>


<template>
  <div class="layout">
    <div class="sidebar">
      <SideMenu :menu="menu" @navigate="handleNavigate"/>
    </div>
    <div class="main">
      <component :is="components[currentView]"/>
    </div>
  </div>
</template>


<style scoped>
.layout {
  display: flex;
  height: 100vh; /* 占满整个视口高度 */
}
.sidebar {
  width: 240px; /* 固定左侧菜单宽度 */
  height: 100vh; /* 固定高度，始终占满屏幕 */
  overflow-y: auto; /* 如果菜单太多，允许滚动 */
  box-sizing: border-box; /* 确保 padding 和 border 不会影响总宽度 */
}

.main {
  flex: 1; /* 右侧内容自动填充剩余空间 */
  padding: 20px;
  background-color: #fff;
  overflow-y: auto; /* 内容多时允许滚动 */
}
</style>