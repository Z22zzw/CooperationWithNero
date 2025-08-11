<script lang="ts" setup>
definePageMeta({
  layout: "custom",
})
import {ref, watch} from 'vue'
import ModalComponent from '~/components/ModalComponent.vue'
import {Fetcher} from "~/composables/fetcher";
import {v4 as uuidv4} from 'uuid';

const showModal = ref(false)

// AI 输入
const aiKeyword = ref('');
const customQuestion = ref('');
const sidePanelVisible = ref(false);

const aiSuggestions = ref<string[]>([]);
// 打开右侧子弹窗
const isloading=ref(true)
const isSubmit=ref<any>(null)
const openSidePanel = async () => {
  sidePanelVisible.value = true;
  isloading.value=true;
  if (!aiKeyword.value.trim()) {
    aiKeyword.value = '生成式搜索引擎';
  }
  var formData = new FormData();
  formData.append("question", aiKeyword.value);
  try {
    const result = await Fetcher()
        .withBaseUrl("http://192.168.0.10:8080")
        .post<{ data: string[] }>("/questionAI", formData);

    aiSuggestions.value = result.data;

    isloading.value = false;
    console.log('aiSuggestions:', aiSuggestions.value);
  } catch (error) {
    console.error('请求失败:', error);
    isloading.value = false;
  }
};
// 选择建议
const selectSuggestion = (suggestion: string) => {
  customQuestion.value = suggestion;
  sidePanelVisible.value = false;
};
const handleConfirm = (question: string) => {
  showModal.value = false;
  const ProjectId=useRoute().params.id;
  isSubmit.value=Fetcher()
      .withHeader({
        "Content-Type": "application/json",
      })
      .withBaseUrl("http://192.168.0.10:8080").put<string>("/api/addissue", {
        project_id: ProjectId,
        issueList: [
          {
            id: uuidv4(),
            name: question,
            mention_times: 0,
            citations: 0,
            updated_at: new Date().toISOString()
          }
        ]
      })
};
// 在模态框关闭时重置侧边面板
watch(showModal, (newVal) => {
  if (!newVal) {
    sidePanelVisible.value = false;
  }
});
// 删除建议项
const removeSuggestion = (index: number) => {
  aiSuggestions.value.splice(index, 1);
};
// 应用建议项（提交）
const applySuggestion = () => {
  if (aiSuggestions.value.length != 0) {
    // 实际提交逻辑
    const ProjectId=useRoute().params.id;
    const addIssues=[];
    for (const Issue of aiSuggestions.value) {
      addIssues.push(
        {
          id: uuidv4(),
          name:Issue,
          mention_times: 0,
          citations: 0,
          updated_at:new Date().toISOString()
        }
      );
    }
    isSubmit.value=Fetcher().withBaseUrl("http://192.168.0.10:8080").withHeader({
      "content-type": "application/json"
    }).put<{
      project_id:string,
      issues:string[]
    }>("/api/addissue",{
      project_id:ProjectId,
      issueList:addIssues
    })
    console.log({
      project_id:ProjectId,
      issueList:addIssues
    })
    sidePanelVisible.value = false;
    showModal.value = false;
  }
};
</script>

<template>
  <div>
    <div class="header-controls">
      <TabSwitch/>
      <div class="add-btn">
        <button class="elegant-button" @click="showModal = true">
          <span class="icon-wrapper">
            <i class="fas fa-plus-circle"></i>
          </span>
          <span class="btn-text">添加新问题</span>
        </button>
      </div>
    </div>

    <div class="issue-container">
      <ModalComponent
          v-model="showModal"
          title="添加新问题"
          @confirm="handleConfirm"
          class="custom-modal"
      >
        <template #header>
          <h2 class="modal-title">添加新问题</h2>
        </template>

        <!-- AI 生成问题 -->
        <div class="form-section">
          <label class="section-label">AI 生成问题</label>
          <div class="input-group">
            <input
                type="text"
                v-model="aiKeyword"
                placeholder="输入关键词，例如：项目管理、AI 伦理..."
                class="input-field"
            />
            <button class="btn-primary" @click="openSidePanel">生成</button>
          </div>
        </div>

        <!-- 分隔线 -->
        <div class="divider">
          <span class="divider-text">或</span>
        </div>

        <!-- 自定义问题 -->
        <div class="form-section">
          <label class="section-label">自定义问题</label>
          <input
              type="text"
              v-model="customQuestion"
              placeholder="请输入你的问题"
              class="input-field full-width"
          />
        </div>

        <!-- Footer -->
        <template #footer>
          <div class="footer-buttons">
            <button @click="showModal = false" class="btn-secondary">取消</button>
            <button @click="handleConfirm(customQuestion)" class="btn-primary">提交</button>
          </div>
        </template>
      </ModalComponent>
    </div>

    <Teleport to="body">
      <Transition name="slide">
        <div
            v-if="sidePanelVisible && showModal"
            class="side-panel-external"
            @click.stop
        >
          <div class="panel-container">
            <div class="side-panel-header">
              <h3>AI 生成建议</h3>
              <button class="close-btn" @click="sidePanelVisible = false">×</button>
            </div>

            <div class="side-panel-body">
              <loading v-if="isloading"/>
              <div
                  v-for="(suggestion, index) in aiSuggestions"
                  :key="index"
                  class="suggestion-item"
                  @click="selectSuggestion(suggestion)"
                  v-else
              >
                <div class="suggestion-content" >
                  {{ suggestion }}
                </div>
                <button
                    class="remove-btn"
                    @click.stop="removeSuggestion(index)"
                >
                  ×
                </button>
              </div>
            </div>

            <!-- 底部按钮区域 -->
            <div class="panel-footer">
              <button
                  class="btn-submit"
                  @click="applySuggestion"
              >
                确认添加
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
  <div class="issue-container">
    <issue-table :key="isSubmit"/>
  </div>
</template>

<style scoped>
.header-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border: 1px solid #e9ecef;
  border-radius: 14px;
  padding: 16px 20px;
  box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.03),
      0 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  position: relative;
  z-index: 10;
}

/* 添加底部微妙渐变效果 */
.header-controls::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.05), transparent);
  border-radius: 0 0 14px 14px;
}

.add-btn {
  display: flex;
}

.elegant-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #007aff, #0062cc);
  color: white;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
      0 4px 10px rgba(0, 122, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  min-width: 170px;
}
/* 移除按钮样式 */
.remove-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
  opacity: 0;
  visibility: hidden;
}

.suggestion-item:hover .remove-btn {
  opacity: 1;
  visibility: visible;
}

.remove-btn:hover {
  background: #ff5252;
  transform: translateY(-50%) scale(1.1);
}

/* 建议内容区域 */
.suggestion-content {
  padding-right: 30px; /* 为删除按钮留空间 */
  transition: all 0.3s;
}

.suggestion-item:hover .suggestion-content {
  transform: translateX(3px);
}

/* 面板底部样式 */
.panel-footer {
  padding: 20px;
  border-top: 1px solid #edf2f7;
  background: white;
}

.btn-submit {
  background: #3498db;
  color: white;
  border: none;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.25);
}

.btn-submit:active {
  transform: translateY(0);
}

.btn-submit:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.elegant-button:hover {
  transform: translateY(-2px);
  box-shadow:
      0 6px 14px rgba(0, 122, 255, 0.25),
      inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.elegant-button:active {
  transform: translateY(0);
  box-shadow:
      0 2px 8px rgba(0, 122, 255, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* 微妙的脉冲动画效果 */
.elegant-button::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 100%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: all 0.8s ease;
}

.elegant-button:active::after {
  width: 200px;
  height: 200px;
  opacity: 0.3;
  transition: 0s;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

.icon-wrapper i {
  font-size: 18px;
  transition: transform 0.3s ease;
}

.elegant-button:hover .icon-wrapper i {
  transform: scale(1.2);
}

.btn-text {
  position: relative;
  letter-spacing: 0.3px;
}
/* 模态框样式 */
.custom-modal :deep() .modal-content {
  width: 600px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-size: 22px;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
}

/* 表单部分 */
.form-section {
  margin-bottom: 25px;
}

.section-label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #34495e;
  font-size: 16px;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
}

.input-field {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #e0e6ed;
  border-radius: 8px;
  font-size: 15px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.full-width {
  width: 80%;
}

.btn-primary {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #2980b9;
}

/* 分隔线 */
.divider {
  position: relative;
  margin: 30px 0;
  text-align: center;
}

.divider:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, #e0e6ed, transparent);
}

.divider-text {
  position: relative;
  display: inline-block;
  padding: 0 15px;
  background: white;
  color: #7f8c8d;
  font-weight: 500;
}

/* 底部按钮 */
.footer-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 15px 0 5px;
}

.btn-secondary {
  background: white;
  color: #34495e;
  border: 1px solid #e0e6ed;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #f8f9fa;
  border-color: #d6dee7;
}

/* 外部侧边面板 */
.side-panel-external {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 350px;
  z-index: 1999;
}

.panel-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.08);
}

/* 滑动动画 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* 侧边面板样式 */
.side-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px 15px;
  background-color: #f9fbfd;
  border-bottom: 1px solid #eaeff5;
}

.side-panel-header h3 {
  margin: 0;
  font-size: 18px;
  color: #2c3e50;
  font-weight: 700;
}

.close-btn {
  font-size: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #95a5a6;
  transition: all 0.2s;
  padding: 5px;
  border-radius: 4px;
}

.close-btn:hover {
  background: #f5f7fa;
  color: #e74c3c;
}

.side-panel-body {
  padding: 15px 20px;
  overflow-y: auto;
  flex-grow: 1;
}

.suggestion-item {
  padding: 15px 18px;
  margin: 10px 0;
  border-radius: 10px;
  background-color: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  border: 1px solid #edf2f7;
  color: #2d3748;
  font-size: 15px;
}

.suggestion-item:hover {
  background-color: #edf6ff;
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.15);
  transform: translateX(-5px);
  border-color: #d6e6ff;
}

.suggestion-item:active {
  transform: translateX(0);
}
.issue-container {
  margin-top: 20px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.03),
      0 1px 3px rgba(0, 0, 0, 0.02);
}
</style>