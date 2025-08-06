<script setup lang="ts">
import {ref} from 'vue'

const showQrModal = ref(false);

// 打开模态框的函数
const contactUs = () => {
  showQrModal.value = true
}

// 关闭模态框的函数
const closeModal = () => {
  showQrModal.value = false
}

defineExpose({
  showQrModal,
  contactUs,
  closeModal
});
let router = useRouter();
const Hero = {
  title: 'GEO生成式引擎优化',
  subtitle: 'AI时代企业品牌增长新引擎',
  description: '专业的生成式引擎优化服务，通过算法适配、内容重构与生态融合，帮助企业在AI搜索场景中建立品牌权威，实现流量增长与商业转化的双重突破。我们结合10年搜索引擎优化经验与AI技术洞察，打造专属GEO解决方案，让品牌在生成式AI浪潮中占据先机。',
  advantages: [
    '提升AI搜索引用率40%以上，显著增加品牌曝光',
    '覆盖12+主流生成式引擎平台，构建全域AI presence',
    '基于EEAT原则的专业内容体系构建，强化品牌信任',
    '7×24小时数据监控与动态优化，持续提升ROI',
    '专属算法模型适配，精准触达目标用户群体',
    '全链路效果追踪，量化AI时代营销价值'
  ],
  slogans: [
    '让AI时代品牌突围，靠GEO生成式引擎优化',
    '用GEO生成式引擎优化，让企业在AI浪潮中被看见'
  ],
  icons: ['fas fa-brain', 'fas fa-search', 'fas fa-chart-line', 'fas fa-rocket'],
  goToServicePage: () => router.push('/service'),
  learnMore: () => alert('更多功能正在开发中...')
};

const Features = [
  {
    header: "AI算法深度解析",
    icon: "fas fa-brain",
    content: "通过逆向工程技术解析15+主流生成式引擎的底层算法逻辑，包括Transformer架构注意力机制、检索增强生成(RAG)流程与内容排序机制。建立算法特征数据库，精准定位各平台内容偏好，为针对性优化提供数据支撑。"
  },
  {
    header: "引用率提升系统",
    icon: "fas fa-chart-line",
    content: "构建包含内容特征提取、语义向量优化、引用信号强化的三位一体系统。实测数据显示客户在生成式搜索结果中的引用率平均提升40%-68%，核心关键词触发率提升3倍，品牌相关问题回答中的提及率提升52%。"
  },
  {
    header: "结构化内容优化",
    icon: "fas fa-file-alt",
    content: "采用Schema标记语言重构内容结构，实现知识图谱关联、实体关系映射与多模态内容适配。使内容在生成式引擎中的解析效率提升70%，权重值平均增加2.3倍，在复杂问题回答中的引用优先级显著提升。"
  },
  {
    header: "EEAT原则应用体系",
    icon: "fas fa-trophy",
    content: "基于谷歌EEAT原则构建内容评估体系，通过专家背书系统、行业资质认证、用户行为信号强化等12项措施，提升内容的经验性、专业性、权威性和可信度评分，满足生成式引擎对高质量内容的严格要求。"
  },
  {
    header: "多模态内容适配",
    icon: "fas fa-image",
    content: "将文本内容转化为适配生成式引擎的多模态形式，包括AI生成图像优化、语音内容转写、3D模型轻量化处理。使跨模态搜索场景下的内容召回率提升55%，在视觉问答场景中的品牌曝光增加47%。"
  },
  {
    header: "实时优化监测系统",
    icon: "fas fa-dashboard",
    content: "开发专属GEO监测平台，实时追踪200+优化指标，包括引用位置分布、上下文关联强度、用户点击转化率等。支持7×24小时异常预警与自动优化调整，确保品牌在算法变动时快速响应，维持竞争优势。"
  },
  {
    header: "行业专属解决方案",
    icon: "fas fa-sitemap",
    content: "针对电商、教育、金融、医疗等12个垂直领域开发专属GEO策略，结合行业特性与用户搜索行为特征，打造高转化的AI内容生态。已服务200+行业客户，平均实现AI渠道获客成本降低35%。"
  },
  {
    header: "AI内容生产协同",
    icon: "fas fa-robot",
    content: "构建人机协同的内容生产体系，通过提示词工程(Prompt Engineering)指导AI生成符合GEO标准的内容。结合人工专业审核，既保证内容生产效率提升4倍，又确保信息准确性与品牌调性一致性。"
  }
];

interface Geo {
  name: string,
  description: string,
  list: Array<string>
}

const GeoShow: Array<Geo> = [
  {
    name: "DeepSeek",
    description: "针对DeepSeek系列模型(包括DeepSeek-R1、DeepSeek-VL)的专业优化服务，结合其代码理解优势与多语言处理能力，打造技术型内容的AI曝光解决方案，特别适合科技企业与开发者服务品牌。",
    list: [
      "深度适配DeepSeek的MoE架构特性，优化专家层路由权重",
      "针对DeepSeek长文本处理优势，构建10k+token的深度内容体系",
      "优化内容的逻辑推理链条，提升在技术问题回答中的引用优先级",
      "适配DeepSeek的工具调用能力，实现搜索-生成-转化的闭环优化",
      "利用DeepSeek代码理解优势，强化技术文档的AI引用率"
    ]
  },
  {
    name: "文心一言",
    description: "依托百度搜索引擎生态优势，结合文心大模型的知识增强能力，打造覆盖搜索-推荐-生成全链路的优化方案，帮助企业在百度生态中实现品牌价值最大化。",
    list: [
      "融合百度搜索算法与文心生成逻辑的双重优化策略",
      "利用ERNIE知识图谱构建品牌实体关联网络，提升实体召回率",
      "适配文心一言的多轮对话机制，优化上下文延续性与话题引导",
      "结合百度商业生态，实现生成结果到百度营销产品的流量转化",
      "针对文心的中文理解优势，优化品牌故事的情感化表达"
    ]
  },
  {
    name: "豆包AI",
    description: "针对字节跳动豆包AI的场景化生成特性，结合抖音生态数据，打造社交属性强的AI内容曝光体系，特别适合消费品牌与生活服务类企业。",
    list: [
      "适配豆包AI的多场景对话模型，优化生活服务、电商导购等场景响应",
      "结合字节跳动的推荐算法，提升内容在豆包生态中的分发权重",
      "优化内容的口语化表达与情感化特征，提升用户互动率35%+",
      "打通豆包与抖音、今日头条的内容关联，实现跨平台曝光协同",
      "利用豆包的实时信息处理能力，强化品牌时效性内容的传播"
    ]
  },
  {
    name: "ChatGPT",
    description: "针对OpenAI系列模型的全球覆盖优势，提供多语言、跨地区的GEO优化服务，帮助企业拓展国际市场，建立全球品牌影响力。",
    list: [
      "适配GPT-4的多模态理解能力，优化图文结合的内容形式",
      "针对ChatGPT插件生态，开发专属优化策略提升工具调用优先级",
      "优化英文及小语种内容的Prompt工程设计，提升国际市场曝光",
      "结合Web Crawler数据更新机制，确保内容时效性与引用准确性",
      "利用GPT的逻辑推理优势，构建品牌权威的深度内容体系"
    ]
  },
  {
    name: "讯飞星火",
    description: "针对讯飞星火认知大模型的中文理解与多模态交互优势，打造面向政企客户的专业GEO解决方案，强化品牌在专业领域的话语权。",
    list: [
      "适配讯飞星火的中文语义理解优势，优化专业术语表达",
      "结合讯飞的语音识别技术，优化音频内容的AI索引效果",
      "针对政企服务场景，开发合规性内容的优化策略",
      "利用讯飞的行业知识库，强化垂直领域的内容权威性",
      "适配星火的多轮对话记忆特性，提升品牌信息的延续性"
    ]
  }
];

const service_process = [
  {
    header: "需求诊断",
    content: "通过商业目标拆解、AI曝光现状分析、竞品GEO表现评估三维诊断，输出包含30+指标的《GEO优化需求图谱》，明确品牌在AI生态中的定位与突破点，识别关键机会窗口。"
  },
  {
    header: "全景分析",
    content: "执行包含算法适配度检测、内容质量评估、引用信号审计的全维度分析，生成《GEO优化机会清单》，包含50+可执行优化点与预期效果测算，建立数据驱动的优化基础。"
  },
  {
    header: "策略制定",
    content: "基于分析结果制定包含平台优先级排序、内容优化路线图、KPI达成路径的《GEO优化战略方案》，明确阶段性目标与资源投入计划，确保策略与业务目标高度一致。"
  },
  {
    header: "方案确认",
    content: "与客户进行多轮方案研讨，细化包括优化周期(通常90-180天)、里程碑节点、风险应对机制等内容，形成最终确认的《GEO服务协议》，确保双方认知一致。"
  },
  {
    header: "合同签订",
    content: "明确包含服务范围、交付标准、验收指标、售后服务的全周期服务条款，采用阶梯式付费模式与效果绑定机制，保障双方权益，建立长期合作基础。"
  },
  {
    header: "项目执行",
    content: "由算法工程师、内容架构师、数据分析师组成专项小组，按周执行内容优化、技术调整、数据监测工作，每周输出《GEO优化进展报告》，确保执行透明度。"
  },
  {
    header: "效果监测",
    content: "通过专属监测平台实时追踪引用率、曝光量、转化效果等核心指标，每月进行效果复盘与策略迭代，确保优化方向与商业目标一致，及时调整应对市场变化。"
  },
  {
    header: "成果交付",
    content: "完成约定KPI指标后，交付包含《GEO优化成果报告》《持续优化指南》《算法变动应对手册》的全套资料，提供3个月免费售后支持，确保长期效果稳定。"
  }
];

const currentTab = ref("news")
const showTab = (TabName: string) => {
  currentTab.value = TabName
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

const scrollPosition = ref(0)
import { type Article, fetchSub } from "@/components/BackEnd/ArticleAnalysis";
const article: Article[] = await fetchSub(6)
import { useReadState } from "~/composables/useReadState";
const isRead = useReadState()

const goBack = () => {
  isRead.value = false
  setTimeout(() => {
    window.scrollTo(0, scrollPosition.value)
  }, 0)
};

const articleContent = ref("")
const readArticle = (article: Article) => {
  isRead.value = true
  articleContent.value = article.content
  scrollPosition.value = window.scrollY
}
</script>

<template>
    <!-- 二维码模态框 -->
  <div v-if="showQrModal" class="qr-modal">
    <div class="qr-modal-overlay" @click="closeModal"></div>
    <div class="qr-modal-content">
      <button class="qr-modal-close" @click="closeModal">&times;</button>
      <!-- 为解决二维码模糊问题，添加 decoding="async" loading="lazy" 属性，并确保图片格式和尺寸合适 -->
      <img src="~/assets/qr1.jpg" alt="二维码" class="qr-image" decoding="async" loading="lazy" />
    </div>
  </div>
  <div v-show="!isRead">
    <!-- 主页横幅 -->
    <section id="home" class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-badge">AI时代必备</div>
          <h1>{{ Hero.title }}</h1>
          <h2>{{ Hero.subtitle }}</h2>
          <p>{{ Hero.description }}</p>
          
          <div class="hero-advantages">
            <div v-for="(adv, index) in Hero.advantages" :key="index" class="advantage-item">
              <i class="fas fa-check-circle"></i>
              <span>{{ adv }}</span>
            </div>
          </div>
          
          <div class="hero-buttons">
            <button class="btn-primary" @click="contactUs" >了解服务</button>
            <a href="#features"><button class="btn-secondary">了解更多</button></a>
          </div>
        </div>
        <div class="hero-image">
          <div class="tech-animation">
            <i v-for="icon in Hero.icons" :key="icon" :class="`${icon} tech-icon`"></i>
          </div>
<!--          <div class="hero-slogans">-->
<!--            <p v-for="(slogan, index) in Hero.slogans" :key="index" class="slogan-text" :class="index === 0 ? 'slogan-primary' : 'slogan-secondary'">{{ slogan }}</p>-->
<!--          </div>-->
          <div class="hero-decoration"></div>
        </div>
      </div>
    </section>

    <!-- 服务特色 -->
    <section class="features" id="features">
      <div class="container">
        <h2>GEO优化服务特色</h2>
        <p class="section-subtitle">专业的生成式引擎优化服务，通过算法适配、内容重构与生态融合，助力企业在AI时代脱颖而出</p>
        <div class="feature-grid">
          <div class="feature-card" v-for="feature in Features" :key="feature.header">
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3>{{ feature.header }}</h3>
            <p>{{ feature.content }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- GEO服务展示区 -->
    <section id="geo" class="geo-services">
      <div class="container">
        <h2>主流平台GEO优化服务</h2>
        <p class="section-subtitle">我们提供全面的生成式引擎优化服务，覆盖主流AI平台，针对各平台特性定制专属优化方案</p>

        <div class="geo-grid">
          <div class="geo-card" v-for="geoshow in GeoShow">
            <div class="geo-header">
              <h3>{{ geoshow.name }}优化</h3>
              <span class="geo-tag">GEO生成式引擎优化</span>
            </div>
            <p>{{ geoshow.description }}</p>
            <div class="geo-details">
              <h4>{{ geoshow.name }}优化服务</h4>
              <ul>
                <li v-for="l in geoshow.list">{{ l }}</li>
              </ul>
            </div>
            <button class="btn-outline" onclick="window.location.href='/service'">了解详情</button>
          </div>
        </div>
      </div>
    </section>

    <!-- GEO价值解析 -->
    <section class="geo-value">
      <div class="container">
        <h2>GEO为企业创造的核心价值</h2>
        <p class="section-subtitle">在AI驱动的搜索新时代，生成式引擎优化为企业带来多维度竞争优势</p>
        
        <div class="value-grid">
          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-eye"></i>
            </div>
            <h3>品牌曝光升级</h3>
            <p>在AI生成内容的引用来源中占据优势位置，使品牌信息自然融入用户决策过程，实现被动曝光向主动认知的转化</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-handshake"></i>
            </div>
            <h3>信任度构建</h3>
            <p>通过EEAT原则优化的内容被AI推荐，等同于获得第三方权威背书，显著提升用户对品牌的信任度与好感度</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-line-chart"></i>
            </div>
            <h3>流量质量提升</h3>
            <p>AI推荐带来的流量具有更强的精准性与转化意愿，平均转化率比传统搜索流量高出37%，大幅提升营销效率</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-shield-alt"></i>
            </div>
            <h3>竞争壁垒建立</h3>
            <p>早期布局GEO可在AI生态中占据先发优势，形成难以复制的内容资产与算法适配经验，构建长期竞争壁垒</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 行业知识 -->
    <section id="knowledge" class="knowledge">
      <div class="container">
        <h2>行业知识</h2>
        <p class="section-subtitle">记录团队成长点滴以及对技术、理念的探索，同时我们乐于分享AI时代的营销新趋势与实战经验！</p>

        <div class="knowledge-tabs">
          <div class="tab-buttons">
            <button class="tab-btn" :class="{ active: currentTab === 'news' }" @click="showTab('news')">公司新闻</button>
            <button class="tab-btn" :class="{ active: currentTab === 'tech' }" @click="showTab('tech')">技术学堂</button>
            <button class="tab-btn" :class="{ active: currentTab === 'industry' }" @click="showTab('industry')">行业动态</button>
          </div>

          <div class="tab-content">
            <div id="industry" class="tab-pane" :class="{ active: currentTab === 'news' }">
              <div class="article-list">
                <div class="article-item" v-for="i in article">
                  <span class="article-date">{{ formatDate(i.sendDate) }}</span>
                  <a href="#" @click.prevent="readArticle(i)">{{ i.title }}</a>
                </div>
              </div>
            </div>
            <div id="tech" class="tab-pane" :class="{ active: currentTab === 'tech' }">
              <div class="article-list">
                <div class="article-item">
                  <span class="article-date">06-28</span>
                  <a href="#">GEO优化的成本结构分析：如何实现投入产出比最大化</a>
                </div>
                <div class="article-item">
                  <span class="article-date">06-25</span>
                  <a href="#">AISEO优化的核心算法解析：从BERT到GPT的技术演进</a>
                </div>
                <div class="article-item">
                  <span class="article-date">06-20</span>
                  <a href="#">GEO自动化优化系统构建：从数据采集到策略执行的全流程</a>
                </div>
                <div class="article-item">
                  <span class="article-date">06-15</span>
                  <a href="#">AI时代的内容策略：如何让机器更喜欢你的品牌内容</a>
                </div>
                <div class="article-item">
                  <span class="article-date">06-10</span>
                  <a href="#">语义向量空间：GEO优化中的内容表示方法详解</a>
                </div>
                <div class="article-item">
                  <span class="article-date">06-05</span>
                  <a href="#">多模态内容优化：图像与文本在GEO中的协同策略</a>
                </div>
              </div>
            </div>
            <div id="news" class="tab-pane" :class="{ active: currentTab === 'industry' }">
              <div class="article-list">
                <div class="article-item">
                  <span class="article-date">07-02</span>
                  <a href="#">GEO实战指南｜从关键词到AI推荐：企业内容的全链路优化策略</a>
                </div>
                <div class="article-item">
                  <span class="article-date">06-28</span>
                  <a href="#">SEO+GEO双轮驱动！当夏科技发布AI时代营销新范式</a>
                </div>
                <div class="article-item">
                  <span class="article-date">06-22</span>
                  <a href="#">AI时代品牌竞争法则：GEO如何影响消费者决策路径</a>
                </div>
                <div class="article-item">
                  <span class="article-date">06-18</span>
                  <a href="#">生成式AI营销报告：2024年企业GEO实施现状与趋势分析</a>
                </div>
                <div class="article-item">
                  <span class="article-date">06-15</span>
                  <a href="#">当夏科技完成千万级融资，加速GEO技术研发与生态布局</a>
                </div>
                <div class="article-item">
                  <span class="article-date">06-10</span>
                  <a href="#">GEO优化效果白皮书：200+企业案例的数据分析与洞察</a>
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
        <p class="section-subtitle">10年互联网数字化项目服务经验，形成标准化GEO服务流程，包含8大阶段、32个关键节点与26项交付成果，确保服务质量与效果达成</p>
        <div class="process-steps">
          <div v-for="(item, index) in service_process" :key="index" class="step">
            <div class="step-number">{{ index + 1 }}</div>
            <h3>{{ item.header }}</h3>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 常见问题 -->
    <section class="faq-section">
      <div class="container">
        <h2>常见问题</h2>
        <p class="section-subtitle">解答关于GEO生成式引擎优化的常见疑问，帮助您更好地了解这项新兴营销技术</p>
        
        <div class="faq-grid">
          <div class="faq-item">
            <h3>GEO与传统SEO有什么区别？</h3>
            <p>GEO聚焦于优化生成式AI的内容引用与推荐机制，而传统SEO主要优化搜索引擎的排名算法。GEO更注重内容的权威性、语义完整性和多模态表达，以适应AI生成回答的需求，而不仅是关键词匹配。</p>
          </div>
          
          <div class="faq-item">
            <h3>企业实施GEO需要多长时间才能看到效果？</h3>
            <p>通常情况下，GEO优化的初步效果可在4-8周内显现，包括特定问题中的引用率提升；而全面效果（如品牌相关问题的整体提及率提升）则需要3-6个月的持续优化。不同平台的算法更新频率也会影响见效时间。</p>
          </div>
          
          <div class="faq-item">
            <h3>哪些行业最适合实施GEO优化？</h3>
            <p>知识密集型行业（教育、金融、医疗）、技术服务行业、电商品牌和内容平台最适合实施GEO优化。这些行业的用户常通过生成式AI获取相关信息，优化后能显著提升品牌在决策场景中的曝光机会。</p>
          </div>
          
          <div class="faq-item">
            <h3>GEO优化的效果如何衡量？</h3>
            <p>主要衡量指标包括：AI生成结果中的品牌引用率、引用位置（首段/中段/尾段）、上下文相关性、用户点击转化率、品牌相关问题的回答质量评分等。我们会提供专属仪表盘实时展示这些指标。</p>
          </div>
          
          <div class="faq-item">
            <h3>当AI算法更新时，已做的GEO优化会失效吗？</h3>
            <p>不会完全失效。我们的GEO优化基于内容本质价值与通用AI理解规律，而非针对特定算法漏洞。当算法更新时，我们会通过监测系统快速识别变化，并在1-2周内完成适应性调整，确保长期效果稳定。</p>
          </div>
          
          <div class="faq-item">
            <h3>企业需要具备哪些资源才能开展GEO项目？</h3>
            <p>企业需要提供基础品牌资料、产品/服务信息、行业知识文档等内容素材，并指定1-2名对接人配合需求沟通与内容审核。技术层面无需额外资源，我们会提供全套优化工具与平台支持。</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 行动召唤 -->
    <section class="cta-section">
      <div class="container">
        <h2>抢占AI时代品牌营销高地</h2>
        <p style="color:white">立即开启GEO优化之旅，让您的品牌在生成式AI浪潮中脱颖而出</p>
        <div class="cta-buttons">
          <button class="btn-primary" @click="contactUs()">预约免费咨询</button>
          <button class="btn-secondary" @click="Hero.learnMore">下载GEO白皮书</button>
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
/* 新增hero区域样式 */
.hero-badge {
  display: inline-block;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
  animation: pulse 2s infinite;
}

h2 {
  font-size: 1.5rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.hero-advantages {
  margin: 2rem 0;
}

.advantage-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #4b5563;
}

.advantage-item i {
  color: #10b981;
  margin-right: 0.75rem;
  font-size: 1.125rem;
}

.hero-decoration {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(79,70,229,0.1) 0%, rgba(79,70,229,0) 70%);
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 4s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.9;
    transform: translate(-50%, -50%) scale(1.05);
  }
}

/* 增强按钮样式 */
.btn-primary {
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79,70,229,0.3);
}

.btn-secondary {
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(156,163,175,0.3);
}
/* 优化标语样式 */
.hero-slogans {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
}

.slogan-text {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.6;
  margin: 0.5rem 0;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;
}

.slogan-primary {
  color: #4f46e5;
  animation-delay: 0.3s;
}

.slogan-secondary {
  color: #10b981;
  animation-delay: 0.6s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 增强装饰效果 */
.hero-decoration {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(79,70,229,0.1) 0%, rgba(79,70,229,0) 70%);
  z-index: -1;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 4s infinite;
}

.tech-icon {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}

/* 调整容器定位，强化视觉焦点 */
.hero-slogans {
  position: relative;
  z-index: 2; /* 提升层级，覆盖背景装饰 */
  text-align: center;
  padding: 2rem 1.5rem; 
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92); 
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.03);
  margin-top: 3rem;
  max-width: 600px; /* 限制宽度，避免拉伸 */
  margin-left: auto;
  margin-right: auto;
}

.slogan-text {
  font-size: 1.375rem; /* 适度放大 */
  font-weight: 600;
  line-height: 1.4;
  margin: 0.75rem 0;
  opacity: 0;
  transform: translateY(25px);
  animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  letter-spacing: -0.5px; /* 收紧字符间距 */
  color: #333; /* 统一基础色调 */
}

/* 区分主次标语色彩 */
.slogan-primary {
  color: #4f46e5;
  animation-delay: 0.3s;
}
.slogan-secondary {
  color: #10b981;
  animation-delay: 0.7s;
}

/* 优化入场动画曲线 */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 纯 CSS 悬停微动效 */
.slogan-text {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.slogan-text:hover {
  transform: translateY(-2px);
  text-shadow: 0 2px 6px rgba(79,70,229,0.15);
}

/* 新增GEO价值区域样式 */
.geo-value {
  padding: 4rem 0;
  background-color: #f9fafb;
  margin: 2rem 0;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.value-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.value-icon {
  width: 50px;
  height: 50px;
  background: rgba(79,70,229,0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.value-icon i {
  font-size: 1.5rem;
  color: #4f46e5;
}

/* 常见问题区域样式 */
.faq-section {
  padding: 4rem 0;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.faq-item {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.faq-item h3 {
  color: #111827;
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
}

.faq-item p {
  color: #4b5563;
  line-height: 1.6;
}

/* 行动召唤区域样式 */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  text-align: center;
  margin: 2rem 0 0;
  border-radius: 16px;
  margin: 2rem;
}

.cta-section h2 {
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.125rem;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-buttons .btn-primary {
  background: white;
  color: #4f46e5;
}

.cta-buttons .btn-secondary {
  background: transparent;
  color: white;
  border: 1px solid white;
}

div{
  scroll-behavior: smooth;

}
</style>
