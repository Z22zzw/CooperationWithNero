<script setup lang="ts">
import ModalComponent from "~/components/ModalComponent.vue";
defineProps<{
  title: string;
}>()
const emit = defineEmits(['open', 'close',"submit"]);
const showModel=ref(false);
const openAddModel= () => {
  showModel.value = true;
  emit('open');
};
</script>

<template>
  <slot name="trigger" :open="openAddModel">
    <button
        @click="openAddModel"
        class="open-chat-btn"
    >
      <i class="fas fa-comments"></i>
      添加
    </button>
  </slot>

  <ModalComponent
      v-model="showModel"
      title="添加新项目"
      class="custom-modal"
  >
    <template #header>
      <h2 class="modal-title">{{ title }}</h2>
    </template>
    <!-- 自定义问题 -->
    <template #body>
      <slot name="body"></slot>
    </template>
    <!-- Footer -->
    <template #footer>
      <div class="footer-buttons">
        <button @click="showModel = false" class="btn-secondary">取消</button>
        <button @click="()=>{emit('submit');showModel=false}" class="btn-primary">提交</button>
      </div>
    </template>
  </ModalComponent>
</template>
<style scoped>
.footer-buttons {
  display: flex;
  justify-content: space-between; /* 在父容器中均匀分布子元素 */
  gap: 10px; /* 子元素之间的间距 */
}
/* 基础按钮样式 */
button {
  padding: 10px 20px; /* 内边距：上下10px，左右20px */
  border: none; /* 移除默认边框 */
  border-radius: 5px; /* 圆角半径 */
  cursor: pointer; /* 鼠标悬停时显示手型 */
  font-size: 16px; /* 字体大小 */
  transition: all 0.3s ease; /* 平滑过渡效果 */
}

/* 取消按钮样式 */
.btn-secondary {
  background-color: #e0e0e0; /* 背景颜色 */
  color: #333; /* 文字颜色 */
}

/* 提交按钮样式 */
.btn-primary {
  background-color: #4CAF50; /* 背景颜色 */
  color: white; /* 文字颜色 */
}

/* 鼠标悬停时的效果 */
button:hover {
  opacity: 0.85; /* 稍微透明 */
}

/* 禁用状态 */
button:disabled {
  background-color: #cccccc; /* 灰色背景 */
  cursor: not-allowed; /* 不允许点击的鼠标样式 */
}
</style>