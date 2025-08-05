<script setup lang="ts">
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
        <img ref="logo" src="@/assets/dangxialogo.png" alt="当夏科技logo">
      </div>
      <ul class="nav-menu">
        <li v-for="[key,value] in menu.entries()"><a :href=value>{{key}}</a></li>
      </ul>
      <div class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>