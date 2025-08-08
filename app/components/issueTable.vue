<template>
  <div class="container">
    <el-table
        :data="data"
        style="width: 100%"
        :header-cell-style="{
        background: '#f8f9fa',
        color: '#333',
        fontWeight: '600',
        fontSize: '14px'
      }"
        :cell-style="{ color: '#555' }"
        :row-class-name="tableRowClassName"
        @selection-change="handleSelectionChange"
        @row-click="()=>{
          drawerVisible=true
        }"
    >
      <!-- 修复多选列 -->
      <el-table-column type="selection" width="50" align="center" />

      <!-- 问题列 -->
      <el-table-column prop="issue" label="问题" min-width="300">
        <template #default="scope">
          <div class="issue-cell">
            <span class="issue-text">{{ scope.row.issue }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 平台列 -->
      <el-table-column label="平台" width="160">
        <template #default="scope">
          <div class="platform-icons">
            <el-tooltip
                v-for="(icon, index) in scope.row.platform.icons"
                :key="index"
                :content="getPlatformName(icon)"
                placement="top"
            >
              <img :src="getIconUrl(icon)" :alt="icon" class="platform-icon" />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <!-- 提到 -->
      <el-table-column label="提到" width="120">
        <template #default="scope">
          <div class="mention-cite-container">
            <div class="bar-container">
              <div class="bar-fill" :style="{ width: `${calculateBarWidth(scope.row.mentions.times)}%` }"></div>
            </div>
            <span class="count-label">{{ scope.row.mentions.times }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 引文 -->
      <el-table-column label="引文" width="120">
        <template #default="scope">
          <div class="mention-cite-container">
            <div class="bar-container">
              <!-- 修复数据类型不一致问题 -->
              <div class="bar-fill cite-fill" :style="{ width: `${calculateBarWidth(Number(scope.row.cite.times))}%` }"></div>
            </div>
            <span class="count-label">{{ scope.row.cite.times }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 更新时间 -->
      <el-table-column prop="updated_at" label="更新" width="100" sortable>
        <template #default="scope">
          <span class="update-time">{{ scope.row.updated_at }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 抽屉组件 -->
  <el-drawer
      v-model="drawerVisible"
      title="问题答案详情"
      direction="rtl"
      size="40%"
      :with-header="true"
      class="drawer-container"
  >
    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 问题标题 -->
      <h2 class="question-title">{{ questionData.title }}</h2>

      <!-- 答案内容 -->
      <div class="answer-section">
        <h3>问题答案</h3>
        <div class="answer-content" v-html="questionData.answer"></div>
      </div>

      <!-- 解决结果 -->
      <div class="result-section">
        <h3>解决结果</h3>
        <div :class="['result-status', questionData.success ? 'success' : 'error']">
          {{ questionData.success ? '解决成功 ✓' : '解决失败 ✗' }}
        </div>
      </div>

      <!-- 引用统计 -->
      <div class="reference-section">
        <h3>引用统计</h3>
        <el-row :gutter="20" class="stats-row">
          <el-col :span="12">
            <el-statistic title="被引用次数" :value="questionData.referenceCount" />
          </el-col>
          <el-col :span="12">
            <el-statistic title="本周引用" :value="questionData.weeklyReferences" />
          </el-col>
        </el-row>

        <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="referencePercentage"
            status="success"
            class="progress-bar"
        />
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface PlatformData {
  icons: string[];
  result: string;
}

interface MentionData {
  date: string;
  times: number;
}

interface CiteData {
  date: string;
  times: number | string; // 修复数据类型问题
}

interface IssuesDetails {
  id: string;
  issue: string;
  platform: PlatformData;
  mentions: MentionData;
  cite: CiteData;
  updated_at: string;
  checked?: boolean;
}

const data = ref<IssuesDetails[]>([
  {
    id: '1',
    issue: '项目管理中频繁更改优先级会产生什么后果？',
    platform: {
      icons: ['weibo', 'zhihu', 'douban'],
      result: 'positive'
    },
    mentions: {
      date: '2023-10-01',
      times: 7
    },
    cite: {
      date: '2023-10-01',
      times: 5 // 修复为数字类型
    },
    updated_at: '2天前'
  },
  {
    id: '2',
    issue: 'AI 生成内容是否应标注来源？',
    platform: {
      icons: ['weibo', 'bilibili'],
      result: 'neutral'
    },
    mentions: {
      date: '2023-10-02',
      times: 3
    },
    cite: {
      date: '2023-10-02',
      times: 8 // 修复为数字类型
    },
    updated_at: '1天前'
  }
]);

const platformNames: Record<string, string> = {
  weibo: '微博',
  zhihu: '知乎',
  douban: '豆瓣',
  bilibili: 'B站',
  tieba: '贴吧'
};

// 获取平台名称
const getPlatformName = (icon: string): string => platformNames[icon] || icon;

// 获取图标 URL
const getIconUrl = (icon: string): string => {
  const icons: Record<string, string> = {
    weibo: 'https://cdn.icon-icons.com/icons2/2108/PNG/512/weibo_icon_130777.png',
    zhihu: 'https://cdn.icon-icons.com/icons2/2108/PNG/512/zhihu_icon_130776.png',
    douban: 'https://cdn.icon-icons.com/icons2/2108/PNG/512/douban_icon_130775.png',
    bilibili: 'https://cdn.icon-icons.com/icons2/2108/PNG/512/bilibili_icon_130774.png',
    tieba: 'https://cdn.icon-icons.com/icons2/2108/PNG/512/tieba_icon_130773.png'
  };
  return icons[icon] || 'https://via.placeholder.com/20';
};

// 行类名
const tableRowClassName = ({ rowIndex }: { rowIndex: number }) =>
    rowIndex % 2 === 0 ? 'table-row-even' : '';

// 处理选中事件
const handleSelectionChange = (val: IssuesDetails[]) => {
  console.log('Selected rows:', val);
};

// 动态计算柱状图宽度 (0-10次为100%)
const calculateBarWidth = (value: number): number => {
  const max = 10; // 最大显示值
  return Math.min(100, (value / max) * 100);
};
import {computed } from 'vue';

const drawerVisible = ref(false);

// 问题数据（实际应用中应通过props传入）
const questionData = ref({
  title: '如何处理Vue3中的响应式数据失效问题？',
  answer: `在 Vue 3 中，响应式系统得到了显著的改进，主要是通过使用 Proxy 对象来替代 Vue 2 中的 Object.defineProperty 方法。尽管如此，在某些情况下，你可能会遇到响应式数据失效的问题。以下是一些常见原因及其解决方法：

1. **确保正确地创建响应式数据**：
   - 使用 \`reactive()\` 函数将对象转换为响应式对象。
   - 使用 \`ref()\` 函数创建一个包含值的响应式引用（对于基本数据类型）。

2. **解构导致的响应式丢失**：
   - 当从响应式对象中解构属性时，会丢失响应性。为了解决这个问题，可以使用 \`toRefs()\` 将响应式对象的所有属性都转换为响应式的 ref。

3. **数组索引和长度的修改**：
   - Vue 3 的响应式系统能够检测到直接通过索引或修改数组长度对数组进行的变更。但是，如果你直接替换整个数组或者对数组内部元素进行重新赋值操作，可能需要手动触发更新。

4. **深层响应式问题**：
   - Vue 3 默认情况下会对对象进行深度监听，但如果动态添加新的根级属性，则需要使用 \`reactive\` 或者 \`ref\` 来包裹这些新属性以保持其响应性。

5. **使用计算属性和侦听器**：
   - 如果你的应用逻辑较为复杂，考虑使用 \`computed\` 创建计算属性，以及 \`watch\` 来监听特定的数据变化。

6. **检查是否正确使用了 \`.value\`**：
   - 当你在模板外使用 \`ref\` 时，记得访问其值需要加上 \`.value\`。在模板内则不需要这样做，Vue 会自动解包 \`ref\`。

7. **避免在 setup 函数外部改变响应式状态**：
   - 确保所有的状态更改都在 Vue 的响应式系统内完成，例如不要在全局作用域或非 Vue 管理的函数中直接修改状态。

如果上述方法都不能解决问题，那么可能需要进一步调试代码，查看控制台输出，确认是否存在任何警告或错误信息，这些往往能提供解决问题的线索。同时，也可以参考 Vue 3 的官方文档或社区资源获取更多帮助。`,
  success: true,
  referenceCount: 42,
  weeklyReferences: 8,
  maxReferences: 50
});

// 计算引用百分比
const referencePercentage = computed(() => {
  return Math.min(100, Math.round(
      (questionData.value.referenceCount / questionData.value.maxReferences) * 100
  ));
});
</script>

<style scoped>
.container {
  width: 100%;
  overflow-x: auto;
}

/* 表格样式优化 */
:deep(.el-table th) {
  font-weight: 600 !important;
  color: #333 !important;
  background-color: #f8f9fa !important;
  position: sticky;
  top: 0;
  z-index: 2;
}

:deep(.el-table .table-row-even) {
  background-color: #fafafa;
}

:deep(.el-table .table-row-even:hover) {
  background-color: #f5f7fa;
}

/* 问题列样式 */
.issue-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.issue-text {
  font-weight: 500;
  color: #1a1a1a;
  line-height: 1.4;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 平台图标 */
.platform-icons {
  display: flex;
  gap: 6px;
  align-items: center;
}

.platform-icon {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  object-fit: cover;
  transition: all 0.2s ease;
}

.platform-icon:hover {
  transform: scale(1.2);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
}

/* 提到和引文容器 */
.mention-cite-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bar-container {
  width: 60px;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background-color: #409eff; /* 蓝色 */
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.cite-fill {
  background-color: #67c23a; /* 绿色 */
}

.count-label {
  min-width: 20px;
  text-align: right;
  font-size: 13px;
  color: #666;
}

/* 更新时间 */
.update-time {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .issue-cell {
    flex-direction: column;
    align-items: flex-start;
  }

  .issue-text {
    font-size: 14px;
  }

  .mention-cite-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .bar-container {
    width: 40px;
  }
}

@media (max-width: 480px) {
  :deep(.el-table__cell) {
    padding: 8px 0;
  }

  .platform-icons {
    flex-wrap: wrap;
  }

  .platform-icon {
    width: 18px;
    height: 18px;
  }
}
.drawer-container {
  padding: 20px;
}

.content-wrapper {
  padding: 10px;
}

.question-title {
  color: #409EFF;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.answer-section, .result-section, .reference-section {
  margin-bottom: 25px;
}

.answer-content {
  background: #f8f9fa;
  border-radius: 4px;
  padding: 15px;
  border-left: 4px solid #409EFF;
}

.result-status {
  font-size: 18px;
  font-weight: bold;
  padding: 8px 15px;
  border-radius: 4px;
  display: inline-block;
}

.result-status.success {
  background-color: #f0f9eb;
  color: #67c23a;
  border: 1px solid #e1f3d8;
}

.result-status.error {
  background-color: #fef0f0;
  color: #f56c6c;
  border: 1px solid #fde2e2;
}

.stats-row {
  margin-bottom: 15px;
}

.progress-bar {
  margin-top: 20px;
}
</style>