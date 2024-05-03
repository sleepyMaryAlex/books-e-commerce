<template>
  <div class="wrapper">
    <router-view v-slot="{ Component }">
      <Transition mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>
