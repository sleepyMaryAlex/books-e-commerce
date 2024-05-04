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
  <div class="purchases__grid">
    <p>
      Books ({{
        transaction.products.reduce((total, current) => total + Number(current.quantity), 0)
      }})
    </p>
    <p>{{ transaction.date }}</p>
    <p>${{ transaction.totalPrice }}</p>
    <p class="purchases__details-button" @click="isDetailsOpened = !isDetailsOpened">
      {{ isDetailsOpened ? 'Show less' : 'Show more' }}
    </p>
  </div>
  <div
    class="purchases__details"
    :class="{
      active: isDetailsOpened
    }"
  >
    <div v-for="product in transaction.products" :key="product.book.id" class="purchases__grid">
      <p>{{ product.book.title }} x {{ product.quantity }}</p>
      <p>
        {{ transaction.date }}
      </p>
      <p>${{ product.book.price }} x {{ product.quantity }}</p>
      <p class="purchases__buy-again-button" @click="handleBuyAgainButtonClick(product.book)">
        Buy again
      </p>
    </div>
  </div>
</template>
