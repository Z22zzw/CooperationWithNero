<template>
  <div>
    <!-- 触发按钮插槽 -->
    <slot name="trigger" :open="openDialog">
      <button
          @click="openDialog"
          class="open-chat-btn"
      >
        <i class="fas fa-comments"></i>
        开始对话
      </button>
    </slot>

    <!-- 透明遮罩层，用于检测外部点击 -->
    <transition name="fade">
      <div
          v-if="showChat"
          class="chat-overlay"
          @click="closeDialog"
      ></div>
    </transition>

    <!-- 聊天窗口 -->
    <transition name="slide">
      <div
          v-if="showChat"
          class="chat-wrapper"
          @click.stop
      >
        <div class="chat-container">
          <!-- 顶部导航栏 -->
          <header class="chat-header">
            <div class="header-left">
              <div class="logo-container">
                <img :src="logoUrl || defaultLogo" class="logo">
              </div>
              <div>
                <h1 class="title">{{ title }}</h1>
                <p class="status">在线 • 响应迅速</p>
              </div>
            </div>
          </header>

          <!-- 主内容区 -->
          <main class="chat-main" id="chat-history">
            <!-- 欢迎消息 -->
            <div class="welcome-message" v-if="messages.length === 0">
              <div class="logo-container">
                <img :src="logoUrl || defaultLogo" class="logo">
              </div>
              <div class="message-bubble">
                <p>{{ welcomeMessage }}</p>
              </div>
            </div>

            <!-- 消息列表 -->
            <div
                v-for="(message, index) in messages"
                :key="index"
                :class="message.sender === 'user' ? 'user-message' : 'ai-message'"
            >
              <template v-if="message.sender === 'user'">
                <div class="user-bubble">
                  <span v-if="message.status === 'sent'" class="status-icon"><i class="fa fa-check"></i></span>
                  <span v-if="message.status === 'read'" class="status-icon"><i class="fa fa-check-double"></i></span>
                  <p>{{ message.content }}</p>
                  <span class="timestamp">{{ message.timestamp }}</span>
                </div>
                <div class="user-avatar">
                  <div class="avatar-container">
                    <img :src="userAvatarUrl || defaultUser" class="avatar">
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="ai-avatar">
                  <img :src="logoUrl || defaultLogo" class="logo">
                </div>
                <div :class="message.isError ? 'error-bubble' : 'ai-bubble'">
                  <p v-if="!message.isTyping" :class="message.isError ? 'error-text' : 'ai-text'">
                    {{ message.content }}
                  </p>
                  <div v-if="message.isTyping" class="typing-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                  </div>
                  <span v-if="!message.isTyping" class="timestamp">{{ message.timestamp }}</span>
                </div>
              </template>
            </div>

            <!-- 底部提示 -->
            <div class="hint">
              提示：按 Ctrl+Enter 发送消息
            </div>
          </main>

          <!-- 输入区域 -->
          <footer class="chat-footer">
            <div class="input-container">
              <div class="text-input">
                <textarea
                    v-model="question"
                    @input="adjustTextareaHeight"
                    @keydown.ctrl.enter="handleSubmit"
                    placeholder="请输入您的问题..."
                    class="message-input"
                    :style="{ height: textareaHeight }"
                ></textarea>
                <button
                    type="button"
                    @click="handleSubmit"
                    class="send-button"
                    :disabled="!question.trim()"
                >
                  <i class="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue';
import defaultLogoImg from '@/assets/image/dangxialogo.png';
import defaultUserImg from '@/assets/image/gandanguser.png';

// Props定义
const props = defineProps({
  initialMessages: {
    type: Array as () => Array<{
      sender: string;
      content: string;
      timestamp?: string;
      status?: string;
      isTyping?: boolean;
      isError?: boolean;
    }>,
    default: () => []
  },
  title: {
    type: String,
    default: '智能问答助手'
  },
  welcomeMessage: {
    type: String,
    default: '您好！我是智能问答助手，有什么可以帮助您的吗？请在下方输入您的问题。'
  },
  logoUrl: {
    type: String,
    default: ''
  },
  userAvatarUrl: {
    type: String,
    default: ''
  },
  apiEndpoint: {
    type: String,
    default: 'http://localhost:8080/questionAI'
  }
});

// Emits定义
const emit = defineEmits(['open', 'close']);

// 响应式状态
const showChat = ref(false);
const question = ref('');
const messages = ref([...props.initialMessages]);
const isDarkMode = ref(false);
const textareaHeight = ref('48px');

// 默认Logo和用户头像
const defaultLogo = ref(defaultLogoImg);
const defaultUser = ref(defaultUserImg);

// 打开对话框
const openDialog = () => {
  showChat.value = true;
  emit('open');
};

// 关闭对话框
const closeDialog = () => {
  showChat.value = false;
  emit('close');
};

// 切换主题
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark', isDarkMode.value);
};

// 获取AI回答
const getAIResponse = async (questionText: string) => {
  try {
    const response = await fetch(props.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ question: questionText })
    });

    if (!response.ok) {
      throw new Error(`请求失败: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error('API请求错误:', error);
    throw error;
  }
};

// 提交处理
const handleSubmit = async () => {
  const questionText = question.value.trim();
  if (!questionText) return;

  // 添加用户消息
  const timestamp = getCurrentTime();
  addMessage({
    sender: 'user',
    content: questionText,
    timestamp,
    status: 'sent'
  });

  // 清空输入框
  resetInput();

  // 添加"正在输入"状态
  addMessage({
    sender: 'ai',
    isTyping: true,
    timestamp
  });

  try {
    // 获取AI回复
    const answer = await getAIResponse(questionText);

    // 移除"正在输入"状态并添加真实回复
    removeLastMessage();
    addMessage({
      sender: 'ai',
      content: answer,
      isError: false,
      timestamp: getCurrentTime()
    });
  } catch (error) {
    handleError();
  } finally {
    scrollToBottom();
  }
};

// 调整文本区域高度
const adjustTextareaHeight = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto';
  textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  textareaHeight.value = `${Math.min(textarea.scrollHeight, 120)}px`;
};

// 添加消息
const addMessage = (message: any) => {
  messages.value.push(message);
};

// 移除最后一条消息
const removeLastMessage = () => {
  messages.value.pop();
};


// 获取当前时间
const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// 重置输入
const resetInput = () => {
  question.value = '';
  textareaHeight.value = '48px';
};

// 处理错误
const handleError = () => {
  removeLastMessage();
  addMessage({
    sender: 'ai',
    content: '服务暂时不可用，请稍后再试',
    isError: true,
    timestamp: getCurrentTime()
  });
};

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    const chatHistory = document.getElementById('chat-history');
    if (chatHistory) {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  });
};
</script>


<style scoped>
/* 淡入淡出动画 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 滑动动画 */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from, .slide-leave-to {
  transform: translateX(-100%);
}

.chat-wrapper {
  position: fixed;
  left: 20px;
  top: 20px;
  z-index: 50;
  height: 85vh;
  width: 400px;
  max-width: 85vw;
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dark .chat-wrapper {
  background: #1f2937;
  border-color: rgba(255, 255, 255, 0.1);
}

/* 响应式调整 */
@media (max-width: 480px) {
  .chat-wrapper {
    left: 10px;
    top: 10px;
    width: calc(100vw - 20px);
    height: calc(100vh - 20px);
    max-width: none;
  }
}

/* 消息动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

/* 滚动条美化 */
#chat-history {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

#chat-history::-webkit-scrollbar {
  width: 6px;
}

#chat-history::-webkit-scrollbar-track {
  background: transparent;
}

#chat-history::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

/* 打字动画 */
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}


.chat-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 40;
}

.chat-container {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  color: #1e293b;
  transition: background-color 0.3s, color 0.3s;
}

.dark .chat-container {
  background-color: #0f172a;
  color: #f1f5f9;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
}

.dark .chat-header {
  background-color: #1e293b;
  border-color: #334155;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.logo {
  width: 32px;
  height: 32px;
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.25;
}

.status {
  font-size: 0.75rem;
  color: #64748b;
}

.dark .status {
  color: #94a3b8;
}

.header-right {
  display: flex;
  gap: 0.75rem;
}

.theme-toggle,
.close-button {
  padding: 0.5rem;
  border-radius: 9999px;
  transition: background-color 0.2s;
}

.theme-toggle:hover,
.close-button:hover {
  background-color: #f1f5f9;
}

.dark .theme-toggle:hover,
.dark .close-button:hover {
  background-color: #334155;
}

.chat-main {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.welcome-message {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.message-bubble {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0 1rem 1rem 1rem;
  padding: 1.25rem 1.5rem;
  max-width: 70%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.dark .message-bubble {
  background-color: #1e293b;
  border-color: #334155;
}

.user-message {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 0.75rem;
}

.ai-message {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.user-bubble {
  background-color: #4f46e5;
  color: white;
  border-radius: 1.5rem;
  border-top-right-radius: 0;
  padding: 1.25rem 1.5rem;
  max-width: 85%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.ai-bubble {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 1.5rem;
  border-top-left-radius: 0;
  padding: 1.25rem 1.5rem;
  max-width: 85%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.dark .ai-bubble {
  background-color: #1e293b;
  border-color: #334155;
}

.error-bubble {
  background-color: white;
  border-left: 4px solid #ef4444;
  border-radius: 1.5rem;
  border-top-left-radius: 0;
  padding: 1.25rem 1.5rem;
  max-width: 85%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.dark .error-bubble {
  background-color: #1e293b;
}

.status-icon {
  position: absolute;
  top: -0.25rem;
  right: -0.25rem;
  font-size: 0.75rem;
  opacity: 0.7;
}

.timestamp {
  display: inline-block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  opacity: 0.7;
}

.user-avatar,
.ai-avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
}

.avatar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.avatar {
  width: 32px;
  height: 32px;
}

.error-text {
  color: #ef4444;
}

.dark .error-text {
  color: #f87171;
}

.ai-text {
  color: #1e293b;
}

.dark .ai-text {
  color: #f1f5f9;
}

.typing-indicator {
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem 0;
}

.dot {
  width: 0.75rem;
  height: 0.75rem;
  background-color: #cbd5e1;
  border-radius: 9999px;
}

.dark .dot {
  background-color: #475569;
}

.dot:nth-child(1) {
  animation: pulse 1.5s infinite;
}

.dot:nth-child(2) {
  animation: pulse 1.5s infinite 0.2s;
}

.dot:nth-child(3) {
  animation: pulse 1.5s infinite 0.4s;
}

.hint {
  text-align: center;
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 1rem;
}

.dark .hint {
  color: #94a3b8;
}

.chat-footer {
  border-top: 1px solid #e2e8f0;
  padding: 1rem;
  background-color: white;
}

.dark .chat-footer {
  border-color: #334155;
  background-color: #1e293b;
}

.input-container {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
}

.emoji-button,
.attach-button {
  padding: 0.5rem;
  border-radius: 9999px;
  color: #64748b;
  transition: background-color 0.2s;
}

.emoji-button:hover,
.attach-button:hover {
  background-color: #f1f5f9;
}

.dark .emoji-button:hover,
.dark .attach-button:hover {
  background-color: #334155;
}

.text-input {
  position: relative;
  flex-grow: 1;
}

.message-input {
  font-size: 20px;
  width: 80%;
  padding: 0.75rem 3.5rem 0.75rem 1rem;
  border-radius: 1.5rem;
  border: 1px solid #cbd5e1;
  background-color: white;
  outline: none;
  transition: all 0.3s;
  min-height: 48px;
  max-height: 120px;
  overflow-y: auto;
  resize: none;
}

.dark .message-input {
  background-color: #1e293b;
  border-color: #475569;
  color: #f1f5f9;
}

.message-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
}

.dark .message-input:focus {
  border-color: #818cf8;
  box-shadow: 0 0 0 2px rgba(129, 140, 248, 0.2);
}

/* 更新后的发送按钮样式 */
.send-button {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem;
  border-radius: 9999px;
  transition: all 0.3s;
  transform: scale(1);
  border: none;
  cursor: pointer;
}

.send-button:hover {
  background-color: #4338ca;
  transform: scale(1.05);
}

.dark .send-button:hover {
  background-color: #6366f1;
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: scale(1);
}
</style>
