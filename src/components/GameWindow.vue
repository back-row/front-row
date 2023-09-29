<script setup lang="ts">
import { ref, onMounted } from 'vue';

enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}
const player = ref(document.querySelector('#player') as HTMLImageElement);

onMounted(() => {
  player.value = document.querySelector('#player') as HTMLImageElement;
});

function movePlayer(direction: Direction) {
  console.log(player.value);
  console.log('movePlayer', direction);

  switch (direction) {
    case 'up':
      player.value.style.gridRow = '4 / 5';
      break;
    case 'down':
      player.value.style.gridRow = '6 / 7';
      break;
    case 'left':
      player.value.style.gridColumn = '4 / 5';
      break;
    case 'right':
      player.value.style.gridColumn = '6 / 7';
      break;
  }
}
</script>
<template>
  <div class="gameGrid container h-96 m-5 border border-5 border-black">
    <img ref="player" id="player" class="w-10" src="../assets/ghost.png" alt="ghost" />
  </div>
  <button @click="movePlayer(Direction.Right)">Up</button>
</template>
<style scoped>
.gameGrid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
}

#player {
  grid-row: 5 / 6;
  grid-column: 5 / 6;
}
</style>
