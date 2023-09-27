<script setup lang='ts'>

import { RouterLink } from 'vue-router';
</script>

<template>
  <header>
    <div>
      <h2>Back Row</h2>

      <nav>
        <RouterLink to='/'>Home</RouterLink>
        <RouterLink to='/game'>Game</RouterLink>
        <RouterLink to='/about'>About</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>

</style>