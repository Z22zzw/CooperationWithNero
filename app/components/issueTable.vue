<template>
  <div class="container">
    <el-table
        :data="displayData"
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
        @row-click="handleRowClick"
    >
      <!-- 修复多选列 -->
      <el-table-column type="selection" width="50" align="center" />

      <el-table-column prop="issue" label="id" min-width="300" v-if="false">
        <template #default="scope">
          <div class="issue-cell">
            <span class="issue-text">{{ scope.row.id }}</span>
          </div>
        </template>
      </el-table-column>
      <!-- 问题列 -->
      <el-table-column prop="issue" label="问题" min-width="300">
        <template #default="scope">
          <div class="issue-cell">
            <span class="issue-text">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 平台列 -->
      <el-table-column label="平台" width="160">
        <template #default="scope">
          <div class="platform-icons">
            <el-tooltip
                v-for="(icon, index) in platform.icons"
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
              <div class="bar-fill" :style="{ width: `${calculateBarWidth(scope.row.mention_times)}%` }"></div>
            </div>
            <span class="count-label">{{ scope.row.mention_times }}</span>
          </div>
        </template>
      </el-table-column>

      <!-- 引文 -->
      <el-table-column label="引文" width="120">
        <template #default="scope">
          <div class="mention-cite-container">
            <div class="bar-container">
              <div class="bar-fill cite-fill" :style="{ width: `${calculateBarWidth(scope.row.citations)}%` }"></div>
            </div>
            <span class="count-label">{{ scope.row.citations }}</span>
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


    <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="pagination"
    />
  </div>
  <!-- 抽屉组件 -->
  <el-drawer
      v-model="drawerVisible"
      direction="rtl"
      size="40%"
      :with-header="true"
      class="drawer-container"
      @close="handleDrawerClose"
  >
    <!-- 内容区域 -->
    <div class="content-wrapper">
      <!-- 问题标题 -->
      <h2 class="question-title">{{ questionData.title }}</h2>

      <!-- 答案内容 -->
      <div class="answer-section">
        <tabcard
            :tabs="tabs"
            :active-value="currentTab"
            @update:active-value="currentTab=$event"
        />
          <markdown
              :key="questionData.id + '_' + currentTab"
              :answer="result"
              :loading="Loading"
              @update:loading="Loading=$event"
              :message="messageForAI"
              :auto-start="shouldStartStreaming"
              @complete="handleAnswerComplete"
          />
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
import {computed, ref} from 'vue';
import Markdown from "~/components/markdown.vue";
import {useQuestionStore} from "~/stores/QuestionsStore";
const drawerVisible = ref(false);
const questionData = ref({
  id:"",
  title: '',
  answer: "",
  success: true,
  referenceCount: 0,
  weeklyReferences: 0,
  maxReferences: 0
})
const messageForAI=computed(() => {
  return questionData.value.title
})
const AllKnownQuestions = useQuestionStore()
const currentTab = ref('deepseek')
const Loading=ref(true);
const shouldStartStreaming = computed(() => {
  if ((!AllKnownQuestions.has(questionData.value.id, currentTab.value))&&drawerVisible.value){
    Loading.value = true
  }
  return (!AllKnownQuestions.has(questionData.value.id, currentTab.value))&&drawerVisible.value
})

const result = computed(() => {
  const id = questionData.value.id
  const tab = currentTab.value
  if (!id) return ""
  Loading.value = false
  return AllKnownQuestions.get(id, tab) || ""
})

function handleRowClick(row:IssuesDetails) {
  drawerVisible.value=true
  questionData.value.id = ''
  nextTick(() => {
    questionData.value.id = row.id
    questionData.value.title = row.name
  })
}
function handleAnswerComplete(value:string) {
  AllKnownQuestions.set(questionData.value.id,currentTab.value,value)
}
function handleDrawerClose(){
  currentTab.value="deepseek"
  Loading.value = true
  drawerVisible.value = false
  questionData.value.id = ''
  AllKnownQuestions.show()
}










































































const currentPage = ref(1);
const pageSize = ref(10);
const displayData = ref<IssuesDetails[]>([]);
const selectedIds = ref<string[]>([]);
// { name: '引文', value: 'citations' }
const tabs = ref([
  {name: "deepseek", value: 'deepseek' },
  {name: "豆包", value: 'doubao' },
  {name:"通义千问", value: 'tongyiqianwen' },
  {name: "文心一言",value: "wenxinyiyan"},
])

interface IssuesDetails {
  id: string;
  name: string;
  mention_times: number;
  citations: number;
  updated_at: string;
}
const platform={
  icons:[
      "deepseek",
      "doubao",
      "wenxinyiyan",
      "tongyi"
  ]
}
const projectId=ref(useRoute().params.id)
// 使用 useFetch 获取数据
const { data, pending, error, refresh } = await useFetch<IssuesDetails[]>('/api/issues', {
  method: 'POST',
  body: {
    project_id: projectId.value
  },
  key: `issues-list-${projectId.value}`, // 缓存 key，支持刷新
  watch: [projectId] // 当 projectId 变化时自动重新请求
})
// 响应式数据
const issuesData = computed(() => data.value || [])
const total = computed(() => issuesData.value.length)
console.log(issuesData.value)

const platformNames: Record<string, string> = {
  deepseek: "deepseek",
  doubao: "豆包",
  wenxinyiyan: "文心一言",
  chatgpt: "chatGPT",
  tongyi: "通义千问",
};
// 获取平台名称
const getPlatformName = (icon: string): string => platformNames[icon] || icon;
// 获取图标 URL
const getIconUrl = (icon: string): string => {
  const icons: Record<string, string> = {
    deepseek: "https://www.deepseek.com/favicon.ico",
    doubao: "https://lf-flow-web-cdn.doubao.com/obj/flow-doubao/doubao/logo-doubao-overflow.png",
    wenxinyiyan: "https://ts3.tc.mm.bing.net/th/id/ODF.E7UidNlvlYHWxOkPLoQCug?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2",
    chatgpt: "https://chat.openai.com/favicon.ico",
    tongyi: "https://img.alicdn.com/imgextra/i4/O1CN01EfJVFQ1uZPd7W4W6i_!!6000000006051-2-tps-112-112.png",
  };
  return icons[icon] || 'https://via.placeholder.com/20';
};
// 行类名
const tableRowClassName = ({ rowIndex }: { rowIndex: number }) =>
    rowIndex % 2 === 0 ? 'table-row-even' : '';
const emit = defineEmits<{
  (e: 'selection-changed', ids: string[]): void
}>();
// 处理选中事件
const handleSelectionChange = (selection: any[]) => {
  selectedIds.value = selection.map(item => item.id);
  // 实时将选中的 id 数组传给父组件
  emit('selection-changed', selectedIds.value);
};
// 动态计算柱状图宽度 (0-10次为100%)
const calculateBarWidth = (value: number): number => {
  const max = 10; // 最大显示值
  return Math.min(100, (value / max) * 100);
};
// 问题数据（实际应用中应通过props传入）
// 计算引用百分比
const referencePercentage = computed(() => {
  return Math.min(100, Math.round(
      (questionData.value.referenceCount / questionData.value.maxReferences) * 100
  ));
});
// 每页条数变化处理
const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
  updateDisplayData();
};
// 页码变化处理
const handleCurrentChange = (page:number) => {
  currentPage.value = page;
  updateDisplayData();
};
const updateDisplayData = () => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  displayData.value = issuesData.value.slice(start, end);
};
watch(() => issuesData.value, // 注意是 .value
    (newValue, oldValue) => {
      updateDisplayData();
    }
)
updateDisplayData();
</script>

<style scoped>
.cursor {
  display: inline-block;
  width: 1px;
  height: 1em;
  background-color: currentColor;
  animation: blink 1s infinite;
  vertical-align: middle;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
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
  cursor: pointer;
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