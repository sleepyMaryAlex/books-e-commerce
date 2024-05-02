<script setup>
const { isPopoverOpened } = defineProps(['isPopoverOpened']);
const emit = defineEmits(['openDetailsModal', 'handleLogOut']);
</script>

<template>
  <Transition>
    <div class="popover" v-show="isPopoverOpened">
      <button type="button" class="popover__button" @click="emit('openDetailsModal', 'purchases')">
        Purchases
      </button>
      <button
        type="button"
        class="popover__button"
        @click="emit('openDetailsModal', 'transactions')"
      >
        Transactions
      </button>
      <button type="button" class="popover__button" @click="emit('handleLogOut')">Log out</button>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.popover {
  @include flex(column, flex-start, stretch);
  width: 150px;
  position: absolute;
  top: 60px;
  right: 70px;
}

.popover__button {
  width: 100%;
  height: 50px;
  background-color: $bg-dark;
  color: $text-light;
  @include font(16px, 500, 20px);
  cursor: pointer;
}
</style>
