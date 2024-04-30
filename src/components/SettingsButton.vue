<script setup>
import { ref, inject } from 'vue';
import { useUserStore } from '@/stores/user';
import settingsIcon from '../assets/icons/settings.svg';
import AppModal from './AppModal.vue';
import AppPurchases from './AppPurchases.vue';
import AppTransactions from './AppTransactions.vue';

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
  <Transition>
    <div class="popover" v-show="isPopoverOpened">
      <button type="button" class="popover__button" @click="openDetailsModal('purchases')">
        Purchases
      </button>
      <button type="button" class="popover__button" @click="openDetailsModal('transactions')">
        Transactions
      </button>
      <button type="button" class="popover__button" @click="handleLogOut">Log out</button>
    </div>
  </Transition>
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

<style lang="scss" scoped>
.header__settings-button {
  width: 48px;
  height: 48px;
  @include flex(row, center, center);
  background-color: $bg-dark;
  cursor: pointer;
}

.header__settings-button {
  background-color: $bg-light;
  border: 1px solid $border-dark;
}

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
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
}

.tabs {
  width: 856px;
}

.tabs__button {
  width: 50%;
  height: 62px;
  cursor: pointer;
  text-transform: capitalize;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  color: $text-pale-dark;
  transition: all 0.3s;

  &.active {
    color: $text-dark;
    border-bottom: 1px solid $text-dark;
  }
}

@media (max-width: 1060px) {
  .tabs {
    width: 600px;
  }
}

@media (max-width: 767px) {
  .tabs {
    width: 100%;
  }
}
</style>
