<template>
  <BaseHeader v-show="!isRead" :menu="menu"/>
  <NuxtPage/>
  <BaseMyFooter v-if="!isRead" :profile="profile"/>
</template>
<script setup lang="ts">
import { useReadState } from '~/composables/useReadState'
import '@/assets/styles.css'
const isRead=useReadState()
const menu=new Map([
  ["首页", "/"],
  ["服务项目", "/service"],
  ["成功案例", "/cases"],
  ["GEO团队", "/team"],
  ["GEO博客", "/blog"],
  ["关于我们", "/about"],
]);
const profile={
  phone:"400-021-6120",
  email:"bd@digitaltech.cn",
  address:"上海市徐汇区绿地汇中心A座25楼2516室"
}
</script>