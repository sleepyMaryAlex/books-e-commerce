<script setup>
import '../assets/scss/components/settings-button.scss';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import settingsIcon from '../assets/images/icons/settings.svg';
import AppModal from './AppModal.vue';
import AppPurchases from './AppPurchases.vue';
import AppTransactions from './AppTransactions.vue';
import AppPopover from './AppPopover.vue';

const store = useUserStore();

const isPopoverOpened = ref(false);
const isDetailsModalOpened = ref(false);

const currentTab = ref('purchases');
const tabs = {
  purchases: AppPurchases,
  transactions: AppTransactions
};

function openDetailsModal(tab) {
  currentTab.value = tab;
  isDetailsModalOpened.value = true;
  isPopoverOpened.value = false;
}

function handleLogOut() {
  store.deleteCurrentUser();
  isPopoverOpened.value = false;
}
</script>

<template>
  <button
    v-if="store.currentUser"
    type="button"
    class="header__settings-button"
    @click="isPopoverOpened = !isPopoverOpened"
  >
    <img :src="settingsIcon" alt="Settings" />
  </button>
  <AppPopover
    :isPopoverOpened="isPopoverOpened"
    @openDetailsModal="openDetailsModal"
    @handleLogOut="handleLogOut"
  />
  <Transition>
    <AppModal
      v-if="isDetailsModalOpened"
      :isDetailsModalOpened="isDetailsModalOpened"
      @closeDetailsModalOpened="isDetailsModalOpened = false"
    >
      <template #header>
        <div class="tabs"></div>
        <button
          v-for="(_, tab) in tabs"
          :key="tab"
          :class="['tabs__button', { active: currentTab === tab }]"
          @click="currentTab = tab"
        >
          {{ tab }}
        </button>
      </template>
      <template #content><component :is="tabs[currentTab]"></component></template>
    </AppModal>
  </Transition>
</template>
