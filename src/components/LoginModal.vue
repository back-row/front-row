<script setup lang="ts">
import { reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';
const userStore = useUserStore();

const props = defineProps({ visible: { type: Boolean, required: true } });
const emit = defineEmits(['close']);

const data = reactive({
  username: '',
  password: ''
});

async function login() {
  try {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    });
    const token = response.headers.get('Authorization');

    if (token) {
      localStorage.setItem('Authorization', token);

      console.log('Login successful');
      const response = await fetch('http://localhost:8000/users/', {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('Authorization')!
        }
      });
      const data = await response.json();
      userStore.setUser(data);
      emit('close');
      router.push({ name: 'home' });
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
</script>

<template>
  <div
    class="absolute right-0 top-9 ease-in-out duration-200 rounded-md flex items-center gap-4 flex-col bg-blackBackrow text-greenBackrow h-48 w-96"
    :class="{ 'opacity-0': !props.visible }"
  >
    <form @submit.prevent="login">
      <div class="flex flex-col">
        <label class="text-whiteBackRow" for="username"><b>Username</b></label>
        <input
          class=""
          v-model="data.username"
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />
      </div>
      <div class="flex flex-col">
        <label class="text-whiteBackRow" for="password"><b>Password</b></label>
        <input
          type="password"
          v-model="data.password"
          placeholder="Enter Password"
          name="password"
          required
        />
      </div>
      <button
        type="submit"
        class="hover:animate-pulse bg-[#408080] h-8 w-20 m-4 rounded-md flex items-center justify-center absolute bottom-0 text-whiteBackRow"
      >
        Login
      </button>
    </form>
  </div>
</template>

<style scoped></style>
