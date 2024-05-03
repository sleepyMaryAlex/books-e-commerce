<script setup>
import '../assets/scss/pages/cart-view.scss';
import { useUserStore } from '@/store/user';
import { useCartStore } from '@/store/cart';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const cartStore = useCartStore();

function handleQuantityChange(bookId, value) {
  cartStore.updateCart(bookId, value);
}

function handleEmptyCartButtonClick() {
  cartStore.emptyCart(userStore.currentUser.id);
}

function handleRemoveButtonClick(bookId) {
  cartStore.deleteFromCart(bookId);
}
</script>

<template>
  <div class="cart">
    <div class="cart__container">
      <h2 class="cart__heading">Cart</h2>
      <p v-if="userStore.currentUser.cart.length === 0" class="cart__message">
        There is nothing in the cart
      </p>
      <table v-if="userStore.currentUser.cart.length !== 0" class="cart__table table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{ book, quantity } in userStore.currentUser.cart" :key="book.id">
            <td>
              <p>{{ book.title }}</p>
              <button
                type="button"
                class="table__remove-button"
                @click="handleRemoveButtonClick(book.id)"
              >
                Remove
              </button>
            </td>
            <td class="table__quantity">
              <input
                type="number"
                class="table__input"
                min="1"
                :value="quantity"
                @change="(e) => handleQuantityChange(book.id, e.target.value)"
              />
            </td>
            <td>${{ book.price }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colspan="2">Total price</th>
            <td>
              ${{
                userStore.currentUser.cart
                  .reduce(
                    (total, current) => total + Number(current.book.price * current.quantity),
                    0
                  )
                  .toFixed(2)
              }}
            </td>
          </tr>
        </tfoot>
      </table>
      <div class="cart__buttons">
        <button
          v-if="userStore.currentUser.cart.length !== 0"
          type="button"
          class="cart__button"
          @click="handleEmptyCartButtonClick"
        >
          Empty cart
        </button>
        <button type="button" class="cart__button" @click="router.push('/')">
          Back to shopping
        </button>
        <button
          v-if="userStore.currentUser.cart.length !== 0"
          type="button"
          class="cart__button"
          @click="router.push('/checkout')"
        >
          Place order
        </button>
      </div>
    </div>
  </div>
</template>
