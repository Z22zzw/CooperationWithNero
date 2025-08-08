<template>
  <div class="page-container">
    <div class="page-content">
      <div class="button-container">
        <button
            @click="showChat = true"
            class="open-chat-btn"
            v-if="!showChat"
        >
          <i class="fas fa-comments mr-2"></i>
          开始对话
          <span class="button-overlay"></span>
        </button>
      </div>
    </div>

    <div
        class="chat-overlay"
        v-if="showChat"
        @click="showChat = false"
    >
      <div
          class="chat-wrapper"
          @click.stop
      >
        <ChatDialog
            @close="showChat = false"
            :initial-messages="initialMessages"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChatDialog from '~/components/ChatDialog.vue';

// 控制对话框显示状态
const showChat = ref(false);

// 初始消息列表
const initialMessages = ref([
  {
    text: "你好！我是智能问答助手，有什么可以帮助你的吗？",
    isUser: false,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
]);
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc, #e2e8f0);
  padding-top: 20px;
}

.page-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  padding-top: 48px;
}

.button-container {
  display: flex;
  justify-content: center;
}

.open-chat-btn {
  position: relative;
  overflow: hidden;
  padding: 16px 32px;
  border-radius: 30px;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  color: white;
  font-size: 16px;
  font-weight: 500;
  border: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s;
  transform: translateY(0);
}

.open-chat-btn:hover {
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  transform: translateY(-4px);
}

.open-chat-btn .fa-comments {
  transition: transform 0.3s;
}

.open-chat-btn:hover .fa-comments {
  transform: scale(1.1);
}

.button-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  opacity: 0;
  transition: opacity 0.3s;
}

.open-chat-btn:hover .button-overlay {
  opacity: 0.1;
}

.chat-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 50;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 16px;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.chat-wrapper {
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark-mode .page-container {
  background: linear-gradient(to bottom, #0f172a, #1e293b);
}

.dark-mode .chat-wrapper {
  background-color: #1e293b;
  border-color: #334155;
}
</style>