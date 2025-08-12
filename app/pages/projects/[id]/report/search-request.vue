<template>
  <div class="container">
    <div class="content">
      <img src="~/assets/image/searchNoTopic.jpeg" alt="No Topic Icon" class="icon"/>
      <h1>尚无主题</h1>
      <p>搜索需求可以深入了解人们就项目中的主题提问的频率。您需要先创建带有问题的主题，然后我们才能计算搜索需求。</p>
      <button @click="learnMore">了解更多信息</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    learnMore() {
      // 这里你可以添加跳转到更多信息页面的逻辑
      alert('点击了“了解更多信息”按钮');
    }
  }
}

definePageMeta({
  layout: 'reports'
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.content {
  text-align: center;
}

.icon {
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
}

button:hover {
  background-color: #f5f5f5;
}
</style>