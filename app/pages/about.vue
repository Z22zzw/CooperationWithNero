<script setup lang="ts">
const features = [
  {header:"技术领先",icon:"fas fa-lightbulb",context:"我们拥有自主研发的GEO优化技术，能够精准分析生成式引擎的算法规则"},
  {header:"效果显著",icon:"fas fa-chart-line",context: "通过我们的优化服务，客户在生成式搜索结果中的引用率平均提升40%" },
  {header: "专业团队",icon:"fas fa-users",context: "我们的团队成员拥有丰富的行业经验和专业知识，能够提供定制化的解决方案" },
  {header: "数据安全",icon:"fas fa-shield-alt",context: "我们严格保护客户的数据安全，所有合作过程都遵循严格的保密协议"}
]
const timeline={
  "2018":{header:"公司成立",context:"豆智网络科技有限公司正式成立，专注于数字营销服务"},
  "2019":{header: "技术突破",context: "自主研发的SEO智能分析系统上线，为客户提供精准的优化建议"},
  "2021":{header:"业务拓展",context:"服务客户超过100家，涵盖多个行业领域"},
  "2023":{header:"战略转型",context:"聚焦GEO优化领域，成为国内领先的GEO服务商"},
  "2024":{header:"创新发展",context:"推出基于EEAT原则的GEO优化框架，帮助客户在生成式搜索中获得更大优势"}
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
        <div class="about-image" style="height: 300px; background: var(--light-blue); display: flex; align-items: center; justify-content: center;">
          <i class="fas fa-chart-pie" style="font-size: 5rem; color: var(--primary-blue);"></i>
        </div>
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

</style>