<script setup>
import '../assets/scss/components/app-modal.scss';
import { ref, inject } from 'vue';
import { onClickOutside } from '@vueuse/core';

const { isModalOpened, setModalOpened } = inject('isModalOpened');
const modalContainer = ref(null);

onClickOutside(modalContainer, () => {
  setModalOpened(false);
});
</script>

<template>
  <div v-if="isModalOpened" class="modal">
    <div class="modal__container" ref="modalContainer">
      <slot></slot>
    </div>
  </div>
</template>
