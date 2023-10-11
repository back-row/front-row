<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import FootBar from './components/FootBar.vue';
import UserModal from './components/UserModal.vue';
import LoginModal from '@/components/LoginModal.vue';
import { ref } from 'vue';

const loginVisible = ref(false);
const userModalVisible = ref(false);

const toggleLogin = () => {
  console.log('Toggling login');
  loginVisible.value = !loginVisible.value;
};
const toggleUser = () => {
  userModalVisible.value = !userModalVisible.value;
};
</script>

<template>
  <NavBar @toggleLogin="toggleLogin" @toggleUserModal="toggleUser" />
  <RouterView />
  <FootBar />
  <LoginModal :visible="loginVisible" />
  <UserModal :visible="userModalVisible" />
</template>

<style scoped></style>
