<script setup lang="ts">
import MapComponent from './MapComponent.vue';
import { usePlayerStore } from '@/stores/player';

enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

const playerStore = usePlayerStore();

async function movePlayer(direction: Direction) {
  console.log('movePlayer', direction);

  switch (direction) {
    case 'up':
      playerStore.moveUp();
      break;
    case 'down':
      playerStore.moveDown();
      break;
    case 'left':
      playerStore.moveLeft();
      break;
    case 'right':
      playerStore.moveRight();
      break;
  }
  updatePlayerPosition();
}

async function updatePlayerPosition() {
  console.log('playerStore: ', playerStore.playerPosition);
  console.log('playerStore sent to backend');
  const response = await fetch('http://localhost:8000/player', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(playerStore.playerPosition)
  });
  const data = await response.json();
  console.log('Player at end location: ', data);
}
</script>
<template>
  <div class="gameGrid container h-fit border border-black bg-[#2C3540] rounded-sm">
    <img
      ref="player"
      id="player"
      class="w-10"
      src="../../assets/ghost.png"
      alt="ghost"
      :style="{
        gridRow: playerStore.playerPosition.row,
        gridColumn: playerStore.playerPosition.column
      }"
    />

    <MapComponent :map-id="playerStore.playerPosition.mapId" />
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
