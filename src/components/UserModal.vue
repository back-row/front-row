<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import EditUserForm from './EditUserForm.vue';

const props = defineProps({ visible: { type: Boolean, required: true } });
const userStore = useUserStore();

const showEditForm = ref(false)
const score = ref(0);
const avatar = ref('');
const username = ref('');

onMounted( () => {
      score.value = userStore.user.score
      username.value = userStore.user.name
      avatar.value = 'src/assets/avatars/' + userStore.user.avatar + '.png'
    })

</script>

<template>
  <div
    class="absolute right-0 top-9 ease-in-out duration-200 transition-all rounded-md flex justify-start items-center gap-4 flex-col bg-blackBackrow text-greenBackrow w-96"
    :class="{ 'opacity-0': !props.visible, 'h-2/3': showEditForm, 'h-2/5': !showEditForm }"
  >
    <div class="flex">
      <div class="flex flex-col items-center justify-center mx-6">
        <h2 class="text-white text-2xl my-4">{{ username }}</h2>
        <h2 class="text-white text-xl">Points</h2>
        <p class="text-white text-2xl">{{ score }}</p>
      </div>
      <img class="w-20 h-20 m-6" :src="avatar" alt="User avatar" />
    </div>
    <div class="flex">
      <button @click.prevent="showEditForm = !showEditForm" class="bg-greenBackrow text-blackBackrow rounded-md p-2 mx-10">Edit user</button>
      <button class="bg-greenBackrow text-blackBackrow rounded-md p-2 mx-10">Logout</button>
    </div>
    <EditUserForm v-if="showEditForm"/>
  </div>
</template>

<style scoped></style>
