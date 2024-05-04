<script setup>
import '../assets/scss/components/app-purchases.scss';
import { useUserStore } from '@/store/user';
import PurchasesTableItem from './PurchasesTableItem.vue';

const userStore = useUserStore();
</script>

<template>
  <div class="purchases">
    <div class="purchases__container" v-if="userStore.currentUser.transactions.length !== 0">
      <div class="purchases__grid purchases__grid_title">
        <p>Product</p>
        <p>Date</p>
        <p>Total</p>
        <p>Actions</p>
      </div>
      <div
        class="purchases__item"
        v-for="(transaction, index) in userStore.currentUser.transactions"
        :key="index"
      >
        <PurchasesTableItem :transaction="transaction" />
      </div>
    </div>
  </div>
</template>
