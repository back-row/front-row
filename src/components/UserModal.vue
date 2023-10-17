<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import EditUserForm from './EditUserForm.vue';
import { onClickOutside } from '@vueuse/core'

const userStore = useUserStore();

const showEditForm = ref(false)
const emit = defineEmits(['close','closeOutside']);


const target = ref(null)

onClickOutside(target, (event: MouseEvent) => {
 emit('closeOutside')
})


function logout() {
  userStore.logout();
  emit('close');
}
</script>

<template>
  <div
    ref="target"
    class="absolute right-0 top-9 ease-in-out duration-200 transition-all rounded-md flex justify-start items-center gap-4 flex-col bg-blackBackRow text-greenBackRow w-96 pt-4"
    :class="{'h-3/5': showEditForm, 'h-2/5': !showEditForm }"
    >
    <div class="flex">
      <div class="flex flex-col items-center justify-center mx-6">
        <h2 class="text-whiteBackRow text-2xl my-4">{{ userStore.user.name }}</h2>
        <h2 class="text-whiteBackRow text-xl">Points</h2>
        <p class="text-whiteBackRow text-2xl">{{ userStore.user.score }}</p>
      </div>
      <img class="w-20 h-20 m-6" :src="'src/assets/avatars/' + userStore.user.avatar + '.png'" alt="User avatar" />
    </div>
    <div class="flex">
      <button @click.prevent="showEditForm = !showEditForm" class="bg-greenBackRow text-whiteBackRow rounded-md p-2 mx-10">Edit user</button>
      <button @click="logout" class="bg-greenBackRow text-whiteBackRow rounded-md p-2 mx-10">
        Logout
      </button>
    </div>
    <EditUserForm v-if="showEditForm"/>
  </div>
</template>

<style scoped></style>
