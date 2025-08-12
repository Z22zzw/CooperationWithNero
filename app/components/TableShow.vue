<template>
  <div class="table-container">
    <div class="table-header">
      <h3>{{ header }}</h3>
      <p>{{ description }}</p>
    </div>

    <el-table :data="tableList" style="width: 100%" row-class-name="custom-row">
      <el-table-column :label="tableHeader" prop="name">
        <template #default="scope">
          <el-tag type="info" size="large">{{ scope.row.name }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="visibility" label="能见度" width="140" align="center">
        <template #default="scope">
          <span class="visibility-value">{{ scope.row.visibility }}%</span>
        </template>
      </el-table-column>

      <el-table-column label="改变" width="140" align="center">
        <template #default="scope">
          <div class="change-container">
            <el-icon v-if="scope.row.change > 0" color="#00b47a" class="change-icon">
              <Top />
            </el-icon>
            <el-icon v-else-if="scope.row.change < 0" color="#ff6c6c" class="change-icon">
              <Bottom />
            </el-icon>
            <span :class="[
              'change-value',
              scope.row.change > 0 ? 'positive' : 'negative'
            ]">
              {{ scope.row.change }}
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Top, Bottom } from '@element-plus/icons-vue'

const props = defineProps({
  tableList: {
    type: Array,
    required: true,
    default: () => []
  },
  header: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  tableHeader: {
    type: String,
    default: '项目'
  }
})
</script>

<style scoped>
.table-container {
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.table-header h3 {
  margin-bottom: 4px;
  font-weight: 600;
}

.table-header p {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 16px;
}

.visibility-value {
  font-weight: 600;
}

.change-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.change-icon {
  width: 16px;
  height: 16px;
}

.change-value {
  font-weight: 500;
}

.change-value.positive {
  color: #00b47a;
}

.change-value.negative {
  color: #ff6c6c;
}

:deep(.custom-row) {
  transition: background-color 0.2s ease;
}

:deep(.custom-row:hover) {
  background-color: #f5f7fa !important;
}
</style>