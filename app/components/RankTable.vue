<template>
  <div class="ranking-card">
    <!-- 排名列表 -->
    <div class="ranking-list">
      <div
          v-for="(item, index) in visibleItems"
          :key="item.id"
          class="ranking-item"
          :class="'rank-' + (index + 1)"
      >
        <div v-if="showRank" class="rank">
          <div class="rank-circle">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</div>
          <div class="rank-color" :style="{ backgroundColor: item.color }"></div>
        </div>
        <div class="item-info">
          <div class="item-name">{{ item.name }}</div>
          <div class="item-category" v-if="showCategory">{{ item.category }}</div>
        </div>
        <div class="item-value">{{ item.value }}</div>
        <div class="change-indicator">
          <div class="change-badge" :class="item.changeDirection">
            {{ item.changePercentage }}
          </div>
          <div :class="item.changeDirection">{{ item.score }}</div>
        </div>
      </div>
    </div>

    <!-- 底部操作区 -->
    <div v-if="showPagination || showViewAll" class="card-footer">
      <div v-if="showPagination" class="pagination">
        <button
            class="page-button"
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
        >
          <i class="fas fa-chevron-left material-icons"></i>
        </button>

        <button
            v-for="page in totalPages"
            :key="page"
            class="page-button"
            :class="{ active: page === currentPage }"
            @click="changePage(page)"
        >
          {{ page }}
        </button>
        <button
            class="page-button"
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
        >
          <i class="fas fa-chevron-right material-icons"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 组件属性
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  tabs: {
    type: Array,
    default: () => ['可见性', '互动率', '影响度']
  },
  showRank: {
    type: Boolean,
    default: true
  },
  showCategory: {
    type: Boolean,
    default: true
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  showViewAll: {
    type: Boolean,
    default: true
  },
  itemsPerPage: {
    type: Number,
    default: 5
  }
});

const currentPage = ref(1);

// 计算属性
const visibleItems = computed(() => {
  const startIndex = (currentPage.value - 1) * props.itemsPerPage;
  return props.items.slice(startIndex, startIndex + props.itemsPerPage);
});

const totalPages = computed(() => {
  return Math.ceil(props.items.length / props.itemsPerPage);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<style scoped>
/* 紧凑版样式 */
.ranking-card {
  background: white;
  border-radius: 12px; /* 更小圆角 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  font-family: 'Inter', 'Segoe UI', 'Microsoft YaHei', sans-serif;
  color: #1e293b;
  font-size: 12px; /* 整体字体缩小 */
}


.ranking-list {
  padding: 0;
}

.ranking-item {
  display: grid;
  grid-template-columns: auto 1fr 100px 110px; /* 缩小列宽 */
  align-items: center;
  padding: 12px 16px; /* 原 20px 30px */
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f1f5f9;
}

.ranking-item:hover {
  background-color: #f8fafc;
}

.rank {
  display: flex;
  align-items: center;
  gap: 10px; /* 原 16px */
}

.rank-circle {
  width: 28px; /* 原 36px */
  height: 28px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 10px; /* 原 14px */
}

.rank-1 .rank-circle { background: #FFD700; color: #8B7500; }
.rank-2 .rank-circle { background: #C0C0C0; color: #696969; }
.rank-3 .rank-circle { background: #CD7F32; color: #5D4037; }

.rank-color {
  width: 10px; /* 原 12px */
  height: 10px;
  border-radius: 50%;
}

.item-info {
  overflow: hidden;
}

.item-name {
  font-weight: 600;
  font-size: 10px; /* 原 16px */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-category {
  color: #64748b;
  font-size: 12px; /* 原 14px */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-value {
  font-weight: 600;
  text-align: right;
  font-size: 14px;
}

.change-indicator {
  display: flex;
  align-items: center;
  gap: 6px; /* 原 8px */
  font-weight: 500;
  font-size: 13px;
  justify-content: flex-end;
}


.change-badge {
  padding: 3px 8px;
  border-radius: 10px; /* 原 12px */
  font-size: 11px;
  min-width: 60px;
  text-align: center;
}

.change-badge.up {
  background: #ecfdf5;
  color: #10b981;
}

.change-badge.down {
  background: #fef2f2;
  color: #ef4444;
}

.card-footer {
  padding: 12px 16px; /* 原 20px 30px */
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 6px; /* 原 10px */
}

.page-button {
  width: 30px; /* 原 36px */
  height: 30px;
  border-radius: 8px; /* 原 10px */
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s ease;
}

.page-button:hover:not(:disabled) {
  background: #0ea5e9;
  color: white;
  border-color: #0ea5e9;
}

.page-button.active {
  background: #0ea5e9;
  color: white;
  border-color: #0ea5e9;
}

.page-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
/* 移动端响应式 */
@media (max-width: 768px) {
  .ranking-item {
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    gap: 6px;
    padding: 10px 12px;
  }

  .item-value {
    grid-column: 1;
    grid-row: 2;
    text-align: left;
  }

  .change-indicator {
    grid-column: 2;
    grid-row: 1 / span 2;
    justify-content: flex-end;
  }

  .card-footer {
    padding: 10px 12px;
    flex-direction: column;
    align-items: stretch;
  }
}
</style>