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
    <div class="bg-whiteBackRow md:w-1/2 mt-20 rounded-lg text-blackBackRow">
      <h1 class="text-center sm:text-3xl mt-12 mb-6">HIGH SCORE</h1>

      <tbody>
        <tr v-for="(score, index) in highScore" :key="score.usersname" class="odd:bg-gray-300">
          
          <td class="text-right  w-128 p-2">{{ index + 1 + '.' }} </td>
          <td class="text-left w-1/2">{{ score.usersname }}</td>
          <td class="text-left w-1/4">{{ score.userstotalscore }}</td>
          
        </tr>
      </tbody>
    </div>
    <router-link to="/level" v-show="userStore.user.id !== 0">
      <button
        @click="mapStore.getMapFromDb(userStore.user.level)"
        class="w-64 h-16 m-4 rounded-lg text-2xl text-whiteBackRow bg-greenBackRow hover:animate-pulse"
      >
        Play
      </button>
    </router-link>
  </div>
</template>

<style></style>
