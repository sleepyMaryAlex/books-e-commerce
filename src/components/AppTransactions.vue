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
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    color: $text-pale-dark;
    text-transform: uppercase;
    text-align: left;
    padding: 20px 0;
  }

  & td {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    text-transform: uppercase;
    min-width: 80px;
    padding: 20px 0;
  }

  & .table__first-col {
    width: 50%;
  }
}
</style>
