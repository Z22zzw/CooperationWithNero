<script setup lang="ts">
// menu:{
//   projects:{name:string,url:string}[],
//       domains:{name:string,url:string}[]
// }
const menu={
  projects:[
      {
        name:"first",
        url:"#",
      },
    {
      name:"second",
      url:"#",
    },
  ],
  domains:[
    {
      name:"当夏科技",
      url:"#",
    }
  ]
}
const profiles ={
  name:"nero",
  email:"123@qq.com"
}
</script>

<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <SideBar :menu="menu" :profiles="profiles"/>
    <!-- 主内容区 -->
    <div class="main-content">
      <NuxtPage />
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