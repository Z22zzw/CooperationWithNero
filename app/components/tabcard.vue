<template>
  <div class="compact-tab-switcher">
    <div class="compact-tabs">
      <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="['compact-tab-button', { active: activeValue === tab.value }]"
          @click="$emit('update:activeValue', tab.value)"
      >
        <span class="button-text">{{ tab.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tabs: { name: string; value: string }[]
  activeValue: string
}>()

defineEmits<{
  (event: 'update:activeValue', value: string): void
}>()
</script>

<style scoped>
.compact-tab-switcher {
  display: flex;
  justify-content: flex-start;
}

.compact-tabs {
  display: flex;
  border-radius: 8px;
  background-color: #f3f4f6;
  padding: 4px;
}

.compact-tab-button {
  border: none;
  background: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.compact-tab-button.active {
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-weight: 500;
}

.button-text {
  white-space: nowrap;
}
</style>