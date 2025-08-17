<template>
  <!-- 页面横幅 -->
  <section v-if="!isRead" class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <h1>GEO博客</h1>
          <p>探索最新的生成式引擎优化技术和行业动态</p>
        </div>
        <div class="hero-image">
          <div class="tech-animation">
            <i class="fas fa-book"></i>
            <i class="fas fa-newspaper"></i>
            <i class="fas fa-lightbulb"></i>
          </div>
        </div>
      </div>
  </section>
  <section v-if="!isRead" class="blog">
      <div class="container">
        <!-- 搜索框 -->
        <div class="search-box">
          <div class="search-form">
            <input type="text" placeholder="搜索文章..." v-model="searchQuery" @input="handleSearch" />
            <button @click="handleSearch">搜索</button>
          </div>
        </div>

        <div class="blog-container">
          <!-- 主内容区 -->
          <div class="blog-main">
            <!-- 加载状态 -->
            <div v-if="loading" class="loading">
              <BaseLoading width="80%" height="300px"/>
              <p>加载中，请稍后</p>
            </div>

            <!-- 文章列表 -->
            <div v-else class="blog-posts">
              <!-- 显示筛选后的文章 -->
              <article
                  v-for="article in filteredArticles"
                  :key="article.id"
                  class="blog-post"
              >
                <!-- Flex 容器：图片左，内容右 -->
                <div class="post-flex">
                  <!-- 左侧：缩小的图片 -->
                  <div class="post-image">
                    <img :src="article.imgUrl" :alt="article.title" />
<!--                    <span class="category-label">GEO技术</span>-->
                  </div>

                  <!-- 右侧：文章内容 -->
                  <div class="post-content">
                    <div class="post-meta">
                      <span class="date">
                        <i class="far fa-calendar-alt"></i>
                        {{ formatDate(article.sendDate) }}
                      </span>
                    </div>
                    <h3>
                      <a href="#" @click.prevent="readArticle(article)">
                        {{ article.title }}
                      </a>
                    </h3>
                    <p>{{ article.subTitle }}</p>
                    <div class="post-footer">
                      <a href="#" class="read-more" @click.prevent="readArticle(article)">
                        阅读更多 <i class="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </article>

              <!-- 搜索无结果 -->
              <div v-if="filteredArticles.length === 0 && !loading" class="no-results">
                <i class="fas fa-search"></i>
                <h3>没有找到匹配的文章</h3>
                <p>请尝试其他搜索关键词或浏览我们的热门文章</p>
                <button @click="resetSearch" class="reset-btn">显示所有文章</button>
              </div>
            </div>

            <!-- 分页控件 -->
            <div class="pagination" v-if="totalPages > 1 && !loading">
              <a href="#" @click.prevent="prevPage" :disabled="currentPage === 1">
                <i class="fas fa-chevron-left"></i>
              </a>
              <a
                  v-for="page in totalPages"
                  :key="page"
                  href="#"
                  :class="{ active: currentPage === page }"
                  @click.prevent="changePage(page)"
              >
                {{ page }}
              </a>
              <a href="#" @click.prevent="nextPage" :disabled="currentPage === totalPages">
                <i class="fas fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  <ViewReadView v-else
      :section="articleContent"
      @back="goBack"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { type Article, ArticleAnalysis } from '~/components/BackEnd/ArticleAnalysis'
import { useReadState } from '~/composables/useReadState'
const isRead=useReadState()
const articleContent=ref("")
// 当前页码
const currentPage = ref(1)

// 搜索关键词
const searchQuery = ref('')

// 总页数（来自后端）
const totalPages = ref(1)

// 当前页文章列表（后端分页结果）
const articles = ref<Article[]>([])

// 加载状态
const loading = ref(false)

// 格式化日期
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}


// 筛选后的文章（仅用于搜索，不分页）
const filteredArticles = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return articles.value

  return articles.value.filter(
      (article) =>
          article.title.toLowerCase().includes(query) ||
          article.subTitle.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query)
  )
})

// 加载指定页的文章
const loadArticles = async () => {
  if (loading.value) return

  loading.value = true
  try {
    const result = await ArticleAnalysis(currentPage.value)
    articles.value = result.articles
    totalPages.value = result.totalPages
  } catch (error) {
    console.error('加载文章失败:', error)
    articles.value = []
  } finally {
    loading.value = false
  }
}

// 换页
const changePage = async (page: number) => {
  if (page >= 1 && page <= totalPages.value && !loading.value) {
    currentPage.value = page
    await loadArticles()
    window.scrollTo({ top: 700, behavior: 'smooth' })
  }
}

const prevPage = () => changePage(currentPage.value - 1)
const nextPage = () => changePage(currentPage.value + 1)

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
  loadArticles() // 重新加载第一页数据（支持后端搜索更佳）
}

// 重置搜索
const resetSearch = () => {
  searchQuery.value = ''
  currentPage.value = 1
  loadArticles()
}
const scrollPosition = ref(0)
// 阅读文章
const readArticle = (article: Article) => {
  isRead.value = true
  articleContent.value=article.content
  scrollPosition.value = window.scrollY
}

// 页面加载时获取第一页数据
onMounted(() => {
  loadArticles()
})
const goBack = () => {
  isRead.value = false
  setTimeout(() => {
    window.scrollTo(0, scrollPosition.value)
  }, 0)
};
</script>

<style scoped>
/* 整体博客区域 */
.blog {
  background-color: #f9fafa;
  padding: 40px 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.container h2{
  text-align: center;
}

/* 搜索框美化 */
.search-box {
  text-align: center;
  margin-bottom: 40px;
}

.search-form {
  display: inline-flex;
  border: 2px solid #007bff;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.1);
}

.search-form input[type="text"] {
  padding: 12px 20px;
  width: 320px;
  border: none;
  outline: none;
  font-size: 16px;
}

.search-form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.search-form button:hover {
  background-color: #0056b3;
}

/* 主文章容器 */
.blog-posts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 图片左、文字右的 Flex 布局 */
.blog-post {
  display: flex;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-post:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.post-flex {
  display: flex;
  width: 100%;
}

/* 左侧图片区域 - 缩小宽度（建议 35%~40%） */
.post-image {
  position: relative;
  width: 38%; /* 图片占 38% 宽度 */
  flex-shrink: 0;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 裁剪填满 */
  display: block;
}

/* 分类标签 */
.category-label {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(0, 123, 255, 0.9);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

/* 右侧文字内容 - 占 62% */
.post-content {
  width: 62%;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.post-content h3 {
  margin: 0 0 12px;
  font-size: 1.3rem;
  line-height: 1.4;
}

.post-content h3 a {
  color: #1a1a1a;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.post-content h3 a:hover {
  color: #007bff;
}

.post-content p {
  color: #555;
  line-height: 1.6;
  margin: 0 0 16px;
  flex-grow: 1;
}

/* 元信息和底部 */
.post-meta {
  font-size: 0.875rem;
  color: #777;
  margin-bottom: 8px;
}

.post-meta i {
  margin-right: 6px;
  color: #999;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.read-more {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s;
}

.read-more:hover {
  color: #0056b3;
}

.read-more i {
  font-size: 0.875rem;
}


/* 无结果提示 */
.no-results {
  text-align: center;
  padding: 60px 20px;
  color: #888;
}

.no-results i {
  font-size: 48px;
  color: #ccc;
  margin-bottom: 16px;
}

.no-results h3 {
  margin: 0 0 12px;
  font-size: 1.5rem;
  color: #444;
}

.no-results p {
  margin: 0 0 16px;
}

.reset-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.reset-btn:hover {
  background-color: #0056b3;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 40px;
  flex-wrap: wrap;
}

.pagination a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #f1f3f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  color: #1c7ed6;
  text-decoration: none;
  transition: all 0.3s ease;
}

.pagination a.active,
.pagination a:hover {
  background: #1c7ed6;
  color: white;
  transform: scale(1.05);
}
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;     /* 垂直居中 */
  align-items: center;         /* 水平居中 */
  height: 100%;                /* 确保占满父容器高度 */
  text-align: center;          /* 文本居中 */
  padding: 20px;
  box-sizing: border-box;
}
</style>