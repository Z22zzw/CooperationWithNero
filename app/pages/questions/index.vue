<script setup lang="ts">
definePageMeta({
  layout: 'custom'
})
</script>

<template>
  <div class="header-controls">
    <TabSwitch/>
  </div>
</template>

<style scoped>
.header-controls {
  display: flex;
  gap:  30%;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e4e4e4;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  margin-top: -30px;
  justify-content: flex-start;
}
/* 深色模式适配 */
.dark .header-controls {
  background-color: #1f2937;
  border-color: #374151;
}
</style>