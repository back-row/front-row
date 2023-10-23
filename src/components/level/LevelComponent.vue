<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { getNumberOfMaps } from '@/utility/utility';
import { useMapStore } from '@/stores/map';
import { useUserStore } from '@/stores/user';

import { onMounted, ref } from 'vue';

const mapStore = useMapStore();
const userStore = useUserStore();
const userLevel = ref(0);
const numberOfMaps = ref(0);

onMounted(() => {
  getNumberOfMaps().then((obj) => (numberOfMaps.value = parseInt(obj)));
  userLevel.value = userStore.user.level;
});

const startGame = async (map: number) => {
  await mapStore.getMapFromDb(map);
};

const selectProgress = (value: number) => {
  let progress = '';

  if (userLevel.value > value) progress = 'Completed';
  else if (userLevel.value === value) progress = 'In progress';
  else progress = 'Not started';
  return progress;
};

const getScore = 100;
</script>

<template>
  <div class="flex justify-center">
    <table
      class="table-auto bg-[#E5E5E5] w-2/3 sm:w-1/2 max-h-[400px] mt-32 rounded-lg pt-10 text-blackBackrow"
    >
      <thead>
        <tr>
          <th class="py-4">Level</th>
          <th></th>
          <th>Status</th>
          <th>Your score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(number, index) in numberOfMaps" :key="number" class="odd:bg-gray-300">
          <td class="text-center p-2">{{ index + 1 + '.' }}</td>
          <td class="text-center">
            <router-link to="/game">
              <button
                v-if="userLevel >= index + 1"
                class="w-16 h-6 rounded-lg text-whiteBackRow bg-greenBackrow hover:animate-pulse"
                @click="startGame(index + 1)"
              >
                Play
              </button>
            </router-link>
          </td>
          <td class="text-center">{{ selectProgress(index + 1) }}</td>
          <td class="text-center">{{ getScore }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
