<script setup lang="ts">
import { ref } from 'vue';
import GameContainer from '@/components/game/GameContainer.vue';
import MissionContainer from '@/components/game/MissionContainer.vue';
import AnswerContainer from '@/components/game/AnswerContainer.vue';
import TextInputContainer from '@/components/game/TextInputContainer.vue';
import WinModal from '@/components/game/WinModal.vue';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();
const easyMode = ref(false);
const changeDifficulty = () => {
  easyMode.value = !easyMode.value;
};
</script>

<template>
  <section class="gamePage m-6 grid grid-cols-1 sm:flex sm:flex-row justify-center">
    <div class="gameArea">
      <GameContainer />
    </div>
    <div class="sideArea mx-6">
      <MissionContainer />
      <TextInputContainer @easy-mode="changeDifficulty" v-if="!easyMode" />
      <AnswerContainer @easy-mode="changeDifficulty" v-else-if="easyMode" />
    </div>
    <div v-show="playerStore.playerPosition.atEnd">
      <WinModal />
    </div>
  </section>
</template>

<style scoped></style>
