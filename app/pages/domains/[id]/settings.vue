<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
  layout: "domains"
})

const currentTab = ref("analyse")
const tabs = ref([
  { name: '建立分析', value: "analyse" },
  { name: "删除域名", value: "deleteDomain" },
])
</script>

<template>
  <div class="container">
    <!-- 侧边栏 -->
    <div class="side-bar-section">
      <ul class="bar-list">
        <li
            v-for="tab in tabs"
            :key="tab.value"
            @click="currentTab = tab.value"
            :class="{ active: currentTab === tab.value }"
        >
          <a class="bar">{{ tab.name }}</a>
        </li>
      </ul>
    </div>

    <!-- 主内容区 -->
    <div class="main-show">
      <div class="deleteDomain-box" v-if="currentTab === 'deleteDomain'">
        <div class="content-box">
          <h2>删除域名</h2>
          <p>这将从您的帐户中删除该域。任何已配置的分析集成也将被永久删除。</p>
          <button class="remove-button button">删除域名</button>
        </div>
      </div>
      <div class="analyse-box" v-if="currentTab === 'analyse'">
        <div class="content-box">
          <h2>建立分析</h2>
          <p>要在平台内查看推荐和代理活动数据，您需要设置我们的分析集成。</p>
          <p>你需要实现一些服务器端代码转发请求到您的网站到我们的API，使他们可以处理，分析，并在大厅内可视化。</p>
          <p>要开始，请阅读文档和快速入门指南。</p>
          <button class="details-button button">
            查看文档
            <span>
              <i class="fas fa-arrow-up-right-from-square"/>
            </span>
          </button>
        </div>
        <div class="content-box">
          <h2>API keys</h2>
          <p>管理此域的API密钥。</p>
          <button class="create-api-button button">
            创建API密钥
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 0;
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.side-bar-section {
  width: 260px;
  background: #ffffff;
  color: #333;
  padding-top: 30px;
  border-right: 1px solid #eaeaea;
}

.bar-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.bar-list li {
  padding: 16px 24px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.bar-list li:hover {
  background-color: #f5f7fa;
}

.bar-list li.active {
  background-color: #f5f7fa;
  font-weight: 600;
}

.bar {
  color: #333;
  text-decoration: none;
  display: block;
  font-size: 15px;
  letter-spacing: 0.2px;
  border-radius: 30px;
}

/* ========== 主内容区 ========== */
.main-show {
  flex: 1;
  padding: 40px;
  background-color: #ffffff;
  color: #333;
}

.content-box {
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.content-box h2 {
  font-size: 1.6rem;
  color: #1a1a1a;
  margin-bottom: 12px;
  font-weight: 600;
}

.content-box p {
  color: #555;
  line-height: 1.7;
  font-size: 1rem;
  margin-bottom: 20px;
}

.remove-button {
  background-color: #ff4d4f;
  color: #fff;
}

.remove-button:hover {
  background-color: #ff1a1a;
}
.button {
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.details-button:hover {
  background-color: #cdcaca;
}
.create-api-button{
  background-color: black;
  color: white;
}
.create-api-button:hover {
  background-color: #333333;
}
@media (max-width: 768px) {
  .side-bar-section {
    display: none;
  }

  .main-show {
    margin-left: 0;
    padding: 24px;
  }
}
</style>