<script setup>
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

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  @include flex(column, center, center);
}

.modal__container {
  min-height: 690px;
  padding: 40px 56px;
  background-color: $bg-light;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  @include flex(column, space-between, stretch);
  gap: 40px;

  &.modal__container_details {
    @include flex(column, flex-start, stretch);
  }
}

.modal__footer {
  @include flex(row, center, stretch);
}

@media (max-width: 767px) {
  .modal__container {
    width: 95%;
    min-height: 690px;
    padding: 45px 40px;
    gap: 40px;
  }
}

@media (max-width: 478px) {
  .modal__container {
    min-height: 650px;
    padding: 30px 20px;
    gap: 20px;
  }
}
</style>
