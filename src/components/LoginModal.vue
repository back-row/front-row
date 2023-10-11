<script setup lang='ts'>
import { reactive } from 'vue';

const props = defineProps({ visible: { type: Boolean, required: true } });

const data = reactive({
  username: '',
  password: ''
});

async function login() {
  try {
    const response = await fetch('/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });

    if (response.ok) {
      console.log('Login successful');
      localStorage.setItem('username', data.username);
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
    class='absolute right-0 top-9 ease-in-out duration-200 rounded-md flex items-center gap-4 flex-col bg-blackBackrow text-greenBackrow h-48 w-96'
    :class='{"opacity-0":!props.visible}'>
    <form @submit.prevent='login'>
      <div class='flex flex-col'>
        <label class='text-whiteBackRow' for='username'><b>Username</b></label>
        <input class='' v-model='data.username' type='text' placeholder='Enter Username' name='username' required>
      </div>
      <div class='flex flex-col'>
        <label class='text-whiteBackRow' for='password'><b>Password</b></label>
        <input type='password' v-model='data.password' placeholder='Enter Password' name='password' required>
      </div>
      <button
        type='submit'
        class='hover:animate-pulse bg-[#408080] h-8 w-20 m-4 rounded-md flex items-center justify-center absolute bottom-0 text-whiteBackRow'
      >
        Login
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>
