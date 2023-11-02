<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useMapStore } from '@/stores/map';
import { useUserStore } from '@/stores/user';
import { getHighScore } from '@/utility/utility';
import { onMounted, ref, type Ref } from 'vue';

type scores = { usersname: string; userstotalscore: number };
const userStore = useUserStore();
const mapStore = useMapStore();
const highScore: Ref<scores[]> = ref([]);
const userVisible = ref(false);

onMounted(async () => {
  highScore.value = await getHighScore();
  
  highScore.value.find((score) => {
    if(userStore.user.name === score.usersname){
      return userVisible.value = true;
    }else {
      return userVisible.value = false;
    }
  });
});

</script>

<template>
  <div class="flex flex-col items-center">
    <div
      class="bg-whiteBackRow w-4/5 sm:w-1/2 mt-20 rounded-lg text-blackBackRow shadow-black shadow-lg"
    >
      <h1 class="text-center sm:text-3xl mt-12 mb-6">{{ $t('HIGHSCORE') }}</h1>

      <tbody>
        <tr v-for="(score, index) in highScore" :key="score.usersname" class="odd:bg-gray-300">
          <td class="text-right w-128 p-2">{{ index + 1 + '.' }}</td>
          <td class="text-left w-1/2">{{ score.usersname }}</td>
          <td class="text-left w-1/4">{{ score.userstotalscore }}</td>
        </tr>
        <tr v-show="!userVisible" class="odd:bg-gray-300">
          <td class="text-right w-128 p-2">   </td>
          <td class="text-left w-1/2">{{ userStore.user.name }}</td>
          <td class="text-left w-1/4">{{ userStore.user.score }}</td>
        </tr>
      </tbody>
    </div>
    <router-link to="/level" v-show="userStore.user.id !== 0">
      <button
        @click="mapStore.getMapFromDb(userStore.user.level)"
        class="w-64 h-16 m-4 rounded-lg text-2xl text-whiteBackRow bg-greenBackRow shadow-lg shadow-black hover:animate-pulse"
      >
        {{ $t('play') }}
      </button>
    </router-link>
  </div>
</template>

<style></style>
