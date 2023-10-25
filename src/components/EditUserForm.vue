<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
type avatar = { name: string; src: string};
const emit = defineEmits(['save'])

const avatars: Ref<avatar[]> = ref([
    {name: 'Boy1', src: 'boy1'},
    {name: 'Ghoul', src: 'ghoul'},
    {name: 'Girl1', src: 'girl1'},
    {name: 'Girl2', src: 'girl2'},
    {name: 'Masked', src: 'maskedr'}
    ])

async function editUser() {
  userStore.updateUser();
  emit('save')
  
}

</script>

<template>
  <div class="flex justify-center bg-blackBackRow text-greenBackRow h-40 w-96 p-6">
      <form @submit.prevent="editUser">
        <div class="flex">
          <div class="flex flex-col w-2/3">
            <div class="flex flex-col">
              <label class="text-whiteBackRow">Username</label>
              <input class="w-40" v-model="userStore.user.name" type="text" placeholder="New username" required/>
            </div>
            <div class="flex flex-col pt-4">
              <label class="text-whiteBackRow">Email</label>
              <input class="w-40" v-model="userStore.user.email" type="text" placeholder="New email" required/>
            </div>
          </div>
          <div class="flex flex-col ml-2 w-28">
            <div v-for="avatar in avatars" :key="avatar.src">
              <input type="radio" class='accent-greenBackRow' :value="avatar.src" v-model="userStore.user.avatar" />
              <label class="text-whiteBackRow">{{ avatar.name }}</label>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <button type="submit" class="hover:animate-pulse bg-greenBackRow h-8 w-20 m-4 rounded-md text-whiteBackRow"
            >Save</button>
        </div>    
      </form>
    </div>
</template>

<style scoped>
</style>