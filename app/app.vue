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
  phone:"027-65384701",
  email:"zh@whdxcy.com",
  address:"湖北省武汉市洪山区欢乐大道1号德成国贸中心B栋37层"
}
</script>