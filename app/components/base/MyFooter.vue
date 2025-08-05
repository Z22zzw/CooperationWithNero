<script setup lang="ts">
defineProps<{
  // name:url
  profile:{
    phone:string,
    email:string,
    address:string,
  }
}>()
</script>

<template>
  <section id="about" class="contact">
    <div class="container">
      <div class="contact-content">
        <div class="contact-info">
          <h2>现在，非常期待与您的又一次邂逅</h2>
          <p>当夏科技团队努力让每一次邂逅总能超越期待</p>
          <button class="btn-primary" onclick="contactUs()">立即联系</button>
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
              <span>400-021-6120</span>
            </div>
            <div class="contact-method">
              <i class="fab fa-weixin"></i>
              <span>企业微信</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 当夏科技优化服务 版权所有 | 备案号：沪ICP备2025123694号</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>