<template>
  <div class="question-container">
    <!-- 相关问题列表区域 -->
    <div class="related-questions" v-if="activeTab === '问题'">
      <div class="related-questions-header">
        <h3>相关问题</h3>
        <p>
          我们数据集中的问题，其中该领域至少被引用过一次。您可以选择这些问题并将其添加到项目中，以进行更详细的监控、报告和分析。
        </p>
        <button class="close-btn" @click="showRelatedQuestions = !showRelatedQuestions">
          {{ showRelatedQuestions ? '收起' : '展开' }}
          <i
              class="fa"
              :class="showRelatedQuestions ? 'fa-caret-up' : 'fa-caret-down'"
              aria-hidden="true"
          ></i>
        </button>
      </div>
      <div class="questions-table" v-show="showRelatedQuestions">
        <table class="questions-table-inner">
          <thead>
          <tr>
            <th style="width: 20px;">
              <input type="checkbox" @change="toggleAll" :checked="isAllChecked" />
            </th>
            <th>问题</th>
            <th>平台</th>
            <th>首次引用</th>
            <th>上次引用</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="(item, index) in displayedQuestions"
              :key="index"
              :class="{ 'selected-row': item.checked }"
          >
            <td>
              <input
                  type="checkbox"
                  :checked="item.checked"
                  @change="(e) => handleCheckItem(item, e.target.checked)"
              />
            </td>
            <td>{{ item.question }}</td>
            <td>
              <div class="platform-icons">
                <span
                    v-for="(icon, iconIndex) in item.platformIcons"
                    :key="iconIndex"
                    class="platform-icon"
                    :style="{ backgroundColor: icon.color }"
                ></span>
              </div>
            </td>
            <td>{{ item.firstCite }}</td>
            <td>{{ item.lastCite }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页区域 -->
      <div class="pagination">
        <div class="per-page">
          <label for="perPage">每页行数</label>
          <select id="perPage" v-model="perPage" @change="handlePerPageChange">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div class="page-nav">
          <button
              class="page-btn"
              @click="goToPrevPage"
              :disabled="currentPage === 1"
          >
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
          </button>
          <div class="page-numbers">
            <button
                v-for="n in visiblePages"
                :key="n"
                @click="currentPage = n"
                :class="{ 'page-number': true, active: currentPage === n }"
            >
              {{ n }}
            </button>
          </div>
          <button
              class="page-btn"
              @click="goToNextPage"
              :disabled="currentPage >= totalPages"
          >
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// 模拟数据结构，实际可从接口获取
interface QuestionItem {
  question: string;
  platformIcons: { color: string }[];
  firstCite: string;
  lastCite: string;
  checked: boolean;
}

const activeTab = ref('问题');
const showRelatedQuestions = ref(true);
const questionCount = ref(81); // 模拟问题数量
const questions = ref<QuestionItem[]>([
  {
    question: 'Gdzie 去 buty nike?',
    platformIcons: [
      { color: '#787878' },
      { color: '#42b883' },
    ],
    firstCite: '2个月前',
    lastCite: '23小时前',
    checked: false,
  },
  {
    question: '哪双鞋整天站立最舒服？',
    platformIcons: [
      { color: '#42b883' },
    ],
    firstCite: '1天前',
    lastCite: '1天前',
    checked: false,
  },
  {
    question: '为什么运动员应该考虑在家庭恢复程序中使用水浴？',
    platformIcons: [
      { color: '#787878' },
      { color: '#42b883' },
      { color: '#FF9800' },
    ],
    firstCite: '3周前',
    lastCite: '2天前',
    checked: false,
  },
  {
    question: '100 美元以下最实惠的跑鞋？',
    platformIcons: [
      { color: '#FF9800' },
    ],
    firstCite: '1个月前',
    lastCite: '1周前',
    checked: false,
  },
  {
    question: '100 美元以下最实惠的跑鞋？',
    platformIcons: [
      { color: '#FF9800' },
    ],
    firstCite: '1个月前',
    lastCite: '1周前',
    checked: false,
  },
  {
    question: '100 美元以下最实惠的跑鞋？',
    platformIcons: [
      { color: '#FF9800' },
    ],
    firstCite: '1个月前',
    lastCite: '1周前',
    checked: false,
  },
  {
    question: '100 美元以下最实惠的跑鞋？',
    platformIcons: [
      { color: '#FF9800' },
    ],
    firstCite: '1个月前',
    lastCite: '1周前',
    checked: false,
  },
  {
    question: '100 美元以下最实惠的跑鞋？',
    platformIcons: [
      { color: '#FF9800' },
    ],
    firstCite: '1个月前',
    lastCite: '1周前',
    checked: false,
  },


  // 添加更多问题...
]);
const perPage = ref(25);
const currentPage = ref(1);

// 计算属性：当前页数据
const displayedQuestions = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return questions.value.slice(start, end);
});

// 计算总页数
const totalPages = computed(() =>
    Math.ceil(questions.value.length / perPage.value)
);

// 计算可见页码（带省略号逻辑）
const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;

  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    const start = Math.max(1, currentPage.value - 2);
    const end = Math.min(totalPages.value, start + maxVisible - 1);

    if (start > 1) pages.push(1);
    if (start > 2) pages.push('...');

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages.value - 1) pages.push('...');
    if (end < totalPages.value) pages.push(totalPages.value);
  }

  return pages;
});

// 全选逻辑
const isAllChecked = computed(() =>
    questions.value.every((item) => item.checked) && questions.value.length > 0
);
const toggleAll = (e: Event) => {
  const isChecked = (e.target as HTMLInputElement).checked;
  questions.value.forEach((item) => {
    item.checked = isChecked;
  });
};
const handleCheckItem = (item: QuestionItem, isChecked: boolean) => {
  item.checked = isChecked;
};

// 分页逻辑
const handlePerPageChange = () => {
  currentPage.value = 1;
};
const goToPrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

<style scoped>
.question-container {
  width: 100%;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

.related-questions-header {
  margin-bottom: 16px;
  position: relative;
}

.related-questions-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.related-questions-header p {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
  max-width: 80%;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #4b5563;
  transition: all 0.2s;
}

.close-btn:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

.questions-table {
  width: 100%;
  overflow-x: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-top: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}

.questions-table-inner {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.questions-table-inner th {
  text-align: left;
  padding: 12px 16px;
  background-color: #f9fafb;
  color: #374151;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
}

.questions-table-inner td {
  text-align: left;
  padding: 14px 16px;
  border-bottom: 1px solid #f3f4f6;
  color: #4b5563;
}

.questions-table-inner tr:last-child td {
  border-bottom: none;
}

.questions-table-inner tr:hover {
  background-color: #f9fafb;
}

.questions-table-inner tr.selected-row {
  background-color: #f0fdf4;
}

.questions-table-inner input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.platform-icons {
  display: flex;
  gap: 6px;
}

.platform-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
  position: fixed;
  bottom: 50px;
  width: 950px
}

.per-page {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4b5563;
}

.per-page select {
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #fff;
  font-size: 14px;
  color: #4b5563;
  cursor: pointer;
  outline: none;
  transition: border 0.2s;
}

.per-page select:focus {
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.page-nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.page-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  color: #4b5563;
  transition: all 0.2s;
}

.page-btn:not(:disabled):hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

.page-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.page-numbers {
  display: flex;
  margin: 0 8px;
}

.page-number {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  background-color: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #4b5563;
  transition: all 0.2s;
}

.page-number:hover:not(.active) {
  background-color: #f3f4f6;
}

.page-number.active {
  background-color: #42b883;
  color: #fff;
  border-color: #42b883;
  font-weight: 500;
}
</style>