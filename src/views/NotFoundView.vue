<script setup>
const classNames = ['last', 'second', 'first', 'basic', 'first', 'second', 'last'];
const error = 401;
</script>

<template>
  <div className="not-found">
    <div class="not-found__container">
      <div className="not-found__errors">
        <p
          v-for="(className, index) in classNames"
          :class="'not-found__' + className"
          class="not-found__error"
          :key="error + index"
        >
          {{ error + index }}
        </p>
      </div>
      <p class="not-found__title">The page you were looking for could not be found</p>
      <div class="not-found__return-button">
        <p>Return to main page</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found__container {
  @include flex(column, center, center);
  gap: 60px;
  height: 100vh;
}

.not-found__return-button {
  color: $text-light;
  background-color: $bg-dark;
  padding: 20px;
}

.not-found__title {
  font-size: 20px;
  text-transform: uppercase;
}

.not-found__errors {
  overflow: hidden;
  @include flex(row, space-around, stretch);
  width: 100%;
  font-size: 85px;
}

.not-found__error {
  margin: 15px 25px;
  @include flex(row, flex-start, center);
}

.not-found__first {
  filter: blur(1.5px);
  font-size: 60px;
}

.not-found__second {
  filter: blur(3px);
  font-size: 50px;
}

.not-found__last {
  filter: blur(4.5px);
  font-size: 42px;
}

.not-found__basic {
  text-shadow: 3px 2px 2px $border-dark;
}

@media (max-width: 1280px) {
  .not-found__last {
    display: none;
  }
}

@media (max-width: 992px) {
  .not-found__second {
    display: none;
  }
}

@media (max-width: 767px) {
  .not-found__title {
    max-width: 280px;
    text-align: center;
  }

  .not-found__first {
    display: none;
  }
}
</style>
