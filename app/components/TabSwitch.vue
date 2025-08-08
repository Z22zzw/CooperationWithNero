<template>
  <div class="compact-tab-switcher">
    <div class="compact-tabs">
      <button
          v-for="item in tabs"
          :key="item.name"
          :class="['compact-tab-button', { active: isActive(item) }]"
          @click="navigateTo(item.url)"
      >
        <span class="button-text">{{ item.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const tabs = [
  { name: '问题', url: `/projects/${route.params.id}/questions` },
  { name: '答案', url: `/projects/${route.params.id}/questions/answers` },
];

const isActive = (tab: { url: string }) => {
  return route.path === tab.url;
};

</script>

<style scoped>
.compact-tab-switcher {
  display: inline-flex; /* 减少外部空间 */
  padding: 12px 8px; /* 减小外部填充 */
  background-color: #f8f9fa;
  border-radius: 10px; /* 更小的圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* 更轻的阴影 */
}

.compact-tabs {
  display: flex;
  background-color: white;
  border-radius: 40px; /* 保持圆润 */
  padding: 4px; /* 减少内部填充 */
  gap: 6px; /* 减小按钮间距 */
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05); /* 更轻的内部阴影 */
}

.compact-tab-button {
  position: relative;
  flex: 1;
  padding: 7px 12px; /* 减小按钮尺寸 */
  border: none;
  background-color: transparent;
  color: #666;
  font-size: 13px; /* 减小字体大小 */
  font-weight: 500;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* 更快的动画 */
  text-align: center;
  z-index: 1;
  overflow: hidden;
  min-width: 60px; /* 最小宽度 */
}

.compact-tab-button:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: transparent;
  z-index: -1;
  transition: width 0.25s ease;
}

.compact-tab-button:hover {
  color: #444;
}

.compact-tab-button:hover:before {
  width: 100%;
  background-color: #f0f0f0;
}

.button-text {
  position: relative;
  transition: transform 0.25s ease;
  display: inline-block; /* 确保动画效果 */
  transform: scale(0.95); /* 减小文本尺寸 */
}

.compact-tab-button.active .button-text {
  color: #ffffff;
  transform: scale(1); /* 激活时稍微放大 */
}

.compact-tab-button.active:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #007aff;
  border-radius: 40px;
  z-index: -1;
}

/* 激活动画效果优化 */
.compact-tab-button.active {
  animation: buttonSelectCompact 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  box-shadow: 0 1px 4px rgba(0, 122, 255, 0.25); /* 更轻的激活阴影 */
}

@keyframes buttonSelectCompact {
  0% {
    transform: scale(0.98);
    box-shadow: 0 0 0 rgba(0, 122, 255, 0);
  }
  50% {
    transform: scale(1.03); /* 更小的放大效果 */
    box-shadow: 0 2px 6px rgba(0, 122, 255, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 1px 4px rgba(0, 122, 255, 0.25);
  }
}

/* 响应式优化 - 更小的移动设备 */
@media (max-width: 480px) {
  .compact-tab-switcher {
    padding: 8px 6px;
    border-radius: 8px;
  }

  .compact-tab-button {
    padding: 6px 10px;
    font-size: 12px;
    min-width: 55px;
    border-radius: 35px;
  }

  .button-text {
    transform: scale(0.9);
  }
}
</style>
