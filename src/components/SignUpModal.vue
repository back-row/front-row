<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { login } from '@/stores/auth';


type avatar = { name: string; src: string };

const emit = defineEmits(['close','closeOutside']);
const closingTarget = ref(null)
const userStore = useUserStore();


onClickOutside(closingTarget, (event: MouseEvent) => {
  emit('closeOutside');
});

const data = reactive({
  username: '',
  email: '',
  password: '',
  avatar: 'boy1'
});

const avatars: Ref<avatar[]> = ref([
  { name: 'Boy1', src: 'boy1' },
  { name: 'Ghoul', src: 'ghoul' },
  { name: 'Girl1', src: 'girl1' },
  { name: 'Girl2', src: 'girl2' },
  { name: 'Masked', src: 'maskedr' }
]);

async function signUp() {
  try {
    const response = await fetch('http://localhost:8000/users', {
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
    if (!response.ok) {
      alert('Sign up failed! Please try again.');
      throw new Error('Sign up failed!');
    }
    alert('Sign up successful!');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
  node.props.type = node.props.type === 'password' ? 'text' : 'password';
};

async function handleLogin() {
  const userData = await login(data.username, data.password);

  if (userData) {
    userStore.setUser(userData);
    emit('close');
    router.push({ name: 'home' });
  }
}

</script>

<template>
  <div
    ref="closingTarget"
    class="opacity-90 absolute right-0 top-9 ease-in-out duration-200 rounded-md flex justify-center bg-blackBackrow text-greenBackrow p-6"
  >
    <form @submit.prevent="signUp">
      <div class="flex">
        <div class="flex flex-col w-1/2">
          <FormKit
            label="Username"
            type="text"
            validation="required|alpha|length:1"
            placeholder="Enter Username"
            v-model="data.username"
          />
          <FormKit
            label="Email"
            type="text"
            validation="required|email"
            placeholder="Enter Email"
            v-model="data.email"
          />
          <FormKit
            id="password"
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
        <div class="flex items-center">
          <div class="flex flex-col w-20 ml-2 mt-4">
            <div v-for="avatar in avatars" :key="avatar.src">
              <input type="radio" class='accent-greenBackrow' :value="avatar.src" v-model="data.avatar" />
              <label class="text-whiteBackRow">{{ avatar.name }}</label>
            </div>
          </div>
          <img
            class="w-20 h-20 m-2 mt-6"
            :src="'src/assets/avatars/' + data.avatar + '.png'"
            alt="Picked avatar"
          />
        </div>
      </div>
      <div class="flex justify-center">  
        <button 
          @click="handleLogin"
          type='submit'
          class='hover:animate-pulse bg-greenBackrow h-8 w-20 m-4 rounded-md text-whiteBackRow'
          >Sign up</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
