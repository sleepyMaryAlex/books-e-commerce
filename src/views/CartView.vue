<script setup>
import { useUserStore } from '@/stores/user';
import { updateCart, emptyCart, deleteFromCart } from '../services/cartService';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();

function handleQuantityChange(bookId, value) {
  updateCart(bookId, value, userStore.updateCart);
}

function handleEmptyCartButtonClick() {
  emptyCart(userStore.currentUser.id, userStore.emptyCart);
}

function handleRemoveButtonClick(bookId) {
  deleteFromCart(bookId, userStore.deleteFromCart);
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
            <td>
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

<style lang="scss" scoped>
.cart__container {
  min-height: 100vh;
  @include flex(column, center, center);
  gap: 40px;
  padding: $padding-x-desktop;
}

.cart__heading {
  font-size: 40px;
  font-weight: 600;
  line-height: 48px;
  text-transform: uppercase;
}

.table {
  max-width: 1000px;
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
}

.table__remove-button {
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  font-style: italic;
  text-decoration: underline;
  cursor: pointer;
}

.table__input {
  background-color: rgba(17, 17, 17, 0.1);
  border: 1px solid rgba(0, 0, 0, 0);
  width: 100px;
  min-height: 40px;
  margin-bottom: 0;
  padding: 16px;
  font-size: 14px;
  line-height: 20px;
  transition:
    background-color 0.2s,
    border-color 0.2s;
}

.cart__buttons {
  @include flex(row, center, center);
  gap: 20px;
}

.cart__button {
  padding: 20px 32px;
  color: $bg-light;
  background-color: $bg-dark;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
}

.cart__message {
  font-size: 20px;
  line-height: 22px;
}

@media (max-width: 767px) {
  .cart__container {
    padding: $padding-x-mobile;
  }
}
</style>
