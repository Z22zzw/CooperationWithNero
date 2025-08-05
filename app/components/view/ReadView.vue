<template>
  <div class="reading-window">
    <!-- 返回按钮 -->
    <div class="back-button-container">
      <button class="back-button" @click="handleBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"></path>
        </svg>
        返回
      </button>
    </div>
    <!-- 阅读内容区域 -->
    <div class="reading-content">
      <div align="center"><article class="content-wrapper" v-html="section"></article></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from 'vue';

// 定义组件属性
const props = defineProps({
  // 传入的段落HTML内容
  section: {
    type: String,
    required: true
  }
});

// 定义事件
const emit = defineEmits(['back']);

// 处理返回事件
const handleBack = () => {
  emit('back');
};
</script>

<style scoped>
.reading-window {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
}

.back-button-container {
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #4a6fa5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(74, 111, 165, 0.2);
}

.back-button:hover {
  background: #3a5a80;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(74, 111, 165, 0.3);
}

.back-button:active {
  transform: translateY(0);
}

.reading-content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
}

.content-wrapper {
  max-width: 700px;
  width: 100%;
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  line-height: 1.8;
  color: #333;
}

.content-wrapper h1, .content-wrapper h2, .content-wrapper h3 {
  color: #2c3e50;
  margin: 1.5rem 0 1rem;
  line-height: 1.3;
}

.content-wrapper h1 {
  font-size: 2.2rem;
  border-bottom: 3px solid #4a6fa5;
  padding-bottom: 0.5rem;
}

.content-wrapper h2 {
  font-size: 1.8rem;
  border-left: 4px solid #4a6fa5;
  padding-left: 1rem;
}

.content-wrapper h3 {
  font-size: 1.4rem;
}

.content-wrapper p {
  margin-bottom: 1.2rem;
  text-align: justify;
}

.content-wrapper img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1.5rem 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.content-wrapper blockquote {
  border-left: 5px solid #4a6fa5;
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  background-color: #f8f9fa;
  font-style: italic;
  color: #555;
}

.content-wrapper a {
  color: #4a6fa5;
  text-decoration: none;
  border-bottom: 1px dotted #4a6fa5;
  transition: all 0.3s;
}

.content-wrapper a:hover {
  color: #3a5a80;
  border-bottom: 1px solid #3a5a80;
}

.reading-footer {
  padding: 1rem;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.page-info {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

/* 滚动条样式 */
.content-wrapper::-webkit-scrollbar {
  width: 8px;
}

.content-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.content-wrapper::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  border-radius: 4px;
}

.content-wrapper::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .reading-content {
    padding: 1rem;
  }

  .content-wrapper {
    padding: 1.5rem;
    margin: 0 0.5rem;
  }

  .content-wrapper h1 {
    font-size: 1.8rem;
  }

  .content-wrapper h2 {
    font-size: 1.5rem;
  }
}
</style>