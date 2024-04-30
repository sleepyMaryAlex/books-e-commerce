<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { ref, onMounted, watch, computed } from 'vue';
import { useTransactionStore } from '@/stores/transaction';
import { format } from "date-fns";

const router = useRouter();
const userStore = useUserStore();
const transactionStore = useTransactionStore();

const phoneNumber = ref('');
const cardNumber = ref('');
const phoneNumberFeedbackMessage = ref('');
const cardNumberFeedbackMessage = ref('');
const isPaymentSuccessful = ref(false);

watch(phoneNumber, () => {
  if (phoneNumber.value === '') {
    phoneNumberFeedbackMessage.value = 'Please fill out this field';
  } else if (phoneNumber.value.length >= 7) {
    phoneNumberFeedbackMessage.value = '';
  } else {
    phoneNumberFeedbackMessage.value = 'Please enter a phone number';
  }
});

watch(cardNumber, () => {
  if (cardNumber.value === '') {
    cardNumberFeedbackMessage.value = 'Please fill out this field';
  } else if (/[0-9\s]{13,19}/.test(cardNumber.value)) {
    cardNumberFeedbackMessage.value = '';
  } else {
    cardNumberFeedbackMessage.value = 'Please enter a card number';
  }
});

const isDisabled = computed(() => {
  return !(
    phoneNumber.value &&
    cardNumber.value &&
    !phoneNumberFeedbackMessage.value &&
    !cardNumberFeedbackMessage.value
  );
});

function calculateTotalPrice() {
  return userStore.currentUser.cart
    .reduce((total, current) => total + Number(current.book.price * current.quantity), 0)
    .toFixed(2);
}

function handlePayButton() {
  const transaction = {
    phoneNumber,
    cardNumber,
    products: userStore.currentUser.cart,
    date: format(new Date(), "dd-MM-yyyy"),
    totalPrice: calculateTotalPrice()
  };
  transactionStore.addTransaction(transaction, userStore.currentUser.id);
  isPaymentSuccessful.value = true;
}
</script>

<template>
  <div class="checkout">
    <div class="checkout__container">
      <h2 class="checkout__heading">Checkout</h2>
      <table class="checkout__table table" v-if="!isPaymentSuccessful">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{ book, quantity } in userStore.currentUser.cart" :key="book.id">
            <td class="table__title">{{ book.title }}</td>
            <td>
              {{ quantity }}
            </td>
            <td>${{ book.price }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colspan="2">Total price</th>
            <td>${{ calculateTotalPrice() }}</td>
          </tr>
        </tfoot>
      </table>

      <form class="checkout__form" novalidate v-if="!isPaymentSuccessful">
        <div class="checkout__field">
          <label for="phone" class="checkout__label">Phone number</label>
          <input type="tel" id="phone" class="checkout__input" v-model="phoneNumber" />
          <div v-if="phoneNumberFeedbackMessage" class="checkout__feedback">
            {{ phoneNumberFeedbackMessage }}
          </div>
        </div>
        <div class="checkout__field">
          <label for="card" class="checkout__label">Card number</label>
          <input
            type="tel"
            inputmode="numeric"
            id="card"
            class="checkout__input"
            v-model="cardNumber"
          />
          <div v-if="cardNumberFeedbackMessage" class="checkout__feedback">
            {{ cardNumberFeedbackMessage }}
          </div>
        </div>
        <button
          type="submit"
          :class="{
            disabled: isDisabled
          }"
          :disabled="isDisabled"
          class="checkout__button checkout__button_submit"
          @click.prevent="handlePayButton"
        >
          Pay
        </button>
      </form>
      <p class="checkout__message" v-if="isPaymentSuccessful">Payment was successful</p>
      <button type="button" class="checkout__button" @click="router.push('/')">
        Back to shopping
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkout__container {
  min-height: 100vh;
  @include flex(column, center, center);
  gap: 40px;
  padding: $padding-x-desktop;
  padding-top: 40px;
  padding-bottom: 40px;
}

.checkout__heading {
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

.checkout__button {
  padding: 20px 32px;
  color: $bg-light;
  background-color: $bg-dark;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;
}

.checkout__button_submit {
  &.disabled {
    background-color: lighten($color: $bg-dark, $amount: 20);
    cursor: auto;
  }
}

.checkout__form {
  @include flex(column, center, stretch);
  gap: 24px;
}

.checkout__field {
  @include flex(column, flex-start, stretch);
  gap: 8px;
  position: relative;
}

.checkout__feedback {
  position: absolute;
  right: 0;
  padding: 4px;
  background-color: $error-color;
  font-size: 14px;
}

.checkout__input {
  width: 280px;
  height: 48px;
  border: 1px solid $border-pale;
  padding: 0 10px;
  font-family: inherit;
  transition: all 0.3s;

  &:focus {
    outline: none !important;
    border: 1px solid $border-dark;
    border-radius: none;
  }
}

@media (max-width: 767px) {
  .checkout__container {
    padding: $padding-x-mobile;
    padding-top: 40px;
    padding-bottom: 40px;
  }
}

@media (max-width: 478px) {
  .table {
    border-spacing: 15px;

    & .table__title {
      font-size: 14px;
    }
  }
}
</style>
