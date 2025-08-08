<script setup lang="ts">
import {onMounted, ref} from 'vue'
// menu:{
//   projects:{name:string,url:string}[],
//       domains:{name:string,url:string}[]
// }
// 定义响应式数据
const menu = ref<{
  projects: { name: string,id: string }[];
  domains: { name: string,id: string }[];
} >({
  projects:[],
  domains:[]
})

const profiles = ref<{
  icon?: string
  name: string
  email: string
}>({
  name: 'Unknown',
  email: 'unknown@example.com'
})

// 在组件挂载后获取数据
onMounted(async () => {
  try {
    const res = await $fetch<{menu: {
        projects: { name: string, id: string }[];
        domains: { name: string, id: string }[];
      },
      profiles: {  icon?:string,name: string, email: string ,};
    }>(`${useRuntimeConfig().public.apiBase}/api/menuDetails`) // 将获取的数据赋值给 ref
    menu.value=res.menu
    profiles.value=res.profiles
    console.log(menu.value)
  } catch (error) {
    console.error('获取菜单数据失败:', error)
  }
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