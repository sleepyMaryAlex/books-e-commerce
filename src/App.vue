<template>
  <div class="wrapper">
    <router-view v-slot="{ Component }">
      <Transition>
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
  position: relative;
}
</style>
