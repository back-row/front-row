<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { usePlayerStore } from '@/stores/player';
const playerStore = usePlayerStore();
</script>

<template>
  <div class="start grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-3 mt-4">
    <div
      class="knowledge col-span-1 col-start-1 row-span-1 row-start-1 flex items-center justify-center"
    >
      <h2
        class="rounded-full ml-12 -rotate-12 h-24 w-96 bg-[#2C3540] flex items-center justify-center text-4xl text-[#E5E5E5]"
      >
        Spela dig till kunskap
      </h2>
    </div>
    <div
      class="logo col-span-1 row-span-1 row-start-1 col-start-2 flex items-center justify-center"
    >
      <img src="src\assets\logo-nobg.png" />
    </div>
    <div class="characters col-span-1 col-start-1 row-span-1 row-start-2">
      <div class="flex flex-nowrap rounded-xl ml-24 mr-12 p-6 bg-[#0A0F14]">
        <div class="character ease-in-out duration-300 hover:scale-110">
          <img src="src\assets\bluePlayer_nobg.png" />
        </div>
        <div class="character ease-in-out duration-300 hover:scale-110">
          <img src="src\assets\yellowPlayer_nobg.png" />
        </div>
        <div class="character ease-in-out duration-300 hover:scale-110">
          <img src="src\assets\greenPlayer_nobg.png" />
        </div>
      </div>
    </div>
    <div class="play col-span-1 row-span-1 row-start-2 col-start-2 flex items-start justify-center">
      <router-link
        to="/game"
        class="hover:animate-pulse ease-in-out duration-300 hover:scale-110 bg-[#408080] h-36 w-7/12 m-2 rounded-xl text-7xl flex items-center justify-center text-[#E5E5E5]"
        @click="playerStore.playerPosition.atEnd = false"
        >Play now</router-link
      >
    </div>
  </div>
</template>
