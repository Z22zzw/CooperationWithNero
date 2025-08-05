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
        <h2>当夏科技</h2>
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