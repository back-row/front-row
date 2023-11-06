<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { getMapScores, getNumberOfMaps, type MapScore } from '@/utility/utility';
import { useMapStore } from '@/stores/map';
import { useUserStore } from '@/stores/user';
import { useI18n } from 'vue-i18n';

import { onMounted, ref, type Ref } from 'vue';
import router from '@/router';

const mapStore = useMapStore();
const userStore = useUserStore();
const userLevel = ref(0);
const numberOfMaps = ref(0);
const mapScores: Ref<MapScore[]> = ref([]);
const i18n = useI18n();

onMounted(async () => {
  await getNumberOfMaps().then((obj) => (numberOfMaps.value = parseInt(obj)));
  userLevel.value = userStore.user.level;

  mapScores.value = await getMapScores();
  mapScores.value.sort((a: MapScore, b: MapScore) => {
    return a.userscoremapid - b.userscoremapid;
  });
});

const startGame = async (map: number) => {
  await mapStore.getMapFromDb(map);
  router.push('/game');
};

const selectProgress = (value: number) => {
  let progress = '';

  if (userLevel.value > value) progress = i18n.locale.value.match('se') ? 'Klar' : 'Completed';
  else if (userLevel.value === value)
    progress = i18n.locale.value.match('se') ? 'Pågående' : 'In progress';
  else progress = i18n.locale.value.match('se') ? 'Ej upplåst' : 'Not started';
  return progress;
};
</script>

<template>
  <div class="flex justify-center">
    <table
      class="table-auto bg-whiteBackRow w-2/3 sm:w-1/2 max-h-[400px] mt-32 rounded-lg pt-10 text-blackBackRow shadow-lg shadow-gray-700 dark:shadow-none"
    >
      <thead>
        <tr>
          <th class="py-4 p-2 text-lg">{{ $t('level') }}</th>
          <th></th>
          <th class="text-lg">{{ $t('status') }}</th>
          <th class="text-lg p-2">{{ $t('score') }}</th>
          <th class="text-lg p-2">{{ $t('stars') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(number, index) in numberOfMaps" :key="number" class="odd:bg-gray-300">
          <td class="text-center p-2">{{ index + 1 + '.' }}</td>
          <td class="text-center p-2">
            <button
              v-if="userLevel >= index + 1"
              class="w-16 h-6 rounded-lg text-whiteBackRow bg-greenBackRow shadow-lg shadow-black hover:animate-pulse"
              @click="startGame(index + 1)"
            >
              {{ $t('play') }}
            </button>
          </td>
          <td class="text-center">{{ selectProgress(index + 1) }}</td>
          <td class="text-center">
            {{ mapScores[index] ? mapScores[index].userscorescore : '0' }}
          </td>
          <td class="flex flex-col justify-center items-center md:flex-row">
            <img
              v-if="mapScores[index] && mapScores[index].userscorescore >= 30"
              class="w-4 h-4 md:w-8 md:h-8"
              src="../../assets/starfilled.png"
            />
            <img v-else class="w-4 h-4 md:w-8 md:h-8" src="../../assets/starunfilled.png" />
            <img
              v-if="mapScores[index] && mapScores[index].userscorescore >= 50"
              class="w-4 h-4 md:w-8 md:h-8"
              src="../../assets/starfilled.png"
            />
            <img v-else class="w-4 h-4 md:w-8 md:h-8" src="../../assets/starunfilled.png" />
            <img
              v-if="mapScores[index] && mapScores[index].userscorescore >= 80"
              class="w-4 h-4 md:w-8 md:h-8"
              src="../../assets/starfilled.png"
            />
            <img v-else class="w-4 h-4 md:w-8 md:h-8" src="../../assets/starunfilled.png" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
