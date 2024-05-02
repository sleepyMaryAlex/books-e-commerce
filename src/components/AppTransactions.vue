<script setup>
import { useUserStore } from '@/stores/user';
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

<style lang="scss" scoped>
.table {
  width: 100%;
  border-spacing: 20px;

  & th {
    @include font(14px, 500, 17px);
    color: $text-pale-dark;
    text-transform: uppercase;
    text-align: left;
    padding: 20px 0;
  }

  & td {
    @include font(16px, 500, 20px);
    text-transform: uppercase;
    min-width: 80px;
    padding: 20px 0;
  }

  & .table__first-col {
    width: 50%;
  }
}
</style>
