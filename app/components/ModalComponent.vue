<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h2>{{ title }}</h2>
            </slot>
            <button class="close-btn" @click="close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <slot></slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="secondary-btn" @click="close">取消</button>
              <button class="primary-btn" @click="confirm">确认</button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: {
    type: String,
    default: '提示'
  },
  closeOnEsc: {
    type: Boolean,
    default: true
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'close'])

const isOpen = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal
  if (newVal) {
    document.body.classList.add('modal-open')
    if (props.closeOnEsc) {
      document.addEventListener('keydown', handleKeydown)
    }
  } else {
    document.body.classList.remove('modal-open')
    document.removeEventListener('keydown', handleKeydown)
  }
})

function handleKeydown(e) {
  if (e.key === 'Escape') close()
}

function close() {
  if (props.closeOnClickOutside) {
    isOpen.value = false
    emit('update:modelValue', false)
    emit('close')
  }
}

function confirm() {
  emit('confirm')
  close()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: #999;
  padding: 4px;
  transition: all 0.2s;
}

.close-btn:hover {
  color: #333;
  transform: rotate(90deg);
}

.modal-body {
  padding: 24px;
  flex-grow: 1;
  color: #555;
  line-height: 1.6;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.primary-btn {
  background-color: #4361ee;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.primary-btn:hover {
  background-color: #3a56d4;
}

.secondary-btn {
  background-color: #f8f9fa;
  color: #495057;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.secondary-btn:hover {
  background-color: #e9ecef;
}

/* 动画效果 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: translateY(-20px);
}
</style>

<style>
.modal-open {
  overflow: hidden;
}
</style>
