<template>
  <div class="tab-switcher">
    <div class="tabs">
      <button
          v-for="item in tabs"
          :key="item.name"
          :class="['tab-button', { active: isActive(item) }]"
          @click="() => {
          currentTab = item.name;
          navigateTo(item.url);
        }"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, navigateTo } from '#app';

// 定义标签
const tabs = [
  { name: '问题', url: '/questions' },
  { name: '答案', url: '/questions/answers' },
];

// 获取当前路由
const route = useRoute();
const isActive = (data: {name:string, url:string}
) => {
  return route.path === data.url;
};
</script>

<style scoped>
/* 保持你的 CSS 不变 */
.tab-switcher {
  display: flex;
  justify-content: center;
  padding: 20px 10px;
  background-color: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  max-width: 400px;
  margin: 0 auto;
}

.tabs {
  display: flex;
  background-color: white;
  border-radius: 50px;
  padding: 6px;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 320px;
}

.tab-button {
  flex: 1;
  padding: 10px 16px;
  border: none;
  background-color: transparent;
  color: #666;
  font-size: 15px;
  font-weight: 500;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.tab-button:hover {
  color: #444;
  background-color: #f0f0f0;
}

.tab-button.active {
  color: #ffffff;
  background-color: #007aff;
  box-shadow: 0 2px 6px rgba(0, 122, 255, 0.3);
  transform: translateY(-1px);
}

.tab-button:active {
  transform: translateY(0);
}

@media (max-width: 480px) {
  .tab-switcher {
    padding: 16px;
  }
  .tab-button {
    padding: 9px 14px;
    font-size: 14px;
  }
}
</style>