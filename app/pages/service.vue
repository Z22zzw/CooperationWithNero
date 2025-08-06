<script setup lang="ts">
export interface Item{
  header:string
  icon:string
  content:string
}
interface Order{
  level:string,
  price:number,
  originalPrice?:number,
  merit:Array<string>,
  highlight?:boolean
}
const content:Array<Item>=[
  {
    header:"AI驱动，搜索结果更精准",
    icon:"fas fa-bullseye",
    content:"DeepSeek采用大语言模型（LLM）和深度语义理解技术，能够真正理解用户搜索意图，提供高度相关的答案。"
  },
  {
    header:"增强用户信任，提升品牌影响力",
    icon:"fas fa-shield-alt",
    content:"当您的业务出现在DeepSeek的高质量推荐中，用户会自然产生更强的信任感，从而更愿意选择您的产品或服务。"
  },
  {
    header:"智能推荐，精准触达目标客户",
    icon:"fas fa-user-check",
    content:"DeepSeek能够根据用户的搜索历史、兴趣偏好和行业趋势，智能推荐最适合的内容。"
  },
  {
    header:"内容友好，支持多种推广形式",
    icon:"fas fa-file-alt",
    content:"无论是企业官网、产品介绍、行业报告，还是AI生成的智能问答，DeepSeek都能以最自然的方式呈现您的推广内容。"
  }
]
const orders:Array<Order> = [
  {
    level:"基础版",
    price:1000,
    originalPrice:1500,
    merit:[
        "30个词条",
        "热搜词条规划",
        "内容DeepSeek适配",
        "月度报告",
        "3个平台覆盖"
    ]
  },
  {
    level:"标准版",
    price:2000,
    originalPrice:3000,
    merit:[
        "50个词条",
        "热搜词条规划",
        "内容DeepSeek适配",
        "双周报告",
        "5个平台覆盖"
    ],
    highlight:true
  },
  {
    level:"高级版",
    price:5000,
    originalPrice:6500,
    merit:[
        "80个词条",
        "热搜词条规划",
        "内容DeepSeek适配",
        "周报告+实时监测",
        "全平台覆盖"
    ]
  }
]
const fit:Array<Item> = [
  {
    header:"电商零售",
    icon:"fas fa-shopping-cart",
    content:"精准推荐商品，提高购买转化",
  },
  {
    header:"企业服务",
    icon:"fas fa-building",
    content:"触达B端客户，提升合作机会"
  },
  {
    header:"教育培训",
    icon:"fas fa-graduation-cap",
    content:"匹配学习需求，吸引精准学员"
  },
  {
    header:"医疗健康",
    icon:"fas fa-heartbeat",
    content:"提供权威信息，增强用户信赖"
  },
  {
    header:"金融科技",
    icon:"fas fa-chart-line",
    content:"推荐理财方案，提高用户粘性"
  }
]
// 控制模态框显示的状态变量
const showQrModal = ref(false)

// 打开模态框的函数
const contactUs = () => {
  showQrModal.value = true
}

// 关闭模态框的函数
const closeModal = () => {
  showQrModal.value = false
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
  <!-- 页面横幅 -->
  <section class="hero">
    <div class="hero-container">
      <div class="hero-content">
        <h1>专业GEO生成式引擎优化服务</h1>
        <p>让您的品牌信息精准触达DeepSeek、Kimi、豆包、腾讯元宝等AI平台用户</p>
        <div class="hero-buttons">
          <button class="btn-primary" @click="contactUs()">立即咨询</button>
        </div>
      </div>
      <div class="hero-image">
        <div class="tech-animation">
          <i class="fas fa-robot"></i>
          <i class="fas fa-search"></i>
          <i class="fas fa-chart-line"></i>
        </div>
      </div>
    </div>
  </section>

  <!-- DeepSeek推广服务 -->
  <section class="geo-services">
    <div class="container">
      <h2>DeepSeek推广服务</h2>
      <p class="section-subtitle">AI赋能精准营销，让您的业务脱颖而出</p>
      <div class="feature-grid">
        <div class="feature-card" v-for="item in content" :key="item.header">
          <div class="feature-icon">
            <i :class="item.icon"></i>
          </div>
          <h3>{{item.header}}</h3>
          <p>{{item.content}}</p>
        </div>
      </div>

      <div class="service-details" style="margin-top: 80px;">
        <h3 style="text-align: center; color: var(--primary-blue); margin-bottom: 15px;">DeepSeek推广服务方案</h3>
        <p style="text-align: center; color: var(--gray); margin-bottom: 40px; max-width: 700px; margin-left: auto; margin-right: auto;">选择最适合您业务的方案，开启AI营销新篇章</p>
        
        <!-- 新增定价切换 -->
        <div class="pricing-toggle" style="display: flex; justify-content: center; margin-bottom: 40px;">
          <span style="margin-right: 15px; color: var(--gray);">月付</span>
          <label class="toggle-switch">
            <input type="checkbox" checked>
            <span class="slider"></span>
          </label>
          <span style="margin-left: 15px; color: var(--primary-blue); font-weight: 600;">年付 <span style="font-size: 0.8rem; background: #e0f2fe; padding: 2px 6px; border-radius: 4px;">省20%</span></span>
        </div>
        
        <div class="pricing-table" style="display: flex; justify-content: center; gap: 25px; flex-wrap: wrap; margin-bottom: 60px;">
          <div class="pricing-card" v-for="order in orders" :key="order.level"
               :style="{background: order.highlight ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' : 'var(--white)',
                        border: order.highlight ? '2px solid var(--primary-blue)' : '1px solid #e5e7eb',
                        borderRadius: '15px',
                        boxShadow: order.highlight ? '0 10px 30px rgba(59, 130, 246, 0.15)' : 'var(--shadow)',
                        padding: '35px 30px',
                        width: '320px',
                        transition: 'all 0.3s ease',
                        transform: order.highlight ? 'translateY(-10px)' : 'none'}">
                        
              <!-- 推荐标签 -->
              <div v-if="order.highlight" class="recommended-tag" style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: var(--primary-blue); color: white; padding: 3px 15px; border-radius: 15px; font-size: 0.8rem; font-weight: 600;">推荐方案</div>
              
              <h4 style="color: var(--primary-blue); font-size: 1.4rem; margin-bottom: 20px; position: relative;">{{order.level}}</h4>
              
              <div style="margin-bottom: 25px;">
                <span style="font-size: 2.5rem; color: var(--primary-blue); font-weight: 700;">{{order.price}}</span>
                <span style="color: var(--gray); margin-left: 5px;">元/月</span>
                <div v-if="order.originalPrice" style="margin-top: 5px;">
                  <span style="text-decoration: line-through; color: #9ca3af; font-size: 0.9rem;">{{order.originalPrice}}元/月</span>
                  <span style="margin-left: 8px; color: #10b981; font-size: 0.9rem;">省{{Math.round((order.originalPrice - order.price)/order.originalPrice*100)}}%</span>
                </div>
              </div>
              
              <ul style="list-style: none; margin-bottom: 35px; padding-left: 0;">
                <li style="margin-bottom: 12px; display: flex; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid #f1f5f9;" v-for="merit in order.merit">
                  <i class="fas fa-check-circle" style="color: #10b981; margin-right: 10px; margin-top: 3px;"></i>
                  <span style="color: #374151;">{{merit}}</span>
                </li>
              </ul>
              
              <button class="btn-primary" :style="{width: '100%',
                                                  background: order.highlight ? 'var(--primary-blue)' : '#f3f4f6',
                                                  color: order.highlight ? 'white' : '#6b7280',
                                                  fontWeight: order.highlight ? '600' : 'normal',
                                                  padding: '12px 0',
                                                  borderRadius: '8px',
                                                  transition: 'all 0.3s ease',
                                                  border: 'none',
                                                  cursor: 'pointer',
                                                  fontSize: '1rem'}" @click="contactUs()">{{order.highlight ? '立即选择' : '了解更多'}}</button>
          </div>
        </div>
      </div>

      <div class="suitable-industries" style="margin-top: 80px;">
        <h3 style="text-align: center; color: var(--primary-blue); margin-bottom: 30px;">适合哪些行业</h3>
        <div class="industry-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
          <div class="industry-card" style="background: var(--white); border-radius: 15px; padding: 20px; text-align: center; box-shadow: var(--shadow);" v-for="it in fit" :key="it.header">
            <i :class="it.icon" style="font-size: 2rem; color: var(--primary-blue); margin-bottom: 15px;"></i>
            <h4 style="color: var(--primary-blue); margin-bottom: 10px;">{{it.header}}</h4>
            <p style="color: var(--gray);">{{it.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 新增样式 */
.pricing-card {
  position: relative;
  overflow: hidden;
}

.pricing-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

/* 切换按钮样式 */
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e5e7eb;
  transition: .4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--primary-blue);
}

input:checked + .slider:before {
  transform: translateX(30px);
}
</style>