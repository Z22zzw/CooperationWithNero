<script setup lang="ts">
import { ref, computed } from 'vue'
import MarkdownIt from 'markdown-it' // 用其他markdown渲染工具同理
import { parseDocument } from 'htmlparser2'
import { filterXSS } from 'xss'
import { defineProps, withDefaults } from 'vue'
import {Loading} from "@element-plus/icons-vue"; // 增加 prop 相关功能

interface Props {
  loading?: boolean
  apiUrl?: string;           // 自定义 API 地址
  message: string;          // 外部传入的问题消息
  autoStart: boolean;       // 是否自动开始请求
  answer?: string;
}

const props = withDefaults(defineProps<Props>(), {
  answer:"",
  loading:true,
  message: '推荐湖北做geo的公司',
  autoStart: false,
});

// 声明要触发的事件
const emit = defineEmits<{
  (e: 'complete', value: string): void;         // 流结束时触发
  (e: 'error', error: Event): void;// 错误事件
  (e: 'update:loading', value: boolean): void;
}>();
const md = new MarkdownIt({
  breaks: true,
})
let str = ref(props.answer),
    content = ref(props.answer)
// 流式输出
let eventSource: EventSource | null = null
function mockStream() {
  if (eventSource) {
    eventSource.close()
    console.log('Previous SSE connection closed')
  }
  eventSource = new EventSource(`/api/askaiai?message=${props.message}`);
  str.value= ''
  content.value = ''
  eventSource.onmessage = (event) => {
    // 解析数据
    const parsedData = event.data;
    str.value += parsedData
    content.value = str.value
  };
  eventSource.addEventListener('complete', () => {
    eventSource?.close();
    console.log("SSE流结束");
    console.log(str.value);
    emit('complete', str.value)
  });
  // 错误处理
  eventSource.onerror = (err) => {
    emit('error', err)
    console.error("SSE错误:", err);
  };
}

const processedContent = computed(
    () => str.value.replace(/-\*\*/g, '- **')
)
// html转ast
const renderedContent = computed(() => {
  const markdown = processedContent.value
  const html = md.render(markdown)           // Markdown -> HTML
  const cleanHtml = filterXSS(html)          // ✅ 安全净化（支持 SSR）
  const ast = parseDocument(cleanHtml)       // HTML -> AST
  return ast.children                        // 返回子节点用于渲染
})

const MarkdownNodeRenderer = defineComponent({
  name: 'MarkdownNodeRenderer',
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  render() {
    const { node } = this
    // 文本节点
    if (node.type === 'text') {
      return node.data
    }
    // 元素节点
    if (node.type === 'tag') {
      return h(
          node.name, // 注意：是 node.name，不是 tagName
          { ...node.attribs },
          Array.isArray(node.children)
              ? node.children.map((child, index) =>
                  h(MarkdownNodeRenderer, {
                    node: child,
                    key: index, // 建议使用更稳定 key，如 child.data || index
                  })
              )
              : []
      )
    }
    // 其他类型（如 comment）忽略
    return null
  },
})
watch(
    () => props.autoStart,
    (autoStart) => {
      if (autoStart && props.message) {
        str.value = ''
        content.value = ''
        mockStream()
      }
    },
    { immediate: true }
)

watch(
    () => content.value,
    (newContent) => {
      if (newContent.length > 0) {
        emit("update:loading", false)
      }
    }
)

onUnmounted(() => {
  if (eventSource) {
    eventSource.close()
    eventSource = null
  }
})
</script>

<template>
  <div>
    <div v-if="props.loading" class="loading-indicator">
      <el-icon class="is-loading" size="20">
        <Loading />
      </el-icon>
      <span>AI思考中...</span>
    </div>
    <div class="markdown" v-else>
      <MarkdownNodeRenderer v-for="(node, index) in renderedContent" :key="index" :node="node" />
    </div>
  </div>
</template>