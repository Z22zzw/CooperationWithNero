<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'
defineProps<{
  menu: Record<string, Array<string>>
}>()

// 用于保存每个菜单项是否展开的状态
const openMenus = ref<Set<string>>(new Set())
// 切换菜单展开/收起
const toggleMenu = (header: string) => {
  if (openMenus.value.has(header)) {
    openMenus.value.delete(header)
  } else {
    openMenus.value.add(header)
  }
}
const emit = defineEmits(['navigate'])
const handleClick = (componentName:string) => {
  emit('navigate', componentName)
}
</script>


<template>
  <div class="menu">
    <div v-for="(subMenu, header) in menu" :key="header" class="menu-item">
      <a v-if="subMenu.length>0" class="menu-header" @click="toggleMenu(header)">
        {{ header }}
        <span class="arrow">{{ openMenus.has(header) ? '▼' : '▶' }}</span>
      </a>
      <a v-else class="menu-header" @click="handleClick(header)">
        {{ header }}
      </a>
      <ul v-show="openMenus.has(header)" v-if="subMenu.length > 0" class="submenu">
        <li v-for="(item, index) in subMenu" :key="index">
          <a @click="handleClick(item)">{{ item }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.menu {
  padding: 0;
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
  height: 100%;
  font-family: Arial, sans-serif;
}

.menu-item {
  margin-bottom: 0.5rem;
}

.menu-header {
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1rem;
  color: #333;
  background-color: #eee;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.menu-header:hover {
  background-color: #e0e0e0;
}

.arrow {
  font-size: 0.8em;
  transition: transform 0.2s ease;
}

.menu-header:hover .arrow {
  transform: scale(1.1);
}

.submenu {
  list-style: none;
  padding-left: 20px;
  margin-top: 0.3rem;
}

.submenu li {
  margin: 0.2rem 0;
}

.submenu li a {
  display: block;
  padding: 0.4rem 0.8rem;
  color: #555;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.submenu li a:hover {
  background-color: #f0f0f0;
  color: #0078d4;
}
</style>