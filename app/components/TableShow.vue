<template>
  <div class="main">
    <h2>{{ header }}</h2>
    <p>{{description}}</p>

    <el-table :data="tableList" style="width: 100%">
      <el-table-column :label="table_header" width="200">
        <template #default="scope">
          <el-row>
            <el-col :span="20">
              <el-tag type="info">{{ scope.row.name }}</el-tag>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="visibility" label="能见度" width="100">
        <template #default="scope">
          {{ scope.row.visibility }}%
        </template>
      </el-table-column>
      <el-table-column label="改变" width="100">
        <template #default="scope">
          <el-icon v-if="scope.row.change > 0" color="#00b47a"><ArrowUpBold /></el-icon>
          <el-icon v-else-if="scope.row.change < 0" color="#ff6c6c"><ArrowDownBold /></el-icon>
          <span :style="{ color: scope.row.change > 0 ? '#00b47a' : '#ff6c6c' }">
            {{ scope.row.change }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpBold, ArrowDownBold } from '@element-plus/icons-vue'
import type {TableList} from "~/interface/ProjectDetails";
defineProps<{
  tableList:TableList[],
  header:string,
  description: string,
  table_header: string,
}>()
</script>

<style scoped>
.main {
  padding: 20px;
}

.el-tag {
  margin-left: 8px;
}
</style>