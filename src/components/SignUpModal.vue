<script setup lang='ts'>
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';

type avatar = { name: string; src: string};

const emit = defineEmits(['close']);

const data = reactive({
  username: '',
  email: '',
  password: '',
  avatar: 'boy1'
});

const avatars: Ref<avatar[]> = ref([
    {name: 'Boy1', src: 'boy1'},
    {name: 'Ghoul', src: 'ghoul'},
    {name: 'Girl1', src: 'girl1'},
    {name: 'Girl2', src: 'girl2'},
    {name: 'Masked', src: 'maskedr'}
    ])


async function signUp() {
  try {
    await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usersname: data.username,
        usersemail: data.email,
        userspassword: data.password,
        usersimage: data.avatar
      })
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
</script>

<template>
  <div
    class='absolute right-0 top-9 ease-in-out duration-200 rounded-md flex justify-center bg-blackBackRow text-greenBackRow h-64 w-96 p-6'
  >
    <form @submit.prevent='signUp'>
      <div class="flex">
        <div class='flex flex-col w-1/2'>
          <label class='text-whiteBackRow' for='username'><b>Username</b></label>
          <input
            class='w-36'
            v-model='data.username'
            type='text'
            placeholder='Enter Username'
            name='username'
            required
          />
          <label class='text-whiteBackRow pt-2' for='email'><b>Email</b></label>
          <input
            class='w-36'
            v-model='data.email'
            type='text'
            placeholder='Enter Email'
            name='email'
            required
          />
          <label class='text-whiteBackRow pt-2' for='password'><b>Password</b></label>
          <input
            class='w-36'
            type='password'
            v-model='data.password'
            placeholder='Enter Password'
            name='password'
            required
          />
        </div>
        <div class="flex">
          <div class="flex flex-col w-20 ml-2 mt-4">
            <div v-for="avatar in avatars" :key="avatar.src">
              <input type="radio" :value="avatar.src" v-model="data.avatar" />
              <label class="text-whiteBackRow">{{ avatar.name }}</label>
            </div>
          </div>
          <img class="w-20 h-20 m-2 mt-6" :src="'src/assets/avatars/' + data.avatar + '.png'" alt="Picked avatar" />
        </div>
      </div>
      <div class="flex justify-center">  
        <button
          type='submit'
          class='hover:animate-pulse bg-greenBackRow h-8 w-20 m-4 rounded-md text-whiteBackRow'
          >Sign up</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
