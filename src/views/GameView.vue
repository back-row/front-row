<script setup lang="ts">
import GameContainer from '@/components/game/GameContainer.vue';
import SideContainer from '@/components/game/SideContainer.vue';
import WinModal from '@/components/game/WinModal.vue';
import NextMap from '@/components/game/NextMap.vue';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();
</script>

<template>
  <section class="gamePage flex flex-col sm:flex-row justify-center">
    <div class="gameArea">
      <GameContainer />
    </div>
    <div class="sideArea">
      <SideContainer />
    </div>
    <div v-show="playerStore.playerPosition.atEnd">
      <NextMap />
    </div>
  </section>
</template>

<style scoped></style>
