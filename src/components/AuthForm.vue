<script setup>
import { defineProps, defineEmits, ref, watch, inject, computed } from 'vue';
import googleIcon from '../assets/images/icons/google.svg';
import { useUserStore } from '@/stores/user';

const submitErrorMessage = ref('');
const emailFeedbackMessage = ref('');
const passwordFeedbackMessage = ref('');

const store = useUserStore();

const { isAuthModalOpened, setAuthModalOpened } = inject('isAuthModalOpened');
const props = defineProps(['access']);
const emit = defineEmits(['setAccess']);

const email = ref(store.usersData.findLast((user) => user.isRemember === true)?.email || '');
const password = ref(store.usersData.findLast((user) => user.isRemember === true)?.password || '');
const isRemember = ref(
  store.usersData.findLast((user) => user.isRemember === true)?.isRemember || false
);

watch(
  () => store.currentUser,
  () => {
    setAuthModalOpened(false);
    emit('setAccess', 'log-in');
  }
);

watch([email, password, () => props.access], () => {
  submitErrorMessage.value = '';
});

watch(email, () => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
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

function handleSubmit() {
  const user = store.findUser(email.value, password.value);
  if (props.access === 'log-in') {
    user
      ? store.login(user.id, isRemember.value)
      : (submitErrorMessage.value = 'You don’t have an account. Please sign up');
  } else if (props.access === 'sign-up') {
    user
      ? (submitErrorMessage.value = 'You already have an account. Please log in')
      : store.signup(email.value, password.value);
  }
}
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

<style lang="scss" scoped>
.form__container {
  @include flex(column, center, stretch);
  gap: 24px;
}

.form__field {
  @include flex(column, flex-start, stretch);
  gap: 8px;
  position: relative;
}

.form__feedback {
  position: absolute;
  right: 0;
  padding: 4px;
  background-color: $error-color;
  font-size: 14px;
}

.form__input {
  width: 508px;
  height: 48px;
  border: 1px solid $border-pale;
  padding: 0 10px;
  font-family: inherit;
  transition: border 0.3s;

  &:focus {
    outline: none !important;
    border: 1px solid $border-dark;
    border-radius: none;
  }
}

.form__label,
.form__checkbox-label,
.form__prompt {
  @include font(14px, 500, 17px);
}

.form__checkbox-field {
  @include flex(row, flex-start, center);
}

.form__checkbox-label {
  @include flex(row, flex-start, center);
  gap: 12px;
  position: relative;
  cursor: pointer;
}

.form__checkbox {
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;
}

.form__checkmark {
  height: 24px;
  width: 24px;
  border-radius: 4px;
  border: 1px solid $border-pale;
}

.form__checkbox:checked ~ .form__checkmark {
  background-color: $bg-dark;
}

.form__checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

.form__checkbox:checked ~ .form__checkmark:after {
  display: block;
}

.form__checkmark:after {
  left: 8px;
  top: 4px;
  width: 5px;
  height: 10px;
  border: solid $bg-light;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.form__prompt {
  border-bottom: 1px solid $text-dark;
  align-self: flex-end;
  cursor: pointer;
}

.form__auth-button {
  width: 100%;
  height: 48px;
  color: $text-light;
  @include font(16px, 500, 20px);
  background-color: $bg-dark;
  cursor: pointer;

  &.disabled {
    background-color: lighten($color: $bg-dark, $amount: 20);
    cursor: auto;
  }
}

.form__separator {
  @include flex(row, space-between, center);
  gap: 20px;
}

.form__line {
  width: 100%;
  height: 1px;
  background-color: $border-pale;
}

.form__google-button {
  width: 100%;
  height: 48px;
  @include flex(row, center, center);
  gap: 12px;
  background-color: $bg-pale;
  font-size: 16px;
  cursor: pointer;

  & span {
    @include font(16px, 500, 20px);
  }
}

.form__submit-error-message {
  width: 100%;
  height: 48px;
  @include flex(row, center, center);
  background-color: $error-color;
  font-size: 16px;
  color: $text-light;
  text-align: center;
  padding: 10px;
}

@media (max-width: 767px) {
  .form__input {
    width: 100%;
  }
}
</style>
