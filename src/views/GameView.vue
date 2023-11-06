<script setup lang="ts">
import GameContainer from '@/components/game/GameContainer.vue';
import SideContainer from '@/components/game/SideContainer.vue';
import WinModal from '@/components/game/WinModal.vue';
import NextMap from '@/components/game/NextMap.vue';
import { usePlayerStore } from '@/stores/player';
import { useMapStore } from '@/stores/map';
import { getNumberOfMaps } from '@/utility/utility';
const mapStore = useMapStore();
const playerStore = usePlayerStore();

async function showWinModal() {
  return (
    playerStore.playerPosition.atEnd && mapStore.map.id + 1 === parseInt(await getNumberOfMaps())
  );
}
</script>

<template>
  <section class="gamePage flex flex-col sm:flex-row justify-center">
    <div class="gameArea">
      <GameContainer />
    </div>
    <div class="sideArea">
      <SideContainer />
    </div>
    <div v-if="!showWinModal()">
      <NextMap />
    </div>
    <div v-else>
      <WinModal />
    </div>
  </section>
</template>

<style scoped></style>
