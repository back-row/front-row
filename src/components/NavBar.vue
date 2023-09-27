<script setup lang='ts'>

import { RouterLink } from 'vue-router';
import IconHamburger from '@/components/icons/IconHamburger.vue';
</script>

<template>
  <header class='header'>

    <IconHamburger>

    </IconHamburger>
    <h2>Back Row</h2>

    <nav>
      <RouterLink to='/'>Home</RouterLink>
      <RouterLink to='/game'>Game</RouterLink>
      <RouterLink to='/about'>About</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
}
</style>