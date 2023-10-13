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

const picked = ref('src/assets/avatars' + userStore.user.avatar + 'png');

</script>
<template>
        <div class="flex bg-blackBackrow text-greenBackrow h-40 w-96 pt-4">
            <div class="flex flex-col items-center mx-6">
                <form>
                    <div class="flex flex-col w-32">
                        <label class="text-whiteBackRow">Username</label>
                        <input v-model="data.username" type="text" placeholder="New username"/>
                    </div>
                    <div class="flex flex-col pt-4 w-32">
                        <label class="text-whiteBackRow">Email</label>
                        <input v-model="data.email" type="text" placeholder="New email"/>
                    </div>
                </form>
            </div>
            <div class="flex flex-col">
                <div v-for="avatar in avatars" :key="avatar.name">
                    <input type="radio" :value="avatar.src" v-model="picked" />
                    <label>{{ avatar.name }}</label>
                </div>
            </div>
        <img class="w-20 h-20 m-6" :src="picked" alt="Picked avatar" />
        </div>
</template>

<style scoped>
</style>