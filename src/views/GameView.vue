<script setup lang='ts'>
import GameContainer from '@/components/game/GameContainer.vue'
import MissionContainer from '@/components/game/MissionContainer.vue'
import AnswerContainer from '@/components/game/AnswerContainer.vue'
</script>

<template >
  <div class="flex flex-wrap m-3">
  <section class="w-2/3 mr-3">
    <GameContainer />
  </section>
  <section class=" w-1/3">
    <MissionContainer />
    <AnswerContainer />
  </section>
  </div>
</template>

<style scoped>
</style>