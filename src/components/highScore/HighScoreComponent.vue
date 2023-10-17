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

onMounted(async () => {
  highScore.value = await getHighScore();
});
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="bg-whiteBackRow md:w-1/2 mt-20 rounded-lg text-blackBackrow">
      <h1 class="text-center sm:text-3xl mt-12 mb-6">HIGH SCORE</h1>
      <ol class="list-decimal list-inside mx-12 md:text-lg md:ml-32 md:mr-32 mb-12">
        <li v-for="score in highScore" :key="score.usersname" class="odd:bg-gray-300">
          <span class="pl-3">{{ score.usersname }}</span>
          <span class="float-right">{{ score.userstotalscore }}</span>
        </li>
      </ol>
    </div>
    <router-link to="/game">
      <button
        @click="mapStore.getMapFromDb(userStore.user.level)"
        class="w-64 h-16 m-4 rounded-lg text-2xl text-whiteBackRow bg-greenBackrow hover:animate-pulse"
      >
        Play
      </button>
    </router-link>
  </div>
</template>

<style></style>
