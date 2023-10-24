<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
type avatar = { name: string; src: string};

const data = reactive({
    username: '',
    email:'',
    avatar: userStore.user.avatar
});

const avatars: Ref<avatar[]> = ref([
    {name: 'Boy1', src: 'boy1'},
    {name: 'Ghoul', src: 'ghoul'},
    {name: 'Girl1', src: 'girl1'},
    {name: 'Girl2', src: 'girl2'},
    {name: 'Masked', src: 'maskedr'}
    ])

async function editUser() {
  if(data.username != '')
    userStore.user.name = data.username;
  if(data.email != '')
    userStore.user.email = data.email;
  if(data.avatar != '')
    userStore.user.avatar = data.avatar;
  userStore.updateUser();
}

</script>

<template>
  <div class="flex bg-blackBackrow text-greenBackrow h-40 w-96 p-6">
      <form @submit.prevent="editUser">
        <div class="flex">
          <div class="flex flex-col w-1/2">
            <div>
              <label class="text-whiteBackRow">Username</label>
              <input class="w-36" v-model="data.username" type="text" placeholder="New username"/>
            </div>
            <div class="pt-4">
              <label class="text-whiteBackRow">Email</label>
              <input class="w-36" v-model="data.email" type="text" placeholder="New email"/>
            </div>
          </div>
          <div class="flex">
            <div class="flex flex-col w-1/2">
              <div v-for="avatar in avatars" :key="avatar.src">
                <input type="radio" class='accent-greenBackrow' :value="avatar.src" v-model="data.avatar" />
                <label class="text-whiteBackRow">{{ avatar.name }}</label>
              </div>
            </div>
            <img class="w-20 h-20 m-2" :src="'src/assets/avatars/' + data.avatar + '.png'" alt="Picked avatar" />
          </div>
        </div>
        <div class="flex justify-center">
          <button type="submit" class="hover:animate-pulse bg-greenBackrow h-8 w-20 m-4 rounded-md text-whiteBackRow"
            >Submit</button>
        </div>    
      </form>
    </div>
</template>

<style scoped>
</style>