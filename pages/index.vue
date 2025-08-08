<template>
  <div class="page-container min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
    <div class="max-w-4xl mx-auto px-4 py-12">
     
      
      <div class="flex justify-center">
        <button 
          @click="showChat = true" 
          class="open-chat-btn group relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          v-if="!showChat"
        >
          <i class="fas fa-comments mr-2 group-hover:scale-110 transition-transform"></i>
          开始对话
          <span class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
        </button>
      </div>
    </div>
    
    <div 
      class="chat-overlay fixed inset-0 bg-black/50 z-50 flex items-end justify-center p-4" 
      v-if="showChat"
      @click="showChat = false"
      :class="{ 'opacity-0 pointer-events-none': !showChat }"
      style="transition: opacity 0.3s ease"
    >
      <div 
        class="chat-wrapper w-full max-w-2xl bg-white dark:bg-slate-800 rounded-t-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700" 
        @click.stop
        :class="{ 'transform translate-y-full': !showChat }"
        style="transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
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
  padding-top: 20px;
}
</style>
