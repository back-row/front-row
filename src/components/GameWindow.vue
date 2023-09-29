<script setup lang="ts"></script>
<template>
  <div class="gameGrid container h-96 m-5 border border-5 border-black">
    <img class="player w-full" src="../assets/ghost.png" alt="ghost" />
  </div>
</template>
<style scoped>
.gameGrid {
  display: grid;
  grid-template-columns: repeat(10, 20px);
  grid-template-rows: repeat(10, 20px);
}

.player {
  grid-row: 5 / 6;
  grid-column: 5 / 6;
}
</style>
