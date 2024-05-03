<script setup>
import '../assets/scss/components/auth-form.scss';
import { defineProps, defineEmits, ref, watch, inject, computed } from 'vue';
import googleIcon from '../assets/images/icons/google.svg';
import { useUserStore } from '@/store/user';
import { useUsersStore } from '@/store/users';
import { v4 as uuidv4 } from 'uuid';

const submitErrorMessage = ref('');
const emailFeedbackMessage = ref('');
const passwordFeedbackMessage = ref('');

const userStore = useUserStore();
const usersStore = useUsersStore();

const { setModalOpened } = inject('isModalOpened');
const props = defineProps(['access']);
const emit = defineEmits(['setAccess']);

const email = ref(usersStore.users.findLast((user) => user.isRemember === true)?.email || '');
const password = ref(usersStore.users.findLast((user) => user.isRemember === true)?.password || '');
const isRemember = ref(
  usersStore.users.findLast((user) => user.isRemember === true)?.isRemember || false
);

watch(
  () => userStore.currentUser,
  () => {
    setModalOpened(false);
    emit('setAccess', 'log-in');
  },
  { flush: 'sync' }
);

watch([email, password, () => props.access], () => {
  submitErrorMessage.value = '';
});

watch(email, () => {
  if (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    emailFeedbackMessage.value = '';
  } else if (email.value === '') {
    emailFeedbackMessage.value = 'Please fill out this field';
  } else {
    emailFeedbackMessage.value = 'This needs to be an email';
  }
});

watch(password, () => {
  if (password.value === '') {
    passwordFeedbackMessage.value = 'Please fill out this field';
  } else if (password.value.length < 5) {
    passwordFeedbackMessage.value = 'Please lenthen this text';
  } else {
    passwordFeedbackMessage.value = '';
  }
});

const isDisabled = computed(() => {
  return !(
    email.value &&
    password.value &&
    !emailFeedbackMessage.value &&
    !passwordFeedbackMessage.value
  );
});

const signup = (email, password) => {
  const newUser = {
    id: uuidv4(),
    email: email,
    password: password,
    isRemember: false,
    cart: [],
    transactions: []
  };
  userStore.addCurrentUser(newUser);
  usersStore.addToUsers(JSON.parse(JSON.stringify(newUser)));
};

const login = (user, isRemember) => {
  userStore.addCurrentUser({ ...JSON.parse(JSON.stringify(user)), isRemember });
  usersStore.updateUser(user, { isRemember });
};

const handleSubmit = () => {
  const user = usersStore.findUser(email.value, password.value);
  if (props.access === 'log-in') {
    user
      ? login(user, isRemember.value)
      : (submitErrorMessage.value = 'You don’t have an account. Please sign up');
  } else if (props.access === 'sign-up') {
    user
      ? (submitErrorMessage.value = 'You already have an account. Please log in')
      : signup(email.value, password.value);
  }
};
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit" novalidate>
    <div class="form__container">
      <div class="form__field">
        <label for="email" class="form__label">Email</label>
        <input type="email" id="email" class="form__input" v-model="email" />
        <div v-if="emailFeedbackMessage" class="form__feedback">{{ emailFeedbackMessage }}</div>
      </div>
      <div class="form__field">
        <label for="password" class="form__label">Password</label>
        <input type="password" id="password" class="form__input" v-model="password" />
        <div v-if="passwordFeedbackMessage" class="form__feedback">
          {{ passwordFeedbackMessage }}
        </div>
      </div>
      <div class="form__checkbox-field" v-if="access === 'log-in'">
        <label for="checkbox" class="form__checkbox-label">
          <input type="checkbox" id="checkbox" class="form__checkbox" v-model="isRemember" />
          <span class="form__checkmark"></span>
          <span>Remember password</span>
        </label>
      </div>
      <div class="form__prompt" v-if="access === 'log-in'">Forgot Password?</div>
      <button
        type="submit"
        class="form__auth-button"
        :class="{
          disabled: isDisabled
        }"
        :disabled="isDisabled"
      >
        {{ access === 'log-in' ? 'Log In' : 'Sign Up' }}
      </button>
      <div class="form__separator">
        <div class="form__line"></div>
        <div>or</div>
        <div class="form__line"></div>
      </div>
      <button type="button" class="form__google-button">
        <span>Continue with Google</span>
        <img :src="googleIcon" alt="Google" />
      </button>
      <div v-if="submitErrorMessage" class="form__submit-error-message">
        <p>{{ submitErrorMessage }}</p>
      </div>
    </div>
  </form>
</template>
