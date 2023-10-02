<script setup lang='ts'>
import GameContainer from '@/components/game/GameContainer.vue'
import MissionContainer from '@/components/game/MissionContainer.vue'
import AnswerContainer from '@/components/game/AnswerContainer.vue'
</script>

<template >
  <section class="gamePage">
    <div class="gameArea">
      <GameContainer />
    </div>
    <div class="sideArea">
      <MissionContainer />
      <AnswerContainer />
    </div>
  </section>
</template>

<style scoped>

.gamePage{
  display: flex;
  margin: 20px;
}

.gameArea{
  margin-right: 20px;
  width: 100%;
}

.sideArea{
  width: 100%;
}

</style>