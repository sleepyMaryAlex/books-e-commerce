<script setup>
import '../assets/scss/components/app-purchases.scss';
import { useUserStore } from '@/store/user';
import PurchasesTableItem from './PurchasesTableItem.vue';

const userStore = useUserStore();
</script>

<template>
  <div class="purchases">
    <table class="purchases__table table">
      <thead>
        <tr>
          <th scope="col" class="table__first-col">Product</th>
          <th scope="col">Date</th>
          <th scope="col">Total</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in userStore.currentUser.transactions" :key="index">
          <PurchasesTableItem :transaction="transaction" />
        </tr>
      </tbody>
    </table>
  </div>
</template>
