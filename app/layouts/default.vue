<script setup lang="ts">
import {type card} from "~/pages/index.vue";
const { data, pending, error, refresh } = await useFetch<{
  menu:{
      projects:card[],
      domains:{
        id:string,
        name:string
      }[]
    },
    profiles:{
      icon?:string,
      name:string,
      email:string
    }
  }>('/api/base', {
    method: 'POST',
    body: { userid: 'admin' },
    key: 'user-base-data',
})

// 直接响应式绑定
const menu = computed(() => data.value?.menu || {
  projects: [],
  domains: []
})

const profiles = computed(() => data.value?.profiles || {
  name: '',
  email: ''
})
</script>

<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <SideBar :menu="menu" :profiles="profiles"/>
    <!-- 主内容区 -->
    <div class="main-content">
      <slot/>
    </div>
  </div>
</template>


<style scoped>
  .layout {
    display: flex;
    min-height: 100vh;
  }

  .main-content {
    flex: 1;
    padding: 40px;
    background-color: #f5f7f9;
    margin-left: 260px;
  }
</style>