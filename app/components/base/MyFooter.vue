<script setup lang="ts">
// 移除错误的导入
// import {contactUs} from '@/pages/service.vue'
import { ref } from 'vue'

defineProps<{
  // name:url
  profile:{
    phone:string,
    email:string,
    address:string,
  }
}>()

// 在组件内部定义状态和函数
const showQrModal = ref(false)

// 打开模态框的函数
const contactUs = () => {
  showQrModal.value = true
}

// 关闭模态框的函数
const closeModal = () => {
  showQrModal.value = false
}
</script>

<template>
  <!-- 二维码模态框 -->
  <div v-if="showQrModal" class="qr-modal">
    <div class="qr-modal-overlay" @click="closeModal"></div>
    <div class="qr-modal-content">
      <button class="qr-modal-close" @click="closeModal">&times;</button>
      <img src="~/assets/qr1.webp" alt="二维码" class="qr-image" decoding="async" loading="lazy" />
    </div>
  </div>
  
  <section id="about" class="contact">
    <div class="container">
      <div class="contact-content">
        <div class="contact-info">
          <h2>现在，非常期待与您的又一次邂逅</h2>
          <p id="rooter-text">当夏科技团队努力让每一次邂逅总能超越期待</p>
          <!-- 修复点击事件绑定 -->
          <button class="btn-primary" @click="contactUs()">立即联系</button>
        </div>
        <div class="contact-details">
          <div class="contact-item">
            <i class="fas fa-phone"></i>
            <span>{{profile.phone}}</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-envelope"></i>
            <span>{{profile.email}}</span>
          </div>
          <div class="contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{profile.address}}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>友情链接</h3>
          <ul>
            <li><a href="#">合作伙伴</a></li>
            <li><a href="#">技术支持</a></li>
            <li><a href="#">服务条款</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3>联系方式</h3>
          <div class="contact-methods">
            <div class="contact-method">
              <i class="fas fa-phone"></i>
              <span>027-65384701</span>
            </div>
            <div class="contact-method">
              <i class="fas fa-envelope"></i>
              <span>zh@whdxcy.com</span>
            </div>
            <div class="contact-method">
              <i class="fab fa-weixin"></i>
              <button class="wx" @click="contactUs()">企业微信</button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 当夏科技优化服务 版权所有 |
           <!-- 备案号：沪ICP备2025123694号</p> --></p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  #rooter-text{
    color:azure;
  }
  .wx{
    background: transparent;
    border: none;
    color: inherit;
    font: inherit;
    padding: 0;
    cursor: pointer;
    text-decoration: underline;
  }
  .btn-primary{
    background-color:#4f46e5;
  }
</style>