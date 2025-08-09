<template>
<!--  修改-->
  <div class="relative h-[85vh] max-h-[700px] flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
    <!-- 顶部导航栏 -->
    <header class="bg-white dark:bg-slate-800 shadow-sm p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
      <div class="flex items-center space-x-3">
        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-white-500 to-white-600 flex items-center justify-center shadow-md">
           <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-white-500 to-white-600 flex items-center justify-center shadow-sm">
            <!-- <i class="fa fa-robot text-white"></i> -->
             <img src="../assets/image/dangxialogo.png">
          </div>
        </div>
        <div>
          <h1 class="text-lg font-semibold">智能问答助手</h1>
          <p class="text-xs text-slate-500 dark:text-slate-400">在线 • 响应迅速</p>
        </div>
      </div>
      
      <div class="flex items-center space-x-3">
        <button @click="toggleTheme" class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
          <i :class="isDarkMode ? 'fa fa-sun-o' : 'fa fa-moon-o'"></i>
        </button>
        <button @click="closeDialog" class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200">
          <i class="fa fa-times"></i>
        </button>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="flex-grow overflow-y-auto p-4 space-y-4" id="chat-history">
      <!-- 欢迎消息 -->
      <div class="flex items-start space-x-3 animate-fade-in" v-if="messages.length === 0">
         <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-white-500 to-white-600 flex items-center justify-center shadow-sm">
            <!-- <i class="fa fa-robot text-white"></i> -->
             <img src="../assets/image/dangxialogo.png">
          </div>
        <div class="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none px-5 py-3 shadow-sm max-w-[85%] border border-slate-100 dark:border-slate-700">
          <p class="text-slate-700 dark:text-slate-300">您好！我是智能问答助手，有什么可以帮助您的吗？请在下方输入您的问题。</p>
        </div>
      </div>

      <!-- 消息列表 -->
      <div 
        v-for="(message, index) in messages" 
        :key="index"
        :class="message.sender === 'user' ? 'flex items-start justify-end space-x-3 animate-fade-in' : 'flex items-start space-x-3 animate-fade-in'"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        <template v-if="message.sender === 'user'">
          <div class="bg-indigo-500 text-white rounded-2xl rounded-tr-none px-5 py-3 shadow-sm max-w-[85%] relative overflow-hidden">
            <span v-if="message.status === 'sent'" class="absolute -top-1 -right-1 text-xs opacity-70"><i class="fa fa-check"></i></span>
            <span v-if="message.status === 'read'" class="absolute -top-1 -right-1 text-xs opacity-70"><i class="fa fa-check-double"></i></span>
            <p>{{ message.content }}</p>
            <span class="text-xs opacity-70 mt-1 inline-block">{{ message.timestamp }}</span>
          </div>
          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shadow-sm">
             <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-white-500 to-white-600 flex items-center justify-center shadow-sm">
            <!-- <i class="fa fa-robot text-white"></i> -->
             <img src="../assets/image/gandanguser.png">
          </div>
          </div>
        </template>

        <template v-else>
          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-white-500 to-white-600 flex items-center justify-center shadow-sm">
            <!-- <i class="fa fa-robot text-white"></i> -->
             <img src="../assets/image/dangxialogo.png">
          </div>
          <div :class="message.isError ? 'bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none px-5 py-3 shadow-sm max-w-[85%] border-l-4 border-red-500' : 'bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none px-5 py-3 shadow-sm max-w-[85%] border border-slate-100 dark:border-slate-700'">
            <p v-if="!message.isTyping" :class="message.isError ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'">
              {{ message.content }}
            </p>
            <div v-if="message.isTyping" class="flex space-x-2 py-1">
              <div class="h-3 w-3 bg-slate-300 dark:bg-slate-600 rounded-full animate-pulse"></div>
              <div class="h-3 w-3 bg-slate-300 dark:bg-slate-600 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
              <div class="h-3 w-3 bg-slate-300 dark:bg-slate-600 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
            </div>
            <span v-if="!message.isTyping" class="text-xs opacity-70 mt-1 inline-block text-slate-500 dark:text-slate-400">{{ message.timestamp }}</span>
          </div>
        </template>
      </div>

      <!-- 底部提示 -->
      <div class="text-center text-xs text-slate-400 mt-4">
        提示：按 Ctrl+Enter 发送消息
      </div>
    </main>

    <!-- 输入区域 -->
    <footer class="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
      <div class="flex items-end space-x-2">
        <button class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 text-slate-500 dark:text-slate-400">
          <i class="fa fa-smile-o"></i>
        </button>
        <button class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 text-slate-500 dark:text-slate-400">
          <i class="fa fa-paperclip"></i>
        </button>
        <div class="relative flex-grow">
          <textarea 
            v-model="question"
            @input="adjustTextareaHeight"
            @keydown.ctrl.enter="handleSubmit"
            placeholder="请输入您的问题..."
            class="w-full px-4 py-3 pr-16 rounded-2xl border border-slate-200 dark:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all resize-none min-h-[48px] bg-white dark:bg-slate-700"
            :style="{ height: textareaHeight, maxHeight: '120px', overflowY: textareaHeight === '120px' ? 'auto' : 'hidden' }"
          ></textarea>
          <button 
            type="button"
            @click="handleSubmit"
            class="absolute right-2 bottom-2 bg-indigo-500 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white p-2 rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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

    return {
      question,
      messages,
      isDarkMode,
      textareaHeight,
      handleSubmit
    };
  }
}
</script>

<style scoped>
/* 动画效果 */
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
</style>
