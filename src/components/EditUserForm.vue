<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
type avatar = { name: string; src: string};

const data = reactive({
    username: '',
    email:''
});

const avatars: Ref<avatar[]> = ref([
    {name: 'Boy1', src: 'src/assets/avatars/boy1.png'},
    {name: 'Ghoul', src: 'src/assets/avatars/ghoul.png'},
    {name: 'Girl1', src: 'src/assets/avatars/girl1.png'},
    {name: 'Girl2', src: 'src/assets/avatars/girl2.png'},
    {name: 'Masked', src: 'src/assets/avatars/maskedr.png'}
    ])

const picked = ref('src/assets/avatars/' + userStore.user.avatar + '.png');

async function editUser() {
  
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
                <input type="radio" :value="avatar.src" v-model="picked" />
                <label class="text-whiteBackRow">{{ avatar.name }}</label>
              </div>
            </div>
            <img class="w-20 h-20 m-2" :src="picked" alt="Picked avatar" />
          </div>
        </div>
        <div class="flex justify-center">
          <button type="submit" class="hover:animate-pulse bg-[#408080] h-8 w-20 m-4 rounded-md text-whiteBackRow"
            >Submit</button>
        </div>    
      </form>
    </div>
</template>

<style scoped>
</style>