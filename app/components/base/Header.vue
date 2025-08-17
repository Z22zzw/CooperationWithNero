<script setup lang="ts">
import {ref} from "vue";

const showQrModal = ref(false);

// 打开模态框的函数
const contactUs = () => {
  showQrModal.value = true
}

const contactDemo = function(){
  window.location.href="http://www.dxgeo.net";
}

// 关闭模态框的函数
const closeModal = () => {
  showQrModal.value = false
}
defineProps<{
  // name:url
  menu: Map<string, string>
}>()


</script>

<template>

  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-logo">
        <!-- 在 Vue 里显示图片应该使用 img 标签而非 i 标签 -->
        <img ref="logo" src="@/assets/dangxialogo.webp" alt="当夏科技logo">
      </div>
      <ul class="nav-menu">
        <li v-for="[key,value] in menu.entries()"><a :href=value>{{key}}</a></li>
      </ul>
      <button class="btn-primary" @click="contactDemo" >免费试用</button>
      <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    
  </nav>

  <div v-if="showQrModal" class="qr-modal">
    <div class="qr-modal-overlay" @click="closeModal"></div>
    <div class="qr-modal-content">
      <button class="qr-modal-close" @click="closeModal">&times;</button>
      <!-- 为解决二维码模糊问题，添加 decoding="async" loading="lazy" 属性，并确保图片格式和尺寸合适 -->
      <img src="~/assets/qr1.webp" alt="二维码" class="qr-image" decoding="async" loading="lazy" />
    </div>
  </div>
</template>

<style scoped>

</style>