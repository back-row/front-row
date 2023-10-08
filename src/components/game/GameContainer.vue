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
</script>
<template>
  <div class="gameGrid container h-fit border border-black bg-[#2C3540] rounded-sm">
    <transition-group name="player-move">
      <img
        :key="`${playerStore.playerPosition.row}-${playerStore.playerPosition.column}`"
        ref="player"
        id="player"
        class="w-10 z-10"
        src="../../assets/greenPlayer_nobg.png"
        alt="Green player"
        :style="{
          gridRow: playerStore.playerPosition.row,
          gridColumn: playerStore.playerPosition.column
        }"
      />
    </transition-group>
    <MapComponent :map-id="playerStore.playerPosition.mapId" />
  </div>
  <section class="flex flex-col justify-center items-center">
    <button class="border-black border-2 m-2 w-12" @click="playerStore.movePlayer(Direction.Up)">
      Up
    </button>
    <div>
      <button
        class="border-black border-2 m-2 w-12"
        @click="playerStore.movePlayer(Direction.Left)"
      >
        Left
      </button>
      <button
        class="border-black border-2 m-2 w-12"
        @click="playerStore.movePlayer(Direction.Right)"
      >
        Right
      </button>
    </div>
    <button class="border-black border-2 m-2 w-12" @click="playerStore.movePlayer(Direction.Down)">
      Down
    </button>
  </section>
</template>
<style scoped>
.gameGrid {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(11, 1fr);
}

.player-move-enter-active,
.player-move-leave-active {
  transition: transform 50ms cubic-bezier(0.41, 0.22, 0, 1.05);
}

.player-move-enter,
.player-move-leave-to {
  transform: translateX(0);
  opacity: 0.5;
}
</style>
