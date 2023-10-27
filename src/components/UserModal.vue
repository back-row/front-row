<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { onClickOutside } from '@vueuse/core';

const userStore = useUserStore();

const editNameVisible = ref(false);
const editEmailVisible = ref(false);
type avatar = { name: string; src: string };

const emit = defineEmits(['close', 'closeOutside']);

const closingTarget = ref(null);

const avatars: Ref<avatar[]> = ref([
  { name: 'Boy1', src: 'boy1' },
  { name: 'Ghoul', src: 'ghoul' },
  { name: 'Girl1', src: 'girl1' },
  { name: 'Girl2', src: 'girl2' },
  { name: 'Masked', src: 'maskedr' }
]);

const toggleEditName = () => {
  editNameVisible.value = !editNameVisible.value;
  saveUser();
};

const toggleEditEmail = () => {
  editEmailVisible.value = !editEmailVisible.value;
  saveUser();
};

onClickOutside(closingTarget, (event: MouseEvent) => {
  emit('closeOutside');
});

async function saveUser() {
  userStore.updateUser();
}

function logout() {
  userStore.logout();
  emit('close');
}

async function saveName() {
  saveUser();
  editNameVisible.value = false;
}

async function saveEmail() {
  saveUser();
  editEmailVisible.value = false;
}
</script>

<template>
  <div
    ref="closingTarget"
    class="absolute right-0 dark:opacity-90 top-9 ease-in-out duration-200 transition-all rounded-md flex justify-start items-center gap-4 flex-col dark:bg-blackBackRow dark:text-greenBackRow w-96 pt-4 shadow-lg shadow-gray-700 bg-whiteBackRow"
  >
    <div class="flex">
      <div class="flex flex-col items-center justify-center mx-4">
        <div class="flex">
          <h2 v-show="!editNameVisible" class="dark:text-whiteBackRow text-2xl mt-4">
            {{ userStore.user.name }}
          </h2>
          <input
            v-show="editNameVisible"
            class="w-40 h-6 mt-4 rounded-sm shadow-md"
            v-model="userStore.user.name"
            type="text"
            placeholder="New username"
            @keydown.enter="saveName"
            required
          />
          <img
            class="w-6 h-6 my-4 ml-2 cursor-pointer"
            :src="'src/assets/pen.png'"
            @click="toggleEditName"
          />
        </div>
        <div class="flex">
          <h4 v-show="!editEmailVisible" class="dark:text-whiteBackRow text-lg">
            {{ userStore.user.email }}
          </h4>
          <input
            v-show="editEmailVisible"
            class="w-40 h-5 rounded-sm shadow-md"
            v-model="userStore.user.email"
            type="text"
            placeholder="New username"
            @keydown.enter="saveEmail"
            required
          />
          <img
            class="w-6 h-6 ml-2 cursor-pointer"
            :src="'src/assets/pen.png'"
            @click="toggleEditEmail"
          />
        </div>
        <h2 class="dark:text-whiteBackRow text-xl mt-8">Level</h2>
        <p class="dark:text-whiteBackRow text-2xl">{{ userStore.user.level }}</p>
        <h2 class="dark:text-whiteBackRow text-xl">Points</h2>
        <p class="dark:text-whiteBackRow text-2xl">{{ userStore.user.score }}</p>
      </div>
      <div class="flex flex-col">
        <img
          class="w-20 h-20 m-6"
          :src="'src/assets/avatars/' + userStore.user.avatar + '.png'"
          alt="User avatar"
        />
        <div class="flex flex-col ml-2 w-28">
          <div v-for="avatar in avatars" :key="avatar.src">
            <input
              type="radio"
              class="accent-greenBackRow"
              :value="avatar.src"
              v-model="userStore.user.avatar"
              @change="saveUser"
            />
            <label class="dark:text-whiteBackRow">{{ avatar.name }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <button
        @click="logout"
        class="bg-greenBackRow shadow-black shadow-lg text-whiteBackRow rounded-md p-2 mb-4"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<style scoped></style>
