<script setup>
import '../assets/scss/components/app-products.scss';
import books from '../app/books';
import { ref, inject } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { useUserStore } from '@/stores/user';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();
const cartStore = useCartStore();

const { setAuthModalOpened } = inject('isAuthModalOpened');

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
            <img src="../assets/images/icons/arrow-left.svg" alt="Arrow left" />
          </button>
          <button class="products__arrow" @click="carousel.next">
            <img src="../assets/images/icons/arrow-right.svg" alt="Arrow right" />
          </button>
        </div>
      </div>
      <div class="products__carousel-wrapper">
        <Carousel
          ref="carousel"
          snapAlign="start"
          :breakpoints="breakpoints"
          :wrapAround="true"
          class="carousel"
        >
          <Slide v-for="book in books" :key="book.id" class="carousel__slide product">
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
