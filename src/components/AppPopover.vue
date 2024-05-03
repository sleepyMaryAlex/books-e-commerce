<script setup>
import '../assets/scss/components/app-popover.scss';
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
