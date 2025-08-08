<template>
  <NuxtLayout/>
  <Teleport to="body">
    <Modal v-if="status.isModalOpened" @close="status.closeModal" />
  </Teleport>
</template>
<script setup lang="ts">
import Modal from "~/components/Modal.vue";
import {useStore} from "~/stores";
import { ref } from "vue";

const status = useStore();
</script>