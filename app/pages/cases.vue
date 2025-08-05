<script setup lang="ts">
const cases=[
  {
    header:"泰国酒店",
    icon:"fas fa-hotel",
    ai:"DeepSeek",
    content:"通过GEO优化，该泰国酒店在DeepSeek平台的搜索曝光率提升了120%，预订咨询量增长了85%。"
  },
  {
    header: "跨境支付",
    icon: "fas fa-credit-card",
    ai:"Deepseek",
    content: "某跨境支付平台通过我们的GEO优化服务，在相关关键词搜索结果中的排名提升至前3位，注册量增长67%。"
  },
  {
    header: "医院医美行业",
    icon: "fas fa-hospital",
    ai:"DeepSeek",
    content: "某医美医院通过GEO优化，在相关项目搜索中的自然曝光率提升了95%，预约量增长72%。"
  },
  {
    header: "黄金平台",
    icon:"fas fa-coins",
    ai:"DeepSeek",
    content: "某黄金交易平台通过GEO优化服务，在相关搜索中的品牌提及率提升了110%，用户注册量增长58%。"
  },
  {
    header: "餐饮连锁",
    icon: "fas fa-utensils",
    ai:"豆包AI",
    content: "某餐饮连锁品牌通过豆包AI平台的GEO优化，在本地搜索中的曝光率提升了85%，到店客流量增长42%。"
  },
  {
    header: "SaaS软件",
    icon: "fas fa-laptop-code",
    ai:"文心一言",
    content: "某SaaS软件公司通过文心一言平台的GEO优化，产品查询量提升了92%，免费试用转化率增长38%。"
  }
]
const testimonials=[
  {
    name:"石墨文档",
    description:"知名在线协作平台",
    appraise:"当夏科技的GEO优化服务帮助我们在多个AI平台获得了显著的曝光效果。他们的专业团队不仅深入理解我们的业务需求，还提供了定制化的优化策略，使我们的品牌信息能够精准触达目标用户。合作以来，我们的产品查询量提升了85%，注册转化率增长了42%。"
  },
  {
    name: "微软小冰",
    description: "人工智能助手",
    appraise: "与当夏科技的合作让我们深刻体会到GEO优化的价值。他们的团队凭借丰富的经验和专业的技术，帮助我们在DeepSeek、豆包等AI平台的搜索结果中获得了更高的排名和更多的曝光机会。这种精准的推广方式不仅提高了我们的品牌知名度，还带来了大量高质量的用户。"
  }
]
</script>

<template>
  <!-- 页面横幅 -->
  <section class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <h1>GEO优化成功案例</h1>
        <p>DeepSeek、豆包等AI平台搜索结果案例展示</p>
      </div>
      <div class="hero-image">
        <div class="tech-animation">
          <i class="fas fa-chart-pie"></i>
          <i class="fas fa-trophy"></i>
          <i class="fas fa-lightbulb"></i>
        </div>
      </div>
    </div>
  </section>
  <!-- 案例展示 -->
  <section class="cases">
    <div class="container">
      <h2>成功案例展示</h2>
      <p class="section-subtitle">我们的GEO优化服务已经帮助众多客户在AI平台获得了显著的曝光和转化效果</p>

      <div class="case-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; margin-top: 50px;">
        <div class="case-card" style="background: var(--white); border-radius: 15px; overflow: hidden; box-shadow: var(--shadow); transition: var(--transition);" v-for="item in cases">
          <div class="case-image" style="height: 200px; background: var(--light-blue); display: flex; align-items: center; justify-content: center;">
            <i :class="item.icon" style="font-size: 3rem; color: var(--primary-blue);"></i>
          </div>
          <div class="case-content" style="padding: 25px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
              <h3 style="color: var(--primary-blue);">{{ item.header }}</h3>
              <span style="background: var(--light-blue); color: var(--primary-blue); padding: 5px 10px; border-radius: 20px; font-size: 0.8rem;">{{ item.ai }}</span>
            </div>
            <p style="color: var(--gray); margin-bottom: 20px;">{{ item.content }}</p>
            <button class="btn-outline" onclick="viewCaseDetail('saas-software')">查看详情</button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 客户评价 -->
  <section class="testimonials">
    <div class="container">
      <h2>客户评价</h2>
      <p class="section-subtitle">听听我们的客户怎么说</p>

      <div class="testimonial-slider" style="max-width: 800px; margin: 0 auto;">
        <div class="testimonial-card" v-for="item in testimonials">
          <div class="testimonial-header">
            <div class="client-info">
              <h3>{{item.name}}</h3>
              <span class="client-title">{{item.description}}</span>
            </div>
          </div>
          <p class="testimonial-text">{{item.appraise}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>