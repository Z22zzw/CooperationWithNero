<template>
  <div class="chat-container">
    <!-- 顶部导航栏 -->
    <header class="chat-header">
      <div class="header-left">
        <div class="avatar-container">
          <div class="avatar-inner">
            <img src="../../assets/image/dangxialogo.png">
          </div>
        </div>
        <div class="header-info">
          <h1 class="header-title">智能问答助手</h1>
          <p class="header-status">在线 • 响应迅速</p>
        </div>
      </div>

      <div class="header-right">
        <button class="header-btn" @click="toggleTheme">
          <i :class="isDarkMode ? 'fa fa-sun-o' : 'fa fa-moon-o'"></i>
        </button>
        <button class="header-btn" @click="closeDialog">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="chat-main" id="chat-history">
      <!-- 欢迎消息 -->
      <div class="message-item ai-message animate-fade-in" v-if="messages.length === 0">
        <div class="avatar-container">
          <div class="avatar-inner">
            <img src="../../../../draftComponent/aiTest/starter-3/assets/image/dangxialogo.png">
          </div>
        </div>
        <div class="message-content ai-content">
          <p>您好！我是智能问答助手，有什么可以帮助您的吗？请在下方输入您的问题。</p>
        </div>
      </div>

      <!-- 消息列表 -->
      <div
          v-for="(message, index) in messages"
          :key="index"
          :class="message.sender === 'user' ? 'message-item user-message animate-fade-in' : 'message-item ai-message animate-fade-in'"
          :style="{ animationDelay: `${index * 0.05}s` }"
      >
        <template v-if="message.sender === 'user'">
          <div class="message-content user-content">
            <span v-if="message.status === 'sent'" class="message-status"><i class="fa fa-check"></i></span>
            <span v-if="message.status === 'read'" class="message-status"><i class="fa fa-check-double"></i></span>
            <p>{{ message.content }}</p>
            <span class="message-time">{{ message.timestamp }}</span>
          </div>
          <div class="avatar-container">
            <div class="avatar-inner">
              <img src="../../../../draftComponent/aiTest/starter-3/assets/image/gandanguser.png">
            </div>
          </div>
        </template>

        <template v-else>
          <div class="avatar-container">
            <div class="avatar-inner">
              <img src="../../../../draftComponent/aiTest/starter-3/assets/image/dangxialogo.png">
            </div>
          </div>
          <div :class="message.isError ? 'message-content ai-content error-content' : 'message-content ai-content'">
            <p v-if="!message.isTyping" :class="message.isError ? 'error-text' : ''">
              {{ message.content }}
            </p>
            <div v-if="message.isTyping" class="typing-indicator">
              <div class="typing-dot"></div>
              <div class="typing-dot" style="animation-delay: 0.2s"></div>
              <div class="typing-dot" style="animation-delay: 0.4s"></div>
            </div>
            <span v-if="!message.isTyping" class="message-time">{{ message.timestamp }}</span>
          </div>
        </template>
      </div>

      <!-- 底部提示 -->
      <div class="chat-hint">
        提示：按 Ctrl+Enter 发送消息
      </div>
    </main>

    <!-- 输入区域 -->
    <footer class="chat-footer">
      <div class="input-container">
        <button class="input-btn">
          <i class="fa fa-smile-o"></i>
        </button>
        <button class="input-btn">
          <i class="fa fa-paperclip"></i>
        </button>
        <div class="textarea-wrapper">
          <textarea
              v-model="question"
              @input="adjustTextareaHeight"
              @keydown.ctrl.enter="handleSubmit"
              placeholder="请输入您的问题..."
              class="message-input"
              :style="{ height: textareaHeight, maxHeight: '120px', overflowY: textareaHeight === '120px' ? 'auto' : 'hidden' }"
          ></textarea>
          <button
              type="button"
              @click="handleSubmit"
              class="send-btn"
              :disabled="!question.trim()"
          >
            <i class="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';

export default {
  name: 'ChatDialog',
  setup(props, { emit }) {
    // 状态定义
    const question = ref('');
    const messages = ref([]);
    const isDarkMode = ref(false);
    const textareaHeight = ref('48px');

    // 获取AI回答
    const getAIResponse = async (questionText) => {
      try {
        const response = await fetch('http://localhost:8080/questionAI', {
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

        // 更新用户消息状态为已读
        updateLastUserMessageStatus('read');
      } catch (error) {
        handleError();
      } finally {
        scrollToBottom();
      }
    };

    // 辅助函数
    const addMessage = (message) => {
      messages.value.push(message);
    };

    const removeLastMessage = () => {
      messages.value.pop();
    };

    const updateLastUserMessageStatus = (status) => {
      const userMsgIndex = messages.value.findLastIndex(m => m.sender === 'user');
      if (userMsgIndex !== -1) {
        messages.value[userMsgIndex].status = status;
      }
    };

    const getCurrentTime = () => {
      return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const resetInput = () => {
      question.value = '';
      textareaHeight.value = '48px';
    };

    const handleError = () => {
      removeLastMessage();
      addMessage({
        sender: 'ai',
        content: '服务暂时不可用，请稍后再试',
        isError: true,
        timestamp: getCurrentTime()
      });
    };

    const scrollToBottom = () => {
      nextTick(() => {
        const chatHistory = document.getElementById('chat-history');
        if (chatHistory) {
          chatHistory.scrollTop = chatHistory.scrollHeight;
        }
      });
    };

    // 调整文本框高度
    const adjustTextareaHeight = (e) => {
      const textarea = e.target;
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 120) + 'px';
      textareaHeight.value = newHeight;
    };

    // 切换主题
    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      document.documentElement.classList.toggle('dark-mode');
    };

    // 关闭对话框
    const closeDialog = () => {
      emit('close');
    };

    return {
      question,
      messages,
      isDarkMode,
      textareaHeight,
      handleSubmit,
      adjustTextareaHeight,
      toggleTheme,
      closeDialog
    };
  }
}
</script>

<style scoped>
/* 基础样式 */
.chat-container {
  position: relative;
  height: 85vh;
  max-height: 700px;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  color: #0f172a;
  transition: background-color 0.3s, color 0.3s;
}

/* 头部样式 */
.chat-header {
  background-color: white;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar-container {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(to bottom right, #ffffff, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.avatar-inner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(to bottom right, #ffffff, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.avatar-inner img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.header-info {
  display: flex;
  flex-direction: column;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.header-status {
  font-size: 12px;
  color: #64748b;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-btn {
  padding: 8px;
  border-radius: 50%;
  border: none;
  background: none;
  cursor: pointer;
  color: inherit;
  transition: background-color 0.2s;
}

.header-btn:hover {
  background-color: #f1f5f9;
}

/* 主内容区样式 */
.chat-main {
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.ai-message {
  justify-content: flex-start;
}

.user-message {
  justify-content: flex-end;
}

.message-content {
  padding: 12px 20px;
  border-radius: 20px;
  max-width: 85%;
  position: relative;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.ai-content {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-top-left-radius: 4px;
}

.user-content {
  background-color: #6366f1;
  color: white;
  border-top-right-radius: 4px;
}

.error-content {
  border-left: 4px solid #ef4444;
}

.error-text {
  color: #dc2626;
}

.message-status {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 10px;
  opacity: 0.7;
}

.message-time {
  font-size: 10px;
  opacity: 0.7;
  margin-top: 4px;
  display: inline-block;
}

.typing-indicator {
  display: flex;
  gap: 8px;
  padding: 5px 0;
}

.typing-dot {
  width: 12px;
  height: 12px;
  background-color: #94a3b8;
  border-radius: 50%;
  animation: pulse 1.4s infinite ease-in-out both;
}

.chat-hint {
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
  margin-top: 16px;
}

/* 输入区域样式 */
.chat-footer {
  border-top: 1px solid #e2e8f0;
  padding: 16px;
  background-color: white;
}

.input-container {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.input-btn {
  padding: 8px;
  border-radius: 50%;
  border: none;
  background: none;
  cursor: pointer;
  color: #64748b;
  transition: background-color 0.2s;
}

.input-btn:hover {
  background-color: #f1f5f9;
}

.textarea-wrapper {
  position: relative;
  flex-grow: 1;
}

.message-input {
  width: 100%;
  padding: 12px 16px;
  padding-right: 56px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  outline: none;
  resize: none;
  min-height: 48px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.message-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
}

.send-btn {
  position: absolute;
  right: 8px;
  bottom: 8px;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.send-btn:hover {
  background-color: #4f46e5;
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes pulse {
  0% { transform: scale(0); }
  50% { transform: scale(1); }
  100% { transform: scale(0); }
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

/* 深色模式 */
.dark-mode .chat-container {
  background-color: #0f172a;
  color: #f8fafc;
}

.dark-mode .chat-header {
  background-color: #1e293b;
  border-bottom-color: #334155;
}

.dark-mode .header-status {
  color: #94a3b8;
}

.dark-mode .header-btn:hover {
  background-color: #334155;
}

.dark-mode .ai-content {
  background-color: #1e293b;
  border-color: #334155;
}

.dark-mode .message-content p {
  color: #e2e8f0;
}

.dark-mode .message-time {
  color: #94a3b8;
}

.dark-mode .typing-dot {
  background-color: #64748b;
}

.dark-mode .chat-footer {
  background-color: #1e293b;
  border-top-color: #334155;
}

.dark-mode .input-btn {
  color: #94a3b8;
}

.dark-mode .input-btn:hover {
  background-color: #334155;
}

.dark-mode .message-input {
  background-color: #334155;
  border-color: #475569;
  color: #f8fafc;
}

.dark-mode .message-input:focus {
  border-color: #818cf8;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
}

.dark-mode .send-btn:hover {
  background-color: #6366f1;
}
</style>