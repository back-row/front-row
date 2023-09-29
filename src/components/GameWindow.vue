<script setup lang="ts">
import { computed } from '@vue/reactivity';
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
  player.value.style.gridRow = '5 / 6';
  player.value.style.gridColumn = '5 / 6';
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
}
function moveUp() {
  console.log(player.value);
  let currentRow = player.value.style.gridRow;
  console.log(currentRow);

  let currentRowNumber = parseInt(currentRow[0]);
  let newRowNumber = currentRowNumber - 1;
  player.value.style.gridRow = `${newRowNumber} / ${newRowNumber + 1}`;
  console.log(player.value.style.gridRow);
}

function moveDown() {
  let currentRow = player.value.style.gridRow;
  console.log(currentRow);
  let currentRowNumber = parseInt(currentRow[0]);
  let newRowNumber = currentRowNumber + 1;
  player.value.style.gridRow = `${newRowNumber} / ${newRowNumber + 1}`;
  console.log(player.value.style.gridRow);
}

function moveLeft() {
  let currentColumn = player.value.style.gridColumn;
  console.log(currentColumn);
  let currentColumnNumber = parseInt(currentColumn[0]);
  let newColumnNumber = currentColumnNumber - 1;
  player.value.style.gridColumn = `${newColumnNumber} / ${newColumnNumber + 1}`;
  console.log(player.value.style.gridColumn);
}

function moveRight() {
  let currentColumn = player.value.style.gridColumn;
  console.log(currentColumn);
  let currentColumnNumber = parseInt(currentColumn[0]);
  let newColumnNumber = currentColumnNumber + 1;
  player.value.style.gridColumn = `${newColumnNumber} / ${newColumnNumber + 1}`;
  console.log(player.value.style.gridColumn);
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
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
}
</style>
