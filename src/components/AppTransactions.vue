<script setup>
import '../assets/scss/components/app-transactions.scss';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
</script>

<template>
  <div class="transactions">
    <div class="transactions__container" v-if="userStore.currentUser.transactions.length !== 0">
      <div class="transactions__grid transactions__grid_title">
        <p>Product</p>
        <p>Date</p>
        <p>Total</p>
      </div>
      <div
        v-for="(transaction, index) in userStore.currentUser.transactions"
        :key="index"
        class="transactions__grid"
      >
        <p>
          Books ({{
            transaction.products.reduce((total, current) => total + Number(current.quantity), 0)
          }})
        </p>
        <p>
          {{ transaction.date }}
        </p>
        <p>${{ transaction.totalPrice }}</p>
      </div>
    </div>
  </div>
</template>
