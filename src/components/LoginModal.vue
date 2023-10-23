<script setup lang="ts">
import { ref } from 'vue';
import { reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { onClickOutside } from '@vueuse/core'
import { login } from '@/stores/auth';

const userStore = useUserStore();
const emit = defineEmits(['close','closeOutside']);

const data = reactive({
  username: '',
  password: ''
});
const closingTarget = ref(null)

onClickOutside(closingTarget, (event: MouseEvent) => {
 emit('closeOutside')
})


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
    class="opacity-90 absolute right-0 top-9 ease-in-out duration-200 rounded-md flex items-center gap-4 flex-col bg-blackBackrow text-greenBackrow h-48 w-96"
  >
    <form @submit.prevent="handleLogin">
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
        class="hover:animate-pulse bg-greenBackrow h-8 w-20 m-4 rounded-md flex items-center justify-center absolute bottom-0 text-whiteBackRow"
      >
        Login
      </button>
    </form>
  </div>
</template>

<style scoped></style>
