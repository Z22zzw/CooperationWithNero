<script setup lang="ts">
definePageMeta({
  layout: "domains"
})
const show=ref(true)
const tableData=ref<{
  question:string,
  platforms:string,
  firstCited:string,
  lastCited:string,
}[]>([])
const domain=useDomains()
const route=useRoute()
const { data, pending, error } = await useAsyncData<{
  id:string,
  name:string,
  url:string,
  API_KEY?:string,
}>(
    `domainDetails_${route.params.id}`, // 缓存 key
    () => $fetch(`/api/domainDetails`, {
      params: {
        id: route.params.id
      }
    }),
    {
      initialCache: true, // 每次都请求最新数据（可选）
    }
)
domain.set(data.id,data.name,data.url,data?.API_KEY)
</script>

<template>
  <div class="page-container">
    <section class="header">
      <div class="header-banner" v-if="show">
        <div class="header-title">
          <h1>相关问题</h1>
          <span class="close-btn" @click="show = false">
            <i class="fas fa-times"></i>
          </span>
        </div>
        <p>在我们的数据集中，这个领域至少被引用过一次的问题。您可以选择这些问题并将它们添加到项目中，以便进行更详细的监视、报告和分析。</p>
      </div>
    </section>
    <section class="main" style="flex: 1;">
      <div style="background-color: #dfd9d9;height:   100%">
        <el-table :data="tableData" style="width: 100%;height: 100%;" :empty-text="'No results. 没有结果。'">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="question" label="问题" min-width="200"></el-table-column>
          <el-table-column prop="platforms" label="平台" min-width="200"></el-table-column>
          <el-table-column prop="firstCited" label="第一次引用" min-width="200"></el-table-column>
          <el-table-column prop="lastCited" label="最后引用" min-width="200"></el-table-column>
        </el-table>
      </div>
    </section>
  </div>
</template>

<style scoped>
.header-banner {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 1140px;
  margin: 0 auto;
  padding: 10px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
}
.header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title h1 {
  display: flex;
  font-size: 1.3rem;
  color: #333;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.close-btn {
  margin-left: auto;
  margin-right: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #d32f2f;
  color: white;
}
.page-container {
  display: flex;
  flex-direction: column;
  height: 100dvh; /* 或 min-height: 100vh */
  background-color: #dfd9d9;
}
</style>
