<script setup lang='ts'>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import FootBar from './components/FootBar.vue';
import LoginModal from '@/components/LoginModal.vue';
import { ref } from 'vue';

const loginVisible = ref(false);

const toggleLogin = () => {
  console.log('Toggling login');
  loginVisible.value = !loginVisible.value;
};

</script>

<template>
  <NavBar @toggleLogin='toggleLogin' />
  <RouterView />
  <FootBar />
  <LoginModal :visible='loginVisible' />
</template>

<style scoped>

</style>
