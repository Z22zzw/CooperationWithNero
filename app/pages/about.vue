<script setup lang="ts">
const features = [
  {header:"技术领先",icon:"fas fa-lightbulb",context:"我们拥有自主研发的GEO优化技术，能够精准分析生成式引擎的算法规则"},
  {header:"效果显著",icon:"fas fa-chart-line",context: "通过我们的优化服务，客户在生成式搜索结果中的引用率平均提升40%" },
  {header: "专业团队",icon:"fas fa-users",context: "我们的团队成员拥有丰富的行业经验和专业知识，能够提供定制化的解决方案" },
  {header: "数据安全",icon:"fas fa-shield-alt",context: "我们严格保护客户的数据安全，所有合作过程都遵循严格的保密协议"}
]
const timeline={
  "2018":{header:"公司成立",context:"在数字营销从 “流量红利” 向 “精准转化” 转型的关键节点，当夏科技正式成立。创始团队深耕互联网营销领域多年，敏锐捕捉到企业在碎片化传播时代的核心痛点 ——“有流量无转化、有曝光无信任”，因此确立 “以技术为锚点，让营销回归业务本质” 的定位，专注为企业提供从流量获取到价值沉淀的全链路数字营销服务。"},
  "2019":{header: "技术突破",context: "经过 18 个月的技术攻坚，当夏科技自主研发的SEO 智能分析系统成功上线。这套系统突破传统 SEO 工具的 “数据堆砌” 局限，融合机器学习算法，可实时追踪搜索引擎排名机制变化，从 “关键词竞争度、页面加载速度、用户行为路径” 等 12 个维度生成动态优化方案。例如，为某电商客户精准定位 “高转化长尾词”，3 个月内使自然搜索流量提升 67%，验证了技术驱动营销的实战价值。"},
  "2021":{header:"业务拓展",context:"凭借 “技术 + 服务” 双轮驱动模式，当夏科技服务客户数突破 100 家，覆盖电商、教育、医疗、智能制造等 15 个细分领域。不同于标准化服务，团队为每个行业定制 “行业化解决方案”：为教育机构设计 “内容矩阵 + 关键词布局” 策略，解决 “精准获客难”；为制造企业优化 “产品技术页 + 行业白皮书”，提升 B 端客户询盘量。客户复购率达 82%，逐步形成 “用案例说话” 的口碑效应。。"},
  "2023":{header:"战略转型",context:"随着生成式 AI 技术爆发，搜索引擎从 “关键词匹配” 转向 “语义理解 + 内容生成”，当夏科技预判营销行业将迎来 “GEO（生成式引擎优化）时代”。果断启动战略转型，将核心资源聚焦 GEO 领域：组建由算法工程师、内容策略师、行业分析师构成的专项团队，深度拆解 DeepSeek、文心一言等主流生成式引擎的内容评估逻辑，成为国内首批实现 “生成式搜索结果干预” 的服务商，帮助早期合作客户在 AI 搜索中的内容引用率提升 40% 以上。"},
  "2024":{header:"创新发展",context:"基于对生成式引擎 “内容权威性优先” 的底层逻辑洞察，当夏科技推出基于 EEAT 原则的 GEO 优化框架。通过 “经验沉淀（行业案例库建设）、专业背书（专家内容生产）、权威认证（第三方机构合作）、信任强化（用户证言体系）” 四维联动，帮助客户构建 “生成式引擎偏好的内容资产”。例如，为某消费品牌打造 “创始人创业经验 + 实验室检测报告 + KOL 实测” 的内容矩阵，使其在 AI 生成的 “同类产品推荐” 结果中出现频率提升 3 倍，真正实现 “让品牌在 AI 时代被精准看见”。"}
}
</script>

<template>
  <!-- 页面横幅 -->
  <section class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <h1>关于我们</h1>
        <p>当夏科技 - 专业的GEO生成式引擎优化服务商</p>
      </div>
      <div class="hero-image">
        <div class="tech-animation">
          <i class="fas fa-building"></i>
          <i class="fas fa-rocket"></i>
          <i class="fas fa-handshake"></i>
        </div>
      </div>
    </div>
  </section>
  <!-- 公司简介 -->
  <section class="about">
    <div class="container">
      <div class="about-content">
        <!-- <div class="about-image" style="height: 300px; background: var(--light-blue); display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-chart-pie" style="font-size: 5rem; color: var(--primary-blue);"></i>
        </div> -->
        <div class="about-text">
          <h2>公司简介</h2>
          <p>当夏科技有限公司成立于2018年，是国内领先的GEO（生成式引擎优化）服务商。我们专注于帮助企业在生成式AI平台上提升品牌曝光和内容影响力，为客户提供全方位的GEO优化解决方案。</p>
          <p>自成立以来，当夏科技始终走在数字营销创新的前沿。我们的核心团队拥有超过10年的数字营销和技术开发经验，对搜索引擎算法和生成式AI技术有着深入的理解。</p>
          <p>凭借专业的技术实力和优质的服务，我们已为超过200家企业提供了GEO优化服务，涵盖电商、金融、医疗、教育、旅游等多个行业，帮助客户在生成式搜索环境中获得了显著的竞争优势。</p>
        </div>
      </div>
    </div>
  </section>
  <!-- 公司优势 -->
  <section class="features">
    <div class="container">
      <h2>我们的优势</h2>
      <p class="section-subtitle">专业的GEO优化服务，为您的品牌赋能</p>
      <div class="feature-grid">
        <div class="feature-card" v-for="item in features">
          <div class="feature-icon">
            <i :class="item.icon"></i>
          </div>
          <h3>{{item.header}}</h3>
          <p>{{item.context}}</p>
        </div>
      </div>
    </div>
  </section>
  <!-- 发展历程 -->
  <section class="timeline">
    <div class="container">
      <h2>发展历程</h2>
      <div class="timeline-items">
        <div class="timeline-item" v-for="(v,k) in timeline">
          <div class="timeline-date">{{k}}年</div>
          <div class="timeline-content">
            <h3>{{v.header}}</h3>
            <p>{{v.context}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .about-text{
    z-index: 5002;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .container{
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .timeline-date{
    font-size: 20px;
  }
</style>