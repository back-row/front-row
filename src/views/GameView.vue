<script setup lang='ts'>
import GameContainer from '@/components/game/GameContainer.vue'
import MissionContainer from '@/components/game/MissionContainer.vue'
import AnswerContainer from '@/components/game/AnswerContainer.vue'
</script>

<template>
  <div class="container">
    <GameContainer />
    <div class="column">
      <MissionContainer />
      <AnswerContainer />
    </div>
  </div>
</template>

<style scoped>

.container{
  display: flex;
  flex-direction: row;
}

.column{
  display: flex;
  flex-direction: column;
  
}
</style>