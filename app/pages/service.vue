<script setup lang="ts">
import { ref } from 'vue'
const isYear = ref(true)

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
interface Morder{
  price: number;
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
    price:3600,
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
    price:7200,
    merit:[
        "50个词条",
        "热搜词条规划",
        "内容DeepSeek适配",
        "双周报告",
        "5个平台覆盖"
    ]
  },
  {
    level:"高级版",
    price:12000,
    merit:[
        "80个词条",
        "热搜词条规划",
        "内容DeepSeek适配",
        "周报告+实时监测",
        "全平台覆盖"
    ]
  }
]
const morders:Array<Order> = [
  {
    level:"基础版",
    price:300,
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
    price:600,
    merit:[
        "50个词条",
        "热搜词条规划",
        "内容DeepSeek适配",
        "双周报告",
        "5个平台覆盖"
    ]
  },
  {
    level:"高级版",
    price:1000,
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
      <img src="~/assets/qr1.webp" alt="二维码" class="qr-image" decoding="async" loading="lazy" />
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

      <div class="service-details" style="margin-top: 60px;">
        <h3 style="text-align: center; color: var(--primary-blue); margin-bottom: 30px;">DeepSeek推广服务方案</h3>
        <!-- 切换年付和月付的按钮 -->
        <div class="pricing-toggle">
          <span class="toggle-label" :class="{ 'active': isYear }">年付</span>
          <label class="toggle-container">
            <input type="checkbox" name="checkboxswitch" v-model="isYear" class="toggle-input">
            <span class="toggle-slider"></span>
          </label>
          <span class="toggle-label" :class="{ 'active': !isYear }">月付</span>
        </div>
        <div class="pricing-table" style="display: flex; justify-content: center; gap: 30px; flex-wrap: wrap;">
          <div class="pricing-card" style="background: var(--white); border-radius: 15px; box-shadow: var(--shadow); padding: 30px; width: 300px; transition: var(--transition);" v-for="order in orders" :key="order.level">
            <h4 style="color: var(--primary-blue); font-size: 1.3rem; margin-bottom: 15px;">{{order.level}}</h4>
            <div style="font-size: 2rem; color: var(--primary-blue); font-weight: 700; margin-bottom: 20px;" v-if="isYear">{{order.price}}元/年</div>
            <div style="font-size: 2rem; color: var(--primary-blue); font-weight: 700; margin-bottom: 20px;" v-if="!isYear">{{morders[orders.indexOf(order)].price}}元/月</div>

            <ul style="list-style: none; margin-bottom: 30px;">
              <li style="margin-bottom: 10px; display: flex; align-items: center;" v-for="merit in order.merit"><i class="fas fa-check" style="color: var(--primary-blue); margin-right: 10px;"></i>{{merit}}</li>
            </ul>
            
            <button class="btn-primary" style="width: 100%;" @click="contactUs()">选择方案</button>
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
.pricing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  gap: 15px;
}

.toggle-container {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 30px;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
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

.toggle-slider:before {
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

.toggle-input:checked + .toggle-slider {
  background-color: var(--primary-blue);
}

.toggle-input:checked + .toggle-slider:before {
  transform: translateX(30px);
}

.toggle-label {
  position: relative;
  color: #6b7280;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  margin-right: 20px;
}

.toggle-label:before {
  content: attr(data-label);
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-label:nth-child(1) {
  padding-right: 10px;
}

.toggle-label:nth-child(3) {
  padding-left: 10px;
}

.toggle-label.active {
  color: var(--primary-blue);
  font-weight: 600;
}

/* 为年付标签添加优惠标记 */
.toggle-label:nth-child(1).active:after {
  content: "省20%"; 
  position: absolute;
  font-size: 0.7rem;
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary-blue);
  padding: 1px 5px;
  border-radius: 4px;
  margin-left: 5px;
  top: 50%;
  transform: translateY(-50%);
}

/* 适配移动设备 */
@media (max-width: 768px) {
  .pricing-toggle {
    flex-direction: column;
    gap: 10px;
  }
}
</style>