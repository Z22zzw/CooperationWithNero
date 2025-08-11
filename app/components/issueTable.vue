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
<!--        <h3>问题答案</h3>-->
        <tabcard :tabs="tabs"
                  :active-value="currentTab"
                  @update:active-value="currentTab = $event"
                  @click="askAi(currentTab)"
        />
        <div v-if="isStreaming" class="streaming-indicator">
          <i class="el-icon-loading"></i> 努力回答中... (已接收 {{ receivedChars }} 字符)
        </div>
        <div class="answer-content" v-html="questionData.answer"></div>
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

import MarkdownIt from "markdown-it";
import {Fetcher} from "~/composables/fetcher";
const receivedChars=ref<number>(0)
const currentPage = ref(1);
const isStreaming = ref(false);
const md = new MarkdownIt();

const streamingController = ref<AbortController | null>(null);
// 修改后的 askAi 函数
const askAi = async (value: string) => {
  if (value === 'citations') return;

  // 如果已有流式传输在运行，先取消它
  if (streamingController.value) {
    streamingController.value.abort();
  }

  isLoading.value = true;
  isStreaming.value = true;
  receivedChars.value = 0;
  questionData.value.rawAnswer = ''; // 存储原始文本
  questionData.value.answer = md.render('AI正在思考中...'); // 初始提示
  await nextTick();

  try {
    // 创建新的 AbortController
    const controller = new AbortController();
    streamingController.value = controller;

    const response = await fetch(
        `http://192.168.0.10:8080/api/askaiai?message=${encodeURIComponent(clickedRowData.value?.name || '')}`,
        { signal: controller.signal }
    );

    if (!response.ok) {
      throw new Error(`HTTP错误! 状态码: ${response.status}`);
    }

    if (!response.body) {
      throw new Error('当前浏览器不支持流式API');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let accumulatedData = '';
    let contentAvailable = false;

    // 处理流式数据
    while (true) {
      const { done, value: chunk } = await reader.read();
      if (done) break;

      // 将二进制数据转换为文本
      const textChunk = decoder.decode(chunk, { stream: true });
      accumulatedData += textChunk;
      receivedChars.value += textChunk.length;

      // 处理服务器返回的特定格式
      const lines = accumulatedData.split('\n');

      // 保留最后一行（可能是不完整的）
      accumulatedData = lines.pop() || '';

      // 处理每一行
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const content = line.substring(5).trim();
          contentAvailable = true;

          // 更新原始文本
          questionData.value.rawAnswer += content;

          // 实时更新显示内容
          questionData.value.answer = md.render(questionData.value.rawAnswer);

          // 确保视图更新
          await nextTick();
        }
      }
    }

    // 处理剩余数据
    if (accumulatedData) {
      if (accumulatedData.startsWith('data:')) {
        const content = accumulatedData.substring(5).trim();
        questionData.value.rawAnswer += content;
        questionData.value.answer = md.render(questionData.value.rawAnswer);
        await nextTick();
      }
    }

    // 如果没有任何有效内容
    if (!contentAvailable) {
      throw new Error('服务器返回了响应但没有实际内容');
    }

  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.log('用户取消了请求');
    } else {
      console.error('流处理错误:', error);

      // 显示已接收的内容
      if (questionData.value.rawAnswer) {
        questionData.value.answer = md.render(
            questionData.value.rawAnswer +
            '\n\n<错误> 数据流处理不完整: ' + error
        );
      } else {
        questionData.value.answer = '<p>⚠️ 获取回答时出错，请重试</p>';
      }
    }
  } finally {
    isLoading.value = false;
    isStreaming.value = false;
    streamingController.value = null;
  }
};

// 在抽屉关闭时取消流式传输
const handleDrawerClose = () => {
  if (streamingController.value) {
    streamingController.value.abort();
  }
  drawerVisible.value = false;
};


const pageSize = ref(10);
const total = ref(0);
const isLoading=ref(true);
const displayData = ref<IssuesDetails[]>([]);

const selectedIds = ref<string[]>([]);

const tabs = ref([
  {name: "deepseek", value: 'deepseek' },
  {name: "豆包", value: 'doubao' },
  {name:"通义千问", value: 'tongyiqianwen' },
  {name: "文心一言",value: "wenxinyiyan"},
  { name: '引文', value: 'citations' }
])

const currentTab = ref('deepseek')
const drawerVisible = ref(false);
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
const clickedRowData = ref<IssuesDetails>();
const questionData = ref({
  title: 'UNKNOW',
  rawAnswer: 'UNKNOW',
  answer: md.render(`UNKNOW`),
  success: true,
  referenceCount: 0,
  weeklyReferences: 0,
  maxReferences: 0
});
const handleRowClick=(row: IssuesDetails)=>{
  clickedRowData.value = row;
  console.log('点击的行数据:', row);
  questionData.value=
      {
        title: row.name,
        rawAnswer: "UNKNOW",
        answer: md.render(`UNKNOW`),
        success: true,
        referenceCount: row.citations,
        weeklyReferences: row.mention_times,
        maxReferences: 500
      }
  askAi("deepseek")
  drawerVisible.value = true;
}
const data = ref<IssuesDetails[]>([]);
const fetchData = () => {
  Fetcher().withHeader({
    "Content-Type": 'application/json',
  }).withBaseUrl("http://192.168.0.10:8080").post<IssuesDetails[]>("/api/issues",
      {
        project_id:useRoute().params.id
      }
  ).then((result) => {
    data.value = result
    total.value = result.length
    updateDisplayData()

  }).catch((error) => {
    console.error('请求失败:', error)
    data.value = []
    total.value = 0
  });
  total.value = data.value.length;
}
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
  displayData.value = data.value.slice(start, end);
};
fetchData();
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