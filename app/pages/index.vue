<script setup lang="ts">

let router=useRouter();
const Hero={
  title: 'GEO生成式引擎优化',
  description: '专业的生成式引擎优化服务，帮助企业在AI时代提升品牌影响力和搜索可见度',
  icons: ['fas fa-brain', 'fas fa-search', 'fas fa-chart-line'],
  goToServicePage: () => router.push('/service'),
  learnMore: () => alert('更多功能正在开发中...')
};
const Features=[
  {
    header:"AI算法深度解析",
    icon:"fas fa-brain",
    content:"深入分析生成式引擎的算法规则，精准定位优化方向"
  },
  {
    header:"引用率提升",
    icon:"fas fa-chart-line",
    content:"通过优化，客户在生成式搜索结果中的引用率平均提升40%",
  },
  {
    header: "结构化内容优化",
    icon: "fas fa-file-alt",
    content: "优化内容结构，提高内容在生成式引擎中的权重和可见度"
  },
  {
    header:"EEAT原则应用",
    icon:"fas fa-trophy",
    content: "基于经验性、专业性、权威性和可信度原则，构建高质量内容"
  }
]
interface Geo{
  name:string,
  description:string,
  list:Array<string>
}
const GeoShow:Array<Geo> = [
  {
    name:"DeepSeek",
    description:"专业的DeepSeek优化服务，提升企业在DeepSeek平台的品牌曝光和引用率",
    list:[
        "深度适配DeepSeek算法特性",
        "提升内容在DeepSeek中的可见度和权威性",
        "优化用户查询与企业内容的匹配度"
    ]
  },
  // {
  //   name:"Kimi",
  //   description:"专业的Kimi优化服务，帮助企业在Kimi平台上获得更高的内容权重",
  //   list:[
  //       "针对Kimi的检索和生成机制进行优化",
  //       "提升企业信息在Kimi回答中的引用率",
  //       "优化内容结构以适应Kimi的解析方式"
  //   ]
  // },
  {
    name:"文心一言",
    description:"专业的文心一言优化服务，提升企业信息在文心一言中的可见度",
    list:[
        "结合百度搜索引擎优势进行GEO优化",
        "提升企业内容在文心一言生成结果中的占比",
        "优化内容以符合文心一言的内容评估标准"
    ]
  },
  {
    name:"豆包AI",
    description:"专业的豆包AI优化服务，帮助企业在豆包AI平台上脱颖而出",
    list:[
        "适配豆包AI的内容理解和生成机制",
        "提升企业信息在豆包回答中的曝光率",
        "优化内容以提高在豆包推荐系统中的权重"
    ]
  }
]
const testimonials=[
  {
    name:"蓝盒子",
    description:"知名的床垫品牌",
    appraise:"当夏科技凭借策略 + 技术 + 内容执行四位一体的融合，展现出极强的系统化运作能力和综合竞争力。在合作过程中，我们深刻感受到他们在战略层面的清晰洞察、技术上的扎实创新、内容创作的专业度以及执行落地的高效执行力。这种全方位协同的能力，确保了项目从规划到成果输出的每一个环节都精准可控、效果可期。"
  }
]
const service_process=[
  {
    header:"沟通需求",
    content:"深入了解客户业务目标和优化需求"
  },
  {
    header: "现状分析",
    content: "全面分析当前SEO和GEO表现情况"
  },
  {
    header: "沟通提案",
    content: "制定个性化优化策略和实施方案"
  },
  {
    header: "需求确认",
    content: "与客户确认优化方案和预期效果"
  },
  {
    header: "签订合同",
    content: "明确服务内容和交付标准"
  },
  {
    header: "项目执行",
    content: "专业团队按计划执行优化工作"
  },
  {
    header: "监控汇报",
    content: "定期监控效果并汇报进展"
  },
  {
    header: "验收交付",
    content: "确保达到预期效果并完成交付"
  }
]
const currentTab=ref("news")
const showTab=(TabName:string)=>{
  currentTab.value=TabName
  console.log(currentTab.value)
}
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}
const scrollPosition = ref(0)
import {type Article,fetchSub} from "@/components/BackEnd/ArticleAnalysis";
const article:Article[]=await fetchSub(6)
import {useReadState} from "~/composables/useReadState";
const isRead=useReadState()
const goBack = () => {
  isRead.value = false
  setTimeout(() => {
    window.scrollTo(0, scrollPosition.value)
  }, 0)
};
const articleContent=ref("")
const readArticle = (article: Article) => {
  isRead.value = true
  articleContent.value=article.content
  scrollPosition.value = window.scrollY
}
</script>
<template>
  <div v-show="!isRead">
    <!-- 主页横幅 -->
    <section id="home" class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <h1>{{ Hero.title }}</h1>
          <p>{{ Hero.description }}</p>
          <div class="hero-buttons">
            <button class="btn-primary" @click="Hero.goToServicePage">了解服务</button>
            <button class="btn-secondary" @click="Hero.learnMore">了解更多</button>
          </div>
        </div>
        <div class="hero-image">
          <div class="tech-animation">
            <i v-for="icon in Hero.icons" :key="icon" :class="icon"></i>
          </div>
        </div>
      </div>
    </section>
    <!-- 服务特色 -->
    <section class="features">
      <div class="container">
        <h2>GEO优化服务特色</h2>
        <p class="section-subtitle">专业的生成式引擎优化服务，助力企业在AI时代脱颖而出</p>
        <div class="feature-grid">
          <div class="feature-card" v-for="feature in Features" :key="feature.header">
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3>{{feature.header}}</h3>
            <p>{{feature.content}}</p>
          </div>

        </div>
      </div>
    </section>
    <!-- GEO服务展示区 -->
    <section id="geo" class="geo-services">
      <div class="container">
        <h2>主流平台GEO优化服务</h2>
        <p class="section-subtitle">我们提供全面的生成式引擎优化服务，覆盖主流AI平台</p>

        <div class="geo-grid">
          <div class="geo-card" v-for="geoshow in GeoShow">
            <div class="geo-header">
              <h3>{{geoshow.name}}优化</h3>
              <span class="geo-tag">GEO生成式引擎优化</span>
            </div>
            <p>{{geoshow.description}}</p>
            <div class="geo-details">
              <h4>{{geoshow.name}}优化服务</h4>
              <ul>
                <li v-for="l in geoshow.list">{{l}}</li>
              </ul>
            </div>
            <button class="btn-outline" onclick="window.location.href='/service'">了解详情</button>
          </div>
        </div>
      </div>
    </section>
    <!-- 客户评价 -->
    <!-- <section class="testimonials"> -->
      <!-- <div class="container"> -->
        <!-- <h2>对于结果，您所熟悉的他们这样说</h2>
        <p class="section-subtitle">数字科技感恩众多知名伙伴对我们的信赖与认可</p> -->

        <!-- <div class="testimonial-card"  v-for="header in testimonials">
          <div class="testimonial-header">
            <div class="client-info">
              <h3>{{header.name}}</h3>
              <span class="client-title">{{header.description}}</span>
            </div>
          </div>
          <p class="testimonial-text">{{header.appraise}}</p>
        </div> -->
      <!-- </div> -->
    <!-- </section> -->
    <!-- 行业知识 -->
    <section id="knowledge" class="knowledge">
      <div class="container">
        <h2>行业知识</h2>
        <p class="section-subtitle">记录团队成长点滴以及对技术、理念的探索，同时我们乐于分享！</p>

        <div class="knowledge-tabs">
          <div class="tab-buttons">
            <button class="tab-btn" :class="{ active: currentTab === 'news' }" @click="showTab('news')">公司新闻</button>
            <button class="tab-btn" :class="{ active: currentTab === 'tech' }" @click="showTab('tech')">技术学堂</button>
            <button class="tab-btn" :class="{ active: currentTab === 'industry' }" @click="showTab('industry')">行业动态</button>
          </div>

          <div class="tab-content">
            <div id="industry"  class="tab-pane" :class="{ active: currentTab === 'news' }">
              <div class="article-list">
                <div class="article-item" v-for="i in article">
                  <span class="article-date">{{formatDate(i.sendDate)}}</span>
                  <a href="#" @click.prevent="readArticle(i)">{{i.title}}</a>
                </div>
              </div>
            </div>
            <div id="tech" class="tab-pane" :class="{ active: currentTab === 'tech' }">
              <div class="article-list">
                <div class="article-item">
                  <span class="article-date">05-24</span>
                  <a href="#">GEO优化的成本是多少？</a>
                </div>
                <div class="article-item">
                  <span class="article-date">05-24</span>
                  <a href="#" >AISEO优化需要哪些AI算法？</a>
                </div>
                <div class="article-item">
                  <span class="article-date">05-24</span>
                  <a href="#" >如何实现AISEO优化的自动化？</a>
                </div>
                <div class="article-item">
                  <span class="article-date">05-24</span>
                  <a href="#" >AISEO如何帮助提升营销效果？</a>
                </div>
              </div>
            </div>
            <div id="news"  class="tab-pane" :class="{ active: currentTab === 'industry' }">
              <div class="article-list">
                <div class="article-item">
                  <span class="article-date">06-20</span>
                  <a href="#" >GEO实战指南｜从关键词到AI推荐：企业</a>
                </div>
                <div class="article-item">
                  <span class="article-date">06-17</span>
                  <a href="#" >SEO+GEO双轮驱动！数字科技</a>
                </div>
                <div class="article-item">
                  <span class="article-date">06-05</span>
                  <a href="#" >AI时代！GEO如何操纵消费者决策</a>
                </div>
                <div class="article-item">
                  <span class="article-date">05-30</span>
                  <a href="#" >错过小红书红利？数字科技</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 服务流程 -->
    <section class="service-process">
      <div class="container">
        <h2>当夏科技服务流程</h2>
        <p class="section-subtitle">丰富互联网数字化项目服务经验，让我们对SEO（搜索引擎营销）和GEO（生成式引擎优化）项目实施的规范化、标准化有更多的理解</p>
        <div class="process-steps">
          <div v-for="(item, index) in service_process" :key="index" class="step">
            <div class="step-number">{{ index+1}}</div>
            <h3>{{ item.header }}</h3>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <ViewReadView v-show="isRead"
                :section="articleContent"
                @back="goBack"
  />
</template>

<style scoped>

</style>