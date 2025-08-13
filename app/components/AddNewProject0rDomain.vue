<script setup lang="ts">
import { ref, nextTick } from 'vue';
import ModalComponent from "~/components/ModalComponent.vue";

defineProps<{
  title: string;
}>();

const emit = defineEmits(['open', 'close', 'submit']);
const showModel = ref(false);
const isOpening = ref(false); // 跟踪弹窗状态

const openAddModel = async () => {
  // 先显示弹窗并触发动画
  showModel.value = true;
  isOpening.value = true;

  // 等待DOM更新和动画开始
  await nextTick();

  // 延迟触发open事件，确保动画不被阻塞
  setTimeout(() => {
    emit('open');
    isOpening.value = false;
  }, 50);
};

const handleSubmit = () => {
  emit('submit');
  // 使用动画优化关闭
  showModel.value = false;
};

// 确保ModalComponent支持v-model
const updateModelValue = (value: boolean) => {
  showModel.value = value;
  if (!value) {
    emit('close');
  }
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
      :modelValue="showModel"
      @update:modelValue="updateModelValue"
      :class="['custom-modal', {'opening': isOpening}]"
      title="添加新项目"
  >
    <template #header>
      <h2 class="modal-title">{{ title }}</h2>
    </template>

    <!-- 自定义内容区域 -->
    <template #body>
      <slot name="body"></slot>
    </template>

    <!-- Footer -->
    <template #footer>
      <div class="footer-buttons">
        <button @click="showModel = false" class="btn-secondary">取消</button>
        <button @click="handleSubmit" class="btn-primary">提交</button>
      </div>
    </template>
  </ModalComponent>
</template>

<style scoped>
/* 添加过渡效果 */
.custom-modal {
  transition:
      opacity 0.3s ease-out,
      transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* 初始状态 */
.custom-modal:not(.opening) {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* 打开状态 */
.custom-modal.opening {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 关闭状态 */
.custom-modal:not(.opening):not([model-value="true"]) {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* 确保点击事件不影响性能 */
button {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 基础按钮样式 */
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

/* 取消按钮样式 */
.btn-secondary {
  background-color: #e0e0e0;
  color: #333;
}

/* 提交按钮样式 */
.btn-primary {
  background-color: #4CAF50;
  color: white;
}

/* 鼠标悬停效果 */
button:hover {
  opacity: 0.85;
}

/* 禁用状态 */
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* 按钮容器优化 */
.footer-buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

/* 优化加载性能 */
:deep(.modal-content) {
  will-change: transform, opacity;
}
</style>
