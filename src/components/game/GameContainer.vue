<script setup lang="ts">
import { ref } from 'vue';
import MapComponent from './MapComponent.vue';

const [BORDER_LEFT, BORDER_TOP] = [1, 1];
const [BORDER_RIGHT, BORDER_BOTTOM] = [11, 11];

enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}
const playerPosition = ref({
  row: BORDER_LEFT,
  column: BORDER_TOP,
  //TODO: get mapId from ? player status?
  mapId: 1
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

async function updatePlayerPosition() {
  console.log('playerPosition: ', playerPosition.value);
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
      class="w-10"
      src="../../assets/greenPlayer_nobg.png"
      alt="Green player"
      :style="{ gridRow: playerPosition.row, gridColumn: playerPosition.column }"
    />

    <MapComponent :map-id="playerPosition.mapId" />
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
