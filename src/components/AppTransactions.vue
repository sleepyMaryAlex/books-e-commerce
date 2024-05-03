<script setup>
import '../assets/scss/components/app-transactions.scss';
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
</script>

<template>
  <div class="transactions">
    <table class="transactions__table table">
      <thead>
        <tr>
          <th scope="col" class="table__first-col">Product</th>
          <th scope="col">Date</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(transaction, index) in userStore.currentUser.transactions" :key="index">
          <td class="table__title">
            Books ({{
              transaction.products.reduce((total, current) => total + Number(current.quantity), 0)
            }})
          </td>
          <td>
            {{ transaction.date }}
          </td>
          <td>${{ transaction.totalPrice }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
