<script setup lang="ts">
import deepseek from '~/assets/deepseek.png'
import doubao from '~/assets/doubao.png'
import yuanbao from '~/assets/yuanbao.png'
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
  description: 'GEO生成式引擎优化是通过优化内容结构和提示词，使生成式AI引擎（如Deepseek、ChatGPT、豆包等）能够更准确理解并输出相关内容的技术，旨在提升内容在AI生成结果中的可见性和准确性。',
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
  images:[
      deepseek,doubao,yuanbao
  ],

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
    name: "腾讯元宝",
    description: "腾讯元宝是腾讯公司推出的新一代认知大模型，深度融合中文语义理解与多模态交互能力，为政企客户提供智能化、场景化的AI解决方案，助力企业数字化转型与效率提升。",
    list: [
      "依托腾讯强大的中文NLP技术，精准理解专业术语与行业语境",
      "支持文本、图像、语音等多模态交互，打造沉浸式智能体验",
      "内置企业级安全合规框架，保障政企数据隐私与业务合规性",
      "整合腾讯云行业知识图谱，提供精准的垂直领域专业支持",
      "具备长上下文记忆能力，实现复杂业务场景的连贯交互"
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

const showMoreInfo = ref(false)

const getMoreInfo = ()=>{
  showMoreInfo.value = !showMoreInfo.value;
}

const serviceProcess = ref([
  { header: "需求诊断", content: "2个工作日内完成企业现状与需求分析" },
  { header: "知识图谱构建", content: "建立品牌专属语义网络与实体关系" },
  { header: "内容增强", content: "对现有内容进行AI可读性改造" },
  { header: "多平台适配", content: "针对不同AI平台优化输出格式" },
  { header: "效果监测", content: "部署实时数据监测仪表盘" }
])

const faqCategories = ref([
  {
    category: "技术实施",
    questions: ["是否需要重构网站?", "如何防御竞品?"]
  },
  {
    category: "效果评估",
    questions: ["如何衡量效果?", "算法更新影响?"]
  }
])

const solutionTags = ref(["语义标记", "知识图谱", "API直连", "多模态优化"])

// function lazyload(): () => void {
//   const imagesList: HTMLImageElement[] = Array.from(document.getElementsByTagName('img'));  // Get all images
//   const length: number = imagesList.length; // Total number of images
//   let n: number = 0; // Counter for already loaded images to reduce iterations
//
//   return (): void => {
//     const clientHeight: number = document.documentElement.clientHeight;  // Viewport height
//     const scrollTop: number = document.documentElement.scrollTop;  // Scrolled height
//
//     for (let i = n; i < length; i++) {
//       const img = imagesList[i];
//       if (img!.offsetTop < clientHeight + scrollTop) { // Check if image is in viewport
//         if (img!.getAttribute('src') === './loading.png') { // Only replace if it's the placeholder
//           img!.src = img!.getAttribute('data-src') || '';
//         }
//         n = n + 1;
//       } else {
//         break;
//       }
//     }
//   }
// }
//
// const loadImages = lazyload();
// loadImages();
// window.addEventListener('scroll', loadImages, false); // Listen to scroll event
</script>

<template>
    <!-- 二维码模态框 -->
  <div v-if="showQrModal" class="qr-modal">
    <div class="qr-modal-overlay" @click="closeModal"></div>
    <div class="qr-modal-content">
      <button class="qr-modal-close" @click="closeModal">&times;</button>
      <!-- 为解决二维码模糊问题，添加 decoding="async" loading="lazy" 属性，并确保图片格式和尺寸合适 -->
      <img src="~/assets/qr1.webp" alt="二维码" class="qr-image" decoding="async" loading="lazy" />
    </div>
  </div>
  <div v-show="!isRead">
    <!-- 主页横幅 -->
    <section id="home" class="hero">
      <div class="hero-container">
        <div class="hero-content">
<!--          <div class="hero-badge">AI时代必备</div>-->
          <h1>{{ Hero.title }}</h1>
          <h2 id="h2_1">{{ Hero.subtitle }}</h2>
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
<!--            <i v-for="icon in Hero.icons" :key="icon" :class="`${icon} tech-icon`"></i>-->
            <img
                v-for="image in Hero.images"
                :key="image"
                :src="image"
                alt="ai"
                class="floating-image"
                style="width: 30%; height: 30%"
            >
          </div>
<!--          <div class="hero-slogans">-->
<!--            <p v-for="(slogan, index) in Hero.slogans" :key="index" class="slogan-text" :class="index === 0 ? 'slogan-primary' : 'slogan-secondary'">{{ slogan }}</p>-->
<!--          </div>-->
          <div class="hero-decoration"></div>
        </div>
      </div>
    </section>

<!--    &lt;!&ndash; 服务特色 &ndash;&gt;-->
<!--    <section class="features" id="features">-->
<!--      <div class="container">-->
<!--        <div style="text-align: center"><h2>GEO优化服务特色</h2></div>-->
<!--        <p class="section-subtitle">专业的生成式引擎优化服务，通过算法适配、内容重构与生态融合，助力企业在AI时代脱颖而出</p>-->
<!--        <div class="feature-grid">-->
<!--          <div class="feature-card" v-for="feature in Features" :key="feature.header">-->
<!--            <div class="feature-icon">-->
<!--              <i :class="feature.icon"></i>-->
<!--            </div>-->
<!--            <h3>{{ feature.header }}</h3>-->
<!--            <p>{{ feature.content }}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->

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
    <section class="features" id="features" style="
  padding: 80px 0;
  background-color: #f9fafb;
">
      <div class="container" style="
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  ">
        <div style="text-align: center; margin-bottom: 50px;">
          <h2 style="
        font-size: 2.5rem;
        color: #2c3e50;
        margin-bottom: 15px;
        position: relative;
        display: inline-block;
      ">
            GEO优化服务特色
            <span style="
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          /*background: linear-gradient(90deg, #3a7bd5, #00d2ff);*/
          border-radius: 2px;
        "></span>
          </h2>
          <p style="
        font-size: 1.1rem;
        color: #7f8c8d;
        max-width: 800px;
        margin: 0 auto;
        line-height: 1.6;
      ">
            专业的生成式引擎优化服务，通过算法适配、内容重构与生态融合，助力企业在AI时代脱颖而出
          </p>
        </div>

        <!-- 第一部分：AI算法深度解析（左文右图） -->
        <div class="feature-section" style="
      display: flex;
      align-items: center;
      margin-bottom: 80px;
    ">
          <div class="feature-content" style="flex: 1; padding-right: 40px;">
            <h3 style="
          font-size: 1.8rem;
          color: #2c3e50;
          margin-bottom: 20px;
          position: relative;
          padding-left: 20px;
        ">
              AI算法深度解析
              <span style="
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            background: #00d2ff;
            border-radius: 50%;
          "></span>
            </h3>
            <p style="
          font-size: 1.1rem;
          line-height: 1.8;
          color: #34495e;
        ">
              通过逆向工程技术解析
              <span style="
            background: linear-gradient(90deg, #3a7bd5, #00d2ff);
            border-radius: 20px;
            color: white;
            padding: 3px 12px;
            font-weight: 500;
            display: inline-block;
            margin: 0 2px;
          ">15+主流生成式引擎</span>
              的底层算法逻辑，包括Transformer架构注意力机制、检索增强生成(RAG)流程与内容排序机制。建立算法特征数据库，精准定位各平台内容偏好，为针对性优化提供数据支撑。
            </p>
          </div>
          <div class="feature-image" style="
        flex: 1;
        text-align: center;
      ">
            <div style="
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #3a7bd5, #00d2ff);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 60px;
        ">
<!--              <i class="fas fa-brain"></i>-->
              <img src="../assets/image1.webp"  style="width:300%;height: 150%"/>
            </div>
          </div>
        </div>

        <!-- 第二部分：引用率+结构化（右文左图） -->
        <div class="feature-section" style="
      display: flex;
      align-items: center;
      margin-bottom: 80px;
      flex-direction: row-reverse;
    ">
          <div class="feature-content" style="flex: 1; padding-left: 40px;">
            <h3 style="
          font-size: 1.8rem;
          color: #2c3e50;
          margin-bottom: 20px;
          position: relative;
          padding-left: 20px;
        ">
              核心优化技术
              <span style="
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            background: #00d2ff;
            border-radius: 50%;
          "></span>
            </h3>
            <div style="margin-bottom: 25px;">
              <h4 style="
            font-size: 1.3rem;
            color: #3a7bd5;
            margin-bottom: 10px;
          ">引用率提升系统</h4>
              <p style="
            font-size: 1rem;
            line-height: 1.8;
            color: #34495e;
            margin-bottom: 15px;
          ">
                构建包含内容特征提取、语义向量优化、引用信号强化的三位一体系统。实测数据显示客户在生成式搜索结果中的引用率<span style="
            background: linear-gradient(90deg, #3a7bd5, #00d2ff);
            border-radius: 20px;
            color: white;
            padding: 3px 12px;
            font-weight: 500;
            display: inline-block;
            margin: 0 2px;
          ">平均提升40%-68%</span>，核心关键词触发率提升3倍。
              </p>
            </div>
            <div>
              <h4 style="
            font-size: 1.3rem;
            color: #3a7bd5;
            margin-bottom: 10px;
          ">结构化内容优化</h4>
              <p style="
            font-size: 1rem;
            line-height: 1.8;
            color: #34495e;
          ">
                采用Schema标记语言重构内容结构，实现知识图谱关联、实体关系映射与多模态内容适配。使内容在生成式引擎中的解析效率<span style="
            background: linear-gradient(90deg, #3a7bd5, #00d2ff);
            border-radius: 20px;
            color: white;
            padding: 3px 12px;
            font-weight: 500;
            display: inline-block;
            margin: 0 2px;
          ">提升70%</span>，权重值平均增加2.3倍。
              </p>
            </div>
          </div>
          <div class="feature-image" style="
        flex: 1;
        text-align: center;
      ">
            <div style="
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #00d2ff, #3a7bd5);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 60px;
        ">
<!--              <i class="fas fa-project-diagram"></i>-->
              <img src="../assets/image2.webp" loading="lazy" style="width:300%;height: 150%">
            </div>
          </div>
        </div>

        <!-- 第三部分：EEAT+监测（左文右图） -->
        <div class="feature-section" style="
      display: flex;
      align-items: center;
      margin-bottom: 80px;
    ">
          <div class="feature-content" style="flex: 1; padding-right: 40px;">
            <h3 style="
          font-size: 1.8rem;
          color: #2c3e50;
          margin-bottom: 20px;
          position: relative;
          padding-left: 20px;
        ">
              质量与监测体系
              <span style="
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            background: #00d2ff;
            border-radius: 50%;
          "></span>
            </h3>
            <div style="margin-bottom: 25px;">
              <h4 style="
            font-size: 1.3rem;
            color: #3a7bd5;
            margin-bottom: 10px;
          ">EEAT原则应用体系</h4>
              <p style="
            font-size: 1rem;
            line-height: 1.8;
            color: #34495e;
            margin-bottom: 15px;
          ">
                基于谷歌EEAT原则构建内容评估体系，通过专家背书系统、行业资质认证、用户行为信号强化等12项措施，提升内容的经验性、专业性、权威性和可信度评分。
              </p>
            </div>
            <div>
              <h4 style="
            font-size: 1.3rem;
            color: #3a7bd5;
            margin-bottom: 10px;
          ">实时优化监测系统</h4>
              <p style="
            font-size: 1rem;
            line-height: 1.8;
            color: #34495e;
          ">
                开发<span style="
            background: linear-gradient(90deg, #3a7bd5, #00d2ff);
            border-radius: 20px;
            color: white;
            padding: 3px 12px;
            font-weight: 500;
            display: inline-block;
            margin: 0 2px;
          ">专属GEO监测平台</span>，实时追踪200+优化指标，包括引用位置分布、上下文关联强度等。支持7×24小时异常预警与自动优化调整。
              </p>
            </div>
          </div>
          <div class="feature-image" style="
        flex: 1;
        text-align: center;
      ">
            <div style="
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #3a7bd5, #00d2ff);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 60px;
        ">
<!--              <i class="fas fa-chart-bar"></i>-->
              <img src="../assets/image3.webp" loading="lazy" style="width:300%;height: 150%">
            </div>
          </div>
        </div>

        <!-- 第四部分：AI协同（右文左图） -->
        <div class="feature-section" style="
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
    ">
          <div class="feature-content" style="flex: 1; padding-left: 40px;">
            <h3 style="
          font-size: 1.8rem;
          color: #2c3e50;
          margin-bottom: 20px;
          position: relative;
          padding-left: 20px;
        ">
              AI内容生产协同
              <span style="
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 8px;
            height: 8px;
            background: #00d2ff;
            border-radius: 50%;
          "></span>
            </h3>
            <p style="
          font-size: 1.1rem;
          line-height: 1.8;
          color: #34495e;
        ">
              构建人机协同的内容生产体系，通过提示词工程(Prompt Engineering)指导AI生成符合GEO标准的内容。结合人工专业审核，既保证内容生产效率提升4倍，又确保信息准确性与品牌调性一致性。
            </p>
          </div>
          <div class="feature-image" style="
        flex: 1;
        text-align: center;
      ">
            <div style="
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #00d2ff, #3a7bd5);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 60px;
        ">
<!--              <i class="fas fa-robot"></i>-->
              <img src="../assets/image4.webp" loading="lazy" style="width:300%;height: 150%">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GEO价值解析 -->
    <section class="geo-value">
      <div class="container">
        <div style="text-align: center"><h2>GEO为企业创造的核心价值</h2></div>
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
             <button class="tab-btn" :class="{ active: currentTab === 'tech' }" @click="showTab('tech')">技术学堂</button>
            <button class="tab-btn" :class="{ active: currentTab === 'news' }" @click="showTab('news')">公司新闻</button>
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
    <section class="service-process-flow">
      <div class="container">
        <div style="text-align: center">
          <h2>当夏科技服务流程</h2>
        </div>
        <p class="section-subtitle">10年互联网数字化项目服务经验，形成标准化GEO服务流程</p>

        <!-- 横向流程图 -->
        <div class="process-flowchart">
          <div class="flow-line"></div>

          <div class="flow-step" v-for="(item, index) in serviceProcess" :key="index">
            <div class="flow-node">
              <div class="node-number">{{ index + 1 }}</div>
              <div class="node-content">
                <h4>{{ item.header }}</h4>
                <p>{{ item.content }}</p>
              </div>
            </div>
            <div class="flow-arrow" v-if="index < serviceProcess.length - 1">
              <svg width="24" height="24" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
            </div>
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
        <div class="info-container">
          <button class="getMoreInfo" @click="getMoreInfo">查看更多</button>
        </div>
        <div class="faq-grid-out" v-if="showMoreInfo">

          <div class="faq-item">

            <h3>GEO优化是否需要重构现有网站内容？</h3>

            <p>不需要完全重构。我们采用"分层增强"策略：在保留现有SEO结构的基础上，通过添加语义标记、知识图谱关联和上下文增强模块来提升AI可读性。平均内容改造成本比传统SEO低40%。</p>

          </div>

          <div class="faq-item">

            <h3>如何防止竞争对手通过GEO抢占我的品牌关键词？</h3>

            <p>我们实施"品牌语义防火墙"三步骤：1) 建立官方知识图谱认证 2) 优化品牌实体关联度 3) 监控AI对话中的品牌表述偏差。实测可将竞品误引率降低78%。</p>

          </div>

          <div class="faq-item">

            <h3>多语言市场如何实施GEO优化？</h3>

            <p>采用"核心语义对齐"方案：先建立跨语言知识锚点（如产品技术参数等不可变信息），再针对各语言区配置本地化表达范式。支持同时优化中文、英文、西班牙语等12种语言的AI生成结果。</p>

          </div>

          <div class="faq-item">

            <h3>GEO优化是否适用于短视频/直播等内容形式？</h3>

            <p>是的。我们开发的"多模态GEO"技术可将视频中的关键帧、语音转文字、弹幕互动等要素转化为AI可识别的语义单元，使生成式引擎能正确引用视频内容要点。</p>

          </div>

          <div class="faq-item">

            <h3>B2B企业如何通过GEO获取高质量销售线索？</h3>

            <p>通过优化行业白皮书、技术对比指南等深度内容在AI回答中的呈现方式，我们帮助客户将AI引导的销售咨询转化率提升3-5倍，且获得的线索质量评分平均高出传统渠道27%。</p>

          </div>

          <div class="faq-item">

            <h3>GEO优化与付费AI广告如何协同？</h3>

            <p>建议"三位一体"策略：GEO优化自然引用+AI平台品牌专区+知识库API直连。数据显示这种组合能使品牌在AI对话中的总曝光量提升4-8倍，且用户信任度提高62%。</p>

          </div>

        </div>

      </div>

    </section>

    <!-- 行动召唤 -->
    <!-- <section class="cta-section">
      <div class="container">
        <h2>抢占AI时代品牌营销高地</h2>
        <p style="color:white">立即开启GEO优化之旅，让您的品牌在生成式AI浪潮中脱颖而出</p>
        <div class="cta-buttons">
          <button class="btn-primary" @click="contactUs()">预约免费咨询</button>
          <button class="btn-secondary" @click="Hero.learnMore">下载GEO白皮书</button>
        </div>
      </div>
    </section> -->
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
  font-size: 2rem;
  color: #4b5563;
  margin-bottom: 1.5rem;
  font-weight: 500;
  text-align: center;
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
@keyframes float-up-down {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px); /* 浮动高度 */
  }
}
.floating-image {
  animation: float-up-down 2s ease-in-out infinite; /* 2秒循环 */
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

.faq-grid-out{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  animation: fadeIn 0.7s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
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
/* 基础样式增强 */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: #1f2937;
}

/* 主标题增强 */
h1 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}

/* 副标题增强 */
h2 {
  font-size: 2.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 2px;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
}

/* 按钮样式增强 */
.btn-primary {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(79, 70, 229, 0.3);
}

.btn-secondary {
  background: white;
  color: #4f46e5;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #d1d5db;
}

/* 卡片悬停效果增强 */
.feature-card, .geo-card, .value-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.feature-card:hover, .geo-card:hover, .value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* 浮动图片动画增强 */
@keyframes float-up-down {
  0%, 100% {
    transform: translateY(20px) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(10deg);
  }
}

.floating-image {
  animation: float-up-down 1s ease-in-out infinite;
  transition: all 0.3s ease;
}

.floating-image:hover {
  animation-play-state: paused;
  transform: scale(1.05);
}

/* 渐变背景增强 */
.hero {
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
}

/* 分割线样式 */
section {
  padding: 5rem 0;
  position: relative;
}

section::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background: linear-gradient(90deg, rgba(79,70,229,0) 0%, rgba(79,70,229,0.3) 50%, rgba(79,70,229,0) 100%);
}

/* 响应式调整 */
@media (max-width: 768px) {
  h1 {
    font-size: 2.25rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }
}

/* 微交互增强 */
button, a {
  transition: all 0.2s ease;
}

/* 加载优化 */
img {
  will-change: transform;
}

/* 滚动行为优化 */
html {
  scroll-behavior: smooth;
}

/* 服务流程步骤美化 */
.step-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 1rem;
}

.step {
  position: relative;
  padding-left: 60px;
}

.step::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e5e7eb;
}

.step:last-child::before {
  display: none;
}

/* 知识库标签按钮美化 */
.tab-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  background: transparent;
  color: #6b7280;
  position: relative;
}

.tab-btn.active {
  color: #4f46e5;
  font-weight: 600;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  border-radius: 2px;
}

/* 文章列表项美化 */
.article-item {
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.article-item:hover {
  background: #f9fafb;
  transform: translateX(5px);
}

.article-date {
  color: #9ca3af;
  font-size: 0.875rem;
  min-width: 100px;
}

.article-item a {
  color: #1f2937;
  text-decoration: none;
  font-weight: 500;
}

.article-item a:hover {
  color: #4f46e5;
}

.info-container{
  padding: 50px 0 50px 0;
  text-align: center;
}

.getMoreInfo{
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 6px rgba(79, 70, 229, 0.2);
  width:200px;
  height: 60px;
  cursor: pointer;
}

.service-process-flow {
  padding: 60px 0;
  background: #f9fafc;
}

.process-flowchart {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  position: relative;
}

.flow-line {
  position: absolute;
  height: 4px;
  width: 80%;
  background: linear-gradient(90deg, #3a7bd5, #00d2ff);
  top: 50%;
  z-index: 1;
}

.flow-step {
  display: flex;
  align-items: center;
  z-index: 2;
}

.flow-node {
  background: white;
  border-radius: 12px;
  padding: 20px;
  width: 180px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
  text-align: center;
  transition: transform 0.3s;
}

.flow-node:hover {
  transform: translateY(-10px);
}

.node-number {
  width: 40px;
  height: 40px;
  background: #3a7bd5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-weight: bold;
}

.flow-arrow {
  margin: 0 -5px;
  color: #3a7bd5;
}

/* 常见问题流程图样式 */
.faq-flowchart {
  padding: 60px 0;
  background: white;
}

.faq-flow-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 30px;
  margin-top: 40px;
}

.flow-start {
  background: #f0f7ff;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.flow-icon {
  width: 60px;
  height: 60px;
  background: #3a7bd5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.path-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  position: relative;
  margin-bottom: 30px;
}

.path-card:after {
  content: "";
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 20px solid white;
}

.path-arrow {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 30px;
  background: #3a7bd5;
}

.flow-solution {
  background: #e6f7ff;
  border-radius: 12px;
  padding: 30px;
  display: flex;
  align-items: center;
}

.solution-card {
  width: 100%;
}

.solution-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
}

.solution-tags span {
  background: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
</style>
