<script setup lang="ts">
import { ref } from 'vue';
import { reactive } from 'vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { onClickOutside } from '@vueuse/core'
import { login } from '@/stores/auth';

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

async function handleLogin() {
  const userData = await login(data.username, data.password);

const handleIconClick = (node, e) => {
  node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye';
  node.props.type = node.props.type === 'password' ? 'text' : 'password';
};

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
    class="opacity-90 absolute right-0 top-9 ease-in-out duration-200 rounded-md flex justify-center bg-blackBackrow text-greenBackrow w-96 p-6"
  >
    <form class="flex flex-col items-center justify-center" @submit.prevent="handleLogin">
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
