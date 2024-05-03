<script setup>
import '../assets/scss/pages/checkout-view.scss';
import { useRouter } from 'vue-router';
import { ref, watch, computed } from 'vue';
import { useUserStore } from '@/store/user';
import { useUsersStore } from '@/store/users';
import { format } from 'date-fns';

const router = useRouter();
const userStore = useUserStore();
const usersStore = useUsersStore();

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

const calculateTotalPrice = () => {
  return userStore.currentUser.cart
    .reduce((total, current) => total + Number(current.book.price * current.quantity), 0)
    .toFixed(2);
};

const handlePayButton = () => {
  const transaction = {
    phoneNumber,
    cardNumber,
    products: userStore.currentUser.cart,
    date: format(new Date(), 'dd-MM-yyyy'),
    totalPrice: calculateTotalPrice()
  };

  userStore.addTransaction(transaction);
  usersStore.addTransaction(transaction, userStore.currentUser.id);
  isPaymentSuccessful.value = true;
};
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
