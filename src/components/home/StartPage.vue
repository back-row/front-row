<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { usePlayerStore } from '@/stores/player';
import { useUserStore } from '@/stores/user';
const playerStore = usePlayerStore();
const userStore = useUserStore();
</script>

<template>
  <div
    class="start sm:flex flex-col justify-start md:grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-3 mt-4"
  >
    <div
      class="knowledge hidden md:flex order-1 col-span-1 col-start-1 row-span-1 row-start-1 items-center justify-center"
    >
      <h2
        class="rounded-full ml-12 -rotate-12 h-24 w-96 bg-grayBackRow flex items-center justify-center text-4xl text-whiteBackRow"
      >
        Spela dig till kunskap
      </h2>
    </div>
    <div
      class="logo sm:order-1 md:col-span-1 row-span-1 row-start-1 col-start-2 flex items-center justify-center"
    >
      <img src="src\assets\logo-nobg.png" />
    </div>
    <div class="characters hidden md:inline col-span-1 col-start-1 row-span-1 row-start-2">
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
    <div
      class="play sm: order-4 col-span-1 row-span-1 row-start-2 col-start-2 flex items-start justify-center"
    >
      <router-link
        v-show="userStore.user.id !== 0"
        to="/level"
        class="hover:animate-pulse ease-in-out duration-300 hover:scale-110 bg-[#408080] h-36 w-7/12 m-2 rounded-xl flex items-center justify-center text-[#E5E5E5] text-4xl sm:text-5xl lg:text-7xl"
        @click="playerStore.playerPosition.atEnd = false"
        >Play now</router-link
      >
      <router-link
        v-show="userStore.user.id === 0"
        to="/highscore"
        class="hover:animate-pulse ease-in-out duration-300 hover:scale-110 bg-[#408080] h-36 w-7/12 m-2 rounded-xl flex items-center justify-center text-[#E5E5E5] text-4xl sm:text-5xl lg:text-7xl"
        >Highscore</router-link
      >
    </div>
  </div>
</template>
