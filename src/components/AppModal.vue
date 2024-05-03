<script setup>
import '../assets/scss/components/app-modal.scss';
import { defineProps, defineEmits, ref, inject } from 'vue';
import { onClickOutside } from '@vueuse/core';

const { isAuthModalOpened, setAuthModalOpened } = inject('isAuthModalOpened');
defineProps(['isDetailsModalOpened']);
const emit = defineEmits(['closeDetailsModalOpened']);
const modalContainer = ref(null);

onClickOutside(modalContainer, () => {
  setAuthModalOpened(false);
  emit('closeDetailsModalOpened');
});
</script>

<template>
  <div v-if="isAuthModalOpened || isDetailsModalOpened" class="modal">
    <div
      class="modal__container"
      ref="modalContainer"
      :class="{
        modal__container_details: isDetailsModalOpened
      }"
    >
      <div class="modal__header">
        <slot name="header"></slot>
      </div>
      <div class="modal__body">
        <slot name="content"></slot>
      </div>
      <div class="modal__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
