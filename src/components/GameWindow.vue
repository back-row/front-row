<script setup lang="ts">
import { computed } from 'vue';
import { ref, onMounted } from 'vue';

enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}
const player = ref(document.querySelector('#player') as HTMLImageElement);
const playerPosition = computed(() => {
  return {
    row: parseInt(player.value.style.gridRow[0]),
    column: parseInt(player.value.style.gridColumn[0])
  };
});

onMounted(() => {
  player.value = document.querySelector('#player') as HTMLImageElement;
  player.value.style.gridRow = '5';
  player.value.style.gridColumn = '5';
});

function movePlayer(direction: Direction) {
  console.log('movePlayer', direction);

  switch (direction) {
    case 'up':
      moveUp();
      break;
    case 'down':
      moveDown();
      break;
    case 'left':
      moveLeft();
      break;
    case 'right':
      moveRight();
      break;
  }
  updatePlayerPosition();
}

function updatePlayerPosition() {
  player.value.style.gridRow = `${playerPosition.value.row}`;
  player.value.style.gridColumn = `${playerPosition.value.column}`;
}

function moveUp() {
  if (playerPosition.value.row !== 1) {
    playerPosition.value.row--;
  }
}

function moveDown() {
  if (playerPosition.value.row !== 10) {
    playerPosition.value.row++;
  }
}

function moveLeft() {
  if (playerPosition.value.column !== 1) {
    playerPosition.value.column--;
  }
}

function moveRight() {
  if (playerPosition.value.column !== 10) {
    playerPosition.value.column++;
  }
}
</script>
<template>
  <div class="gameGrid container h-96 m-5 border border-5 border-black">
    <img ref="player" id="player" class="w-10" src="../assets/ghost.png" alt="ghost" />
  </div>
  <button @click="movePlayer(Direction.Up)">Up</button>
  <button @click="movePlayer(Direction.Down)">Down</button>
  <button @click="movePlayer(Direction.Left)">Left</button>
  <button @click="movePlayer(Direction.Right)">Right</button>
</template>
<style scoped>
.gameGrid {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
}
</style>
