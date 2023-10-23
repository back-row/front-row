<script setup lang="ts">
import { ref } from 'vue';
import { reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { onClickOutside } from '@vueuse/core';

const userStore = useUserStore();
const emit = defineEmits(['close', 'closeOutside']);

const data = reactive({
  username: '',
  password: ''
});
const closingTarget = ref(null);

onClickOutside(closingTarget, (event: MouseEvent) => {
  emit('closeOutside');
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
      alert('Login failed, please try again');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
  node.props.type = node.props.type === 'password' ? 'text' : 'password';
};
</script>

<template>
  <div
    ref="closingTarget"
    class="opacity-90 absolute right-0 top-9 ease-in-out duration-200 rounded-md flex justify-center bg-blackBackrow text-greenBackrow w-96 p-6"
  >
    <form class="flex flex-col items-center justify-center" @submit.prevent="login">
      <div class="flex flex-col w-full">
        <FormKit
          v-model="data.username"
          label="Username"
          type="text"
          placeholder="Enter Username"
          validation="required|alpha|length:1"
        />
      </div>
      <div class="flex flex-col">
        <FormKit
          label="Password"
          type="password"
          validation="required|length:6|matches:/[^a-zA-Z]/"
          :validation-messages="{
            matches: 'Please include at least one symbol'
          }"
          placeholder="Enter Password"
          v-model="data.password"
          suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick"
        />
      </div>
      <button
        type="submit"
        class="hover:animate-pulse bg-greenBackrow h-8 w-20 m-4 rounded-md text-whiteBackRow"
      >
        Login
      </button>
    </form>
  </div>
</template>

<style scoped></style>
