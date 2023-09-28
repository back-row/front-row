<script setup lang='ts'>
import GameContainer from '@/components/game/GameContainer.vue'
import MissionContainer from '@/components/game/MissionContainer.vue'
import AnswerContainer from '@/components/game/AnswerContainer.vue'
</script>

<template>
  <div class="flex">
    <GameContainer />
    <div>
      <MissionContainer />
      <AnswerContainer />
    </div>
  </div>
</template>

<style scoped>
</style>