<script setup>
import { useUserStore } from '@/stores/user';
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

<style lang="scss" scoped>
.table {
  width: 100%;
  border-spacing: 20px;

  & th {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    color: $text-pale-dark;
    text-transform: uppercase;
    text-align: left;
    padding: 20px 0;
    width: 25%;
  }

  & .table__first-col {
    width: 35%;
  }
}

@media (max-width: 767px) {
  .table {
    border-spacing: 10px;
  }
}
</style>
