<script setup lang="ts">
definePageMeta({
  layout: "domains"
})
const route= useRoute();
</script>

<template>
  <div class="main">
    <section class="header">
      <div class="header-title">
        <h1>跟踪AI助手和爬虫的访问</h1>
      </div>
      <div class="header-container">
        <p>了解人工智能如何与您的网站交互，使用流量数据优先优化，并确定影响可见性的问题。</p>
      </div>
    </section>
    <section  class="button-container">
      <el-button type="primary" class="analyse-btn btn" @click="navigateTo(`/domains/${route.params.id}/settings`)">建立分析</el-button>
      <el-button type="default" class="demo-btn btn" @click="navigateTo(`/domains/${route.params.id}/demo`)">查看演示数据</el-button>
    </section>
  </div>
</template>

<style scoped>
/* 主容器：全屏布局，极简黑白风 */
.main {
  min-height: 100vh;
  background: #ffffff; /* 纯白背景 */
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  color: #111; /* 深黑文字 */
  box-sizing: border-box;
}

/* 头部区域 */
.header {
  text-align: center;
  max-width: 800px;
  margin-bottom: 50px;
  animation: fadeInUp 0.6s ease-out;
}

/* 标题样式 */
.header-title h1 {
  font-size: 2.8rem;
  font-weight: 700;
  color: #000; /* 纯黑标题 */
  margin: 0 0 16px 0;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

/* 副标题容器 */
.header-container {
  padding: 0 20px;
}

.header-container p {
  font-size: 1.2rem;
  color: #444; /* 灰黑，降低对比 */
  line-height: 1.7;
  margin: 0;
}

/* 按钮容器 */
.button-container {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

/* 按钮通用样式 */
.btn {
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 分析按钮 - 黑色主按钮 */
.analyse-btn {
  background: #000;
  color: #fff;
  border: none;
}

.analyse-btn:hover {
  background: #222;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.analyse-btn:active {
  transform: translateY(0);
}

/* 演示按钮 - 白色背景 + 黑边框 */
.demo-btn {
  background: #fff;
  color: #000;
  border: 2px solid #000; /* 黑边框 */
}

.demo-btn:hover {
  background: #f8f8f8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.demo-btn:active {
  transform: translateY(0);
}

/* 响应式：小屏幕适配 */
@media (max-width: 600px) {
  .main {
    padding: 40px 16px;
  }

  .header-title h1 {
    font-size: 2.2rem;
  }

  .header-container p {
    font-size: 1.1rem;
  }

  .button-container {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 300px;
  }
}

/* 动画效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 深色模式适配（可选） */
@media (prefers-color-scheme: dark) {
  .main {
    background: #000;
    color: #fff;
  }

  .header-title h1,
  .header-container p {
    color: #fff;
  }

  .demo-btn {
    background: #111;
    color: #fff;
    border-color: #fff;
  }

  .demo-btn:hover {
    background: #333;
  }
}
</style>