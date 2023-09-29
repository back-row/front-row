<script setup lang='ts'>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import FootBar from './components/FootBar.vue';

</script>

<template>
  <div>
    <NavBar/>
    <RouterView />
    <FootBar />
  </div>
</template>

<style scoped>
</style>
