<script setup>
import '../assets/scss/components/settings-button.scss';
import { ref, inject } from 'vue';
import { useUserStore } from '@/store/user';
import settingsIcon from '../assets/images/icons/settings.svg';
import AppModal from './AppModal.vue';
import AppPurchases from './AppPurchases.vue';
import AppTransactions from './AppTransactions.vue';
import AppPopover from './AppPopover.vue';

const userStore = useUserStore();

const isPopoverOpened = ref(false);
const { isModalOpened, setModalOpened } = inject('isModalOpened');

const currentTab = ref('purchases');
const tabs = {
  purchases: AppPurchases,
  transactions: AppTransactions
};

const openDetailsModal = (tab) => {
  currentTab.value = tab;
  isPopoverOpened.value = false;
  setModalOpened(true);
};

const handleLogOut = () => {
  userStore.deleteCurrentUser();
  isPopoverOpened.value = false;
};
</script>

<template>
  <button
    v-if="userStore.currentUser"
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
    <AppModal v-if="isModalOpened && userStore.currentUser">
      <div class="modal__block">
        <div class="tabs">
          <button
            v-for="(_, tab) in tabs"
            :key="tab"
            :class="['tabs__button', { active: currentTab === tab }]"
            @click="currentTab = tab"
          >
            {{ tab }}
          </button>
        </div>
        <div><component :is="tabs[currentTab]"></component></div>
        <p v-if="userStore.currentUser.transactions.length === 0" class="modal__message">
          No {{ currentTab }}
        </p>
      </div>
    </AppModal>
  </Transition>
</template>
