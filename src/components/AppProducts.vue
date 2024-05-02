<script setup>
import books from '../app/books';
import { computed, onMounted, ref, watchEffect, inject } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { useUserStore } from '@/stores/user';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();
const cartStore = useCartStore();

const { isAuthModalOpened, setAuthModalOpened } = inject('isAuthModalOpened');

function handleAddToCartButtonClick(book) {
  if (userStore.currentUser) {
    cartStore.addToCart(book, 1);
    router.push('/cart');
  } else {
    setAuthModalOpened(true);
  }
}

const carousel = ref(null);

const breakpoints = {
  320: {
    itemsToShow: 1
  },
  767: {
    itemsToShow: 2
  },
  1024: {
    itemsToShow: 3
  },
  1440: {
    itemsToShow: 4
  }
};

function isBookAddedToCart(id) {
  if (userStore.currentUser && userStore.currentUser.cart) {
    return userStore.currentUser.cart.find((cartItem) => cartItem.book.id === id) ? true : false;
  }
  return false;
}
</script>

<template>
  <section class="products" id="products">
    <div class="products__container">
      <div class="products__top-panel">
        <h2 class="products__heading">Buy product</h2>
        <div class="products__arrows">
          <button class="products__arrow" @click="carousel.prev">
            <img src="../assets/icons/arrow-left.svg" alt="Arrow left" />
          </button>
          <button class="products__arrow" @click="carousel.next">
            <img src="../assets/icons/arrow-right.svg" alt="Arrow right" />
          </button>
        </div>
      </div>
      <div class="products__carousel-wrapper">
        <Carousel
          ref="carousel"
          snapAlign="start"
          :breakpoints="breakpoints"
          :wrapAround="true"
          class="products__carousel"
        >
          <Slide v-for="book in books" :key="book.id" class="product">
            <div class="product__image-wrapper">
              <img :src="book.image" alt="Product image" class="product__image" />
            </div>
            <h3 class="product__title">{{ book.title }}</h3>
            <p class="product__details">{{ book.details }}</p>
            <p class="product__price">${{ book.price }}</p>
            <button
              type="button"
              class="product__add-to-cart-button"
              @click="handleAddToCartButtonClick(book)"
              :disabled="isBookAddedToCart(book.id)"
              :class="{
                disabled: isBookAddedToCart(book.id)
              }"
            >
              {{ isBookAddedToCart(book.id) ? 'Added to cart' : 'Add to cart' }}
            </button>
          </Slide>
        </Carousel>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.products__container {
  padding: $padding-x-desktop;
  padding-top: 60px;
  padding-bottom: 100px;
  @include flex(column, center, stretch);
  gap: 40px;
}

.products__top-panel {
  @include flex(row, space-between, center);
  gap: 20px;
}

.products__heading {
  @include font(40px, 600, 48px);
  text-transform: uppercase;
}

.products__arrows {
  @include flex(row, center, center);
  gap: 40px;
}

.products__arrow {
  cursor: pointer;
  width: 56px;
  height: 56px;

  &:hover {
    filter: brightness(0) saturate(100%) invert(49%) sepia(0%) saturate(0%) hue-rotate(227deg)
      brightness(83%) contrast(75%);
  }
}

.products__carousel-wrapper {
  overflow: hidden;
}

.products__carousel {
  @include flex(row, flex-start, stretch);
  flex-wrap: nowrap;
  position: relative;
  margin: 0 -10px;
  text-align: left;
}

.product {
  @include flex(column, flex-start, stretch);
  gap: 16px;
  padding: 10px;
}

.product__image-wrapper {
  width: 100%;
  height: 380px;
  overflow: hidden;
}

.product__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product__title {
  text-transform: uppercase;
  @include font(24px, 500, 30px);
}

.product__details {
  @include font(16px, 400, 25px);
  color: $text-pale-dark;
}

.product__price {
  @include font(24px, 600, 30px);
}

.product__add-to-cart-button {
  width: 134px;
  height: 48px;
  border: 1px solid $border-dark;
  @include font(16px, 400, 20px);
  cursor: pointer;

  &.disabled {
    cursor: auto;
  }
}

@media (max-width: 767px) {
  .products__container {
    padding: $padding-x-mobile;
  }

  .products__arrows {
    gap: 10px;
  }

  .products__arrow {
    width: 40px;
    height: 40px;
  }

  .products__heading {
    @include font(30px, 600, 40px);
  }
}
</style>
