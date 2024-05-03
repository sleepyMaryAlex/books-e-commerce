<script setup>
import '../assets/scss/components/purchases-table-item.scss';
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import { useUsersStore } from '@/store/users';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const usersStore = useUsersStore();

defineProps(['transaction']);

const isDetailsOpened = ref(false);

const handleBuyAgainButtonClick = (book) => {
  userStore.addToCart(book, 1);
  usersStore.addToCart(book, 1, userStore.currentUser.id);
  router.push('/cart');
};
</script>

<template>
  <td class="table__cell">
    <p class="table__title">
      Books ({{
        transaction.products.reduce((total, current) => total + Number(current.quantity), 0)
      }})
    </p>
    <div
      class="table__details"
      :class="{
        active: isDetailsOpened
      }"
    >
      <p v-for="product in transaction.products" :key="product.book.id">
        {{ product.book.title }} x {{ product.quantity }}
      </p>
    </div>
  </td>
  <td class="table__cell">
    <p>{{ transaction.date }}</p>
    <div
      class="table__details"
      :class="{
        active: isDetailsOpened
      }"
    >
      <p v-for="product in transaction.products" :key="product.book.id">
        {{ transaction.date }}
      </p>
    </div>
  </td>
  <td class="table__cell">
    <p>${{ transaction.totalPrice }}</p>
    <div
      class="table__details"
      :class="{
        active: isDetailsOpened
      }"
    >
      <p v-for="product in transaction.products" :key="product.book.id">
        ${{ product.book.price }} x {{ product.quantity }}
      </p>
    </div>
  </td>
  <td class="table__cell">
    <p class="table__details-button" @click="isDetailsOpened = !isDetailsOpened">
      {{ isDetailsOpened ? 'Show less' : 'Show more' }}
    </p>
    <div
      class="table__details"
      :class="{
        active: isDetailsOpened
      }"
    >
      <p
        v-for="product in transaction.products"
        :key="product.book.id"
        class="table__buy-again-button"
        @click="handleBuyAgainButtonClick(product.book)"
      >
        Buy again
      </p>
    </div>
  </td>
</template>
