<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
definePageMeta({
  layout: false
})
const router = useRouter()
const email = ref('')
const password = ref('') // 添加密码字段用于模拟登录
const emailError = ref('')
const passwordError = ref('')
const loginError = ref('')
const isLoading = ref(false)

// 验证邮箱格式
const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

const validateForm = () => {
  let isValid = true

  if (!email.value) {
    emailError.value = '邮箱不能为空'
    isValid = false
  } else if (!isValidEmail(email.value)) {
    emailError.value = '请输入有效的邮箱地址'
    isValid = false
  } else {
    emailError.value = ''
  }

  if (!password.value) {
    passwordError.value = '密码不能为空'
    isValid = false
  } else {
    passwordError.value = ''
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  try {
    isLoading.value = true
    loginError.value = ''

    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟登录验证
    if (email.value === 'dangxia@163.com' && password.value === '123456') {
      // 模拟获取token
      const mockToken = 'mock_jwt_token_' + Math.random().toString(36).substring(2)

      // 存储token到localStorage
      localStorage.setItem('token', mockToken)
      localStorage.setItem('userEmail', email.value)

      console.log('模拟登录成功', { token: mockToken })

      // 跳转到首页
      router.push('/dashboard')
    } else {
      throw new Error('邮箱或密码错误')
    }

  } catch (error) {
    loginError.value = error instanceof Error ? error.message : '登录失败'
  } finally {
    isLoading.value = false
  }
}

const wechatLogin = () => {
  console.log('微信登录')
  alert('模拟微信登录功能')
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <!-- 用户图标 -->
      <div class="user-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
        </svg>
      </div>

      <!-- 标题 -->
      <h1 class="login-title">使用电子邮件登录</h1>

      <!-- 表单区域 -->
      <div class="login-form">
        <div class="input-group">
          <label for="email">电子邮件</label>
          <input
              id="email"
              type="email"
              placeholder="您的电子邮件地址"
              v-model="email"
              @blur="validateForm"
              @input="emailError = ''"
              autocomplete="off"
              :disabled="isLoading"
          >
          <p v-if="emailError" class="text-error">{{ emailError }}</p>
        </div>

        <div class="input-group">
          <label for="password">密码</label>
          <input
              id="password"
              type="password"
              placeholder="请输入您的密码"
              v-model="password"
              @input="passwordError = ''"
              :disabled="isLoading"
          >
          <p v-if="passwordError" class="text-error">{{ passwordError }}</p>
        </div>

        <p v-if="loginError" class="text-error">{{ loginError }}</p>

        <button
            class="login-button"
            @click="handleLogin"
            :disabled="isLoading"
        >
          {{ isLoading ? '登录中...' : '登录' }}
        </button>

        <div class="divider">
          <span class="divider-text">或</span>
        </div>

        <button
            class="wechat-login-button"
            @click="wechatLogin"
            :disabled="isLoading"
        >
          <img
              src="https://ts2.tc.mm.bing.net/th/id/OSAAS.7863A2F4F2A334D3E00E231B18F70418CC5608BDE28449381BE0B2884AB88E28?w=72&h=72&c=1&rs=1&o=6&dpr=1.5&pid=TechQna"
              alt="微信"
              class="wechat-icon"
          >
          微信登录
        </button>
      </div>

      <!-- 注册链接 -->
      <div class="register-link">
        没有帐户? <NuxtLink to="/register" class="register-text">注册</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: white;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.user-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.user-icon svg {
  width: 48px;
  height: 48px;
  color: #333;
}

.login-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 0.875rem;
  color: #333;
  font-weight: 500;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.input-group input:focus {
  outline: none;
  border-color: #666;
}

.login-button {
  width: 100%;
  padding: 12px;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

.login-button:hover {
  background-color: #333;
}

.login-button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.text-error {
  color: #ff4d4f;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  height: 1rem;
}

.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #999;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ddd;
}

.divider-text {
  padding: 0 10px;
  font-size: 0.875rem;
}

.wechat-login-button {
  width: 100%;
  padding: 12px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.wechat-login-button:hover {
  background-color: #f5f5f5;
}

.wechat-login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.wechat-icon {
  width: 20px;
  height: 20px;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 0.875rem;
}

.register-text {
  color: #333;
  font-weight: 500;
  text-decoration: none;
}

.register-text:hover {
  text-decoration: underline;
}
</style>
