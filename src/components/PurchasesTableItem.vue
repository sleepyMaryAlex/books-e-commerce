<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();

defineProps(['transaction']);

const isDetailsOpened = ref(false);

function handleBuyAgainButtonClick(book) {
  cartStore.addToCart(book, 1);
  router.push('/cart');
}
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

<style lang="scss" scoped>
.table__cell {
  @include font(16px, 500, 20px);
  text-transform: uppercase;
  min-width: 80px;
  padding: 20px 0;
  position: relative;

  & div {
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.table__details-button {
  display: inline;
  text-transform: none;
  color: $text-pale-dark;
  border-bottom: 1px solid $text-pale-dark;
  cursor: pointer;
}

.table__details {
  opacity: 0;
  height: 0;
  padding-top: 10px;
  transition: all 0.5s;
  color: $text-pale-dark;
  text-transform: none;
  @include flex(column, flex-start, stretch);
  gap: 10px;

  &.active {
    opacity: 1;
    height: auto;
  }
}

.table__buy-again-button {
  cursor: pointer;
}
</style>
