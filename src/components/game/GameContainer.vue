<script setup lang="ts">
import { computed } from 'vue';
import { ref, onMounted } from 'vue';
import MapComponent from './MapComponent.vue';

const [BORDER_LEFT, BORDER_TOP] = [1, 1];
const [BORDER_RIGHT, BORDER_BOTTOM] = [11, 11];

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
  setStartPosition();
});

async function movePlayer(direction: Direction) {
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

function setStartPosition() {
  player.value.style.gridRow = BORDER_TOP.toString();
  player.value.style.gridColumn = BORDER_LEFT.toString();
}

async function updatePlayerPosition() {
  player.value.style.gridRow = `${playerPosition.value.row}`;
  player.value.style.gridColumn = `${playerPosition.value.column}`;
  console.log('playerPosition sent to backend');
  const response = await fetch('http://localhost:8000/player', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(playerPosition.value)
  });
  const data = await response.json();
  console.log('Player at end location: ', data);
}

function moveUp() {
  if (playerPosition.value.row !== BORDER_TOP) {
    playerPosition.value.row--;
  }
}

function moveDown() {
  if (playerPosition.value.row !== BORDER_BOTTOM) {
    playerPosition.value.row++;
  }
}

function moveLeft() {
  if (playerPosition.value.column !== BORDER_LEFT) {
    playerPosition.value.column--;
  }
}

function moveRight() {
  if (playerPosition.value.column !== BORDER_RIGHT) {
    playerPosition.value.column++;
  }
}
</script>
<template>
  <div class="gameGrid container h-fit border border-black bg-[#2C3540] rounded-sm">
    <img
      ref="player"
      id="player"
      class="w-10 transition-all ease-in-out duration-500"
      src="../../assets/ghost.png"
      alt="ghost"
    />

    <MapComponent :startLocation="{ row: 6, column: 6 }" />
  </div>
  <section class="flex flex-col justify-center items-center">
    <button class="border-black border-2 m-2 w-12" @click="movePlayer(Direction.Up)">Up</button>
    <div>
      <button class="border-black border-2 m-2 w-12" @click="movePlayer(Direction.Left)">
        Left
      </button>
      <button class="border-black border-2 m-2 w-12" @click="movePlayer(Direction.Right)">
        Right
      </button>
    </div>
    <button class="border-black border-2 m-2 w-12" @click="movePlayer(Direction.Down)">Down</button>
  </section>
</template>
<style scoped>
.gameGrid {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(11, 1fr);
}
</style>
