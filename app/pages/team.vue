<script setup lang="ts">
const team=[
  {
    name:"创始人",
    icon:"fas fa-user-tie",
    major:"15年数字营销经验，GEO优化领域先驱",
    content:"主导开发了基于EEAT原则(经验性、专业性、权威性、可信度)的GEO优化框架，帮助客户在生成式搜索结果中的引用率提升40%。"
  },
  {
    name: "方案负责人",
    icon: "fas fa-chart-line",
    major: "擅长将传统SEO策略转化为GEO优化方案",
    content: "通过结构化数据标记和权威信源绑定，显著提升品牌在AI生成答案中的可见度。曾为多家世界企业提供GEO战略咨询，平均提升AI引用率65%。"
  },
  {
    name: "市场负责人",
    icon: "fas fa-bullhorn",
    major: "GEO营销策略专家",
    content: "开发了\"多模态+结构化\"内容分发系统。擅长将市场洞察转化为GEO优化策略，优化内容呈现方式，使客户品牌在AI回答中的提及率提升37%。"
  },
  {
    name: "技术专家",
    icon:"fas fa-laptop-code",
    major: "内容架构专家",
    content: "开发了GEO五维内容体系。通过优化内容结构和语义关联性，使客户信息在DeepSeek等平台中的权重提升50%。该体系已被收录入《生成式内容优化白皮书》。"
  },
  {
    name: "技术专家",
    icon:"fas fa-cogs",
    major: "专注于用户需求转化",
    content: "专注于将用户需求转化为GEO优化功能，提升产品在生成式搜索环境中的竞争力。设计的\"AI优先\"内容策略框架已被多家SaaS平台采用，平均提升产品可见度42%。"
  },
  {
    name: "效果分析师",
    icon:"fas fa-chart-bar",
    major: "GEO效果评估专家",
    content: "建立了多维度的数据分析模型。通过监测AI平台的数据收集和引用行为，为客户提供精准的优化建议。模型可预测AI引用趋势，准确率达85%。"
  }
]
const advantage=[
  {header:"丰富的经验",icon:"fas fa-lightbulb",context:"团队成员平均从业经验超过8年，拥有丰富的数字营销和GEO优化经验"},
  {header:"专业的知识",icon:"fas fa-graduation-cap",context:"深入了解生成式AI平台的算法和规则，掌握最新的GEO优化技术"},
  {header: "高效的团队",icon:"fas fa-users",context: "分工明确，协作高效，能够快速响应客户需求并提供解决方案" },
  {header: "数据驱动",icon: "fas fa-chart-line",context: "基于数据和分析，制定科学的GEO优化策略，确保效果可衡量"}
]
</script>

<template>
  <!-- 页面横幅 -->
  <section class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <h1>GEO专业团队</h1>
        <p>我们拥有一支经验丰富、技术精湛的GEO优化团队，专注于为客户提供高质量的生成式引擎优化服务</p>
      </div>
      <div class="hero-image">
        <div class="tech-animation">
          <i class="fas fa-users"></i>
          <i class="fas fa-brain"></i>
          <i class="fas fa-code"></i>
        </div>
      </div>
    </div>
  </section>
  <section class="team">
    <div class="container">
      <h2>我们的团队</h2>
      <p class="section-subtitle">专业的GEO优化团队，为您提供最优质的服务</p>

      <div class="team-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 50px;">
        <div class="team-card" style="background: var(--white); border-radius: 15px; overflow: hidden; box-shadow: var(--shadow); transition: var(--transition);" v-for="item in team">
          <div class="team-image" style="height: 200px; background: var(--light-blue); display: flex; align-items: center; justify-content: center;">
            <i :class="item.icon" style="font-size: 3rem; color: var(--primary-blue);"></i>
          </div>
          <div class="team-content" style="padding: 25px; text-align: center;">
            <h3 style="color: var(--primary-blue); margin-bottom: 5px;">{{ item.name }}</h3>
            <p style="color: var(--gray); margin-bottom: 15px;">{{item.major}}</p>
            <p style="color: var(--dark-gray);">{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="features">
    <div class="container">
      <h2>我们的优势</h2>
      <p class="section-subtitle">专业的团队，为您提供全方位的GEO优化服务</p>
      <div class="feature-grid">
        <div class="feature-card" v-for="item in advantage">
          <div class="feature-icon">
            <i :class="item.icon"></i>
          </div>
          <h3>{{item.header}}</h3>
          <p>{{item.context}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>