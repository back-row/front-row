<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import FootBar from './components/FootBar.vue';
import UserModal from './components/UserModal.vue';
import LoginModal from '@/components/LoginModal.vue';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const loginVisible = ref(false);
const userModalVisible = ref(false);

const toggleLogin = () => {
  loginVisible.value = !loginVisible.value;
};
const toggleUser = () => {
  userModalVisible.value = !userModalVisible.value;
};

onMounted(async () => {
  if (localStorage.getItem('Authorization')) {
    const response = await fetch('http://localhost:8000/users/', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('Authorization')!
      }
    });
    const data = await response.json();
    userStore.setUser(data);
  }
});
</script>

<template>
  <NavBar @toggleLogin="toggleLogin" @toggleUserModal="toggleUser" />
  <RouterView />
  <FootBar />
  <LoginModal :visible="loginVisible" @close="toggleLogin" />
  <UserModal :visible="userModalVisible" />
</template>

<style scoped></style>
