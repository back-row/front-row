<script setup lang='ts'>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import FootBar from './components/FootBar.vue';

import LoginModal from '@/components/LoginModal.vue';
import SignUpModal from '@/components/SignUpModal.vue';
import { ref } from 'vue';

const loginVisible = ref(false);
const signUpVisible = ref(false);

const toggleLogin = () => {
  console.log('Toggling login');
  loginVisible.value = !loginVisible.value;
};

const toggleSignUp = () => {
  console.log('Toggling Sign up');
  signUpVisible.value = !signUpVisible.value;
};
</script>

<template>
  <NavBar @toggleLogin='toggleLogin' @toggleSignUp='toggleSignUp' />
  <RouterView />
  <FootBar />
  <LoginModal :visible='loginVisible' />
  <SignUpModal :visible='signUpVisible' />
</template>

<style scoped>

</style>
