<script setup lang="ts">
import { usePlayerStore } from '@/stores/player';
import { RouterLink } from 'vue-router';

const playerStore = usePlayerStore();
</script>
<template>
  <div>
    <div
      class="z-20 absolute m-auto left-0 right-0 bg-[#0A0F14] w-4/5 flex flex-col justify-center items-center rounded-xl border-2 border-black shadow-black shadow-lg"
    >
      <img
        class="max-w-full max-h-full m-4 pt-10 px-20 rounded-lg"
        src="../../assets/finish.png"
        alt="finish"
      />
      <router-link to="/">
        <button
          @onclick="playerStore.playerPosition.atEnd = false"
          class="w-72 h-16 mb-4 rounded-lg text-2xl text-white bg-[#408080]"
        >
          Back to home page
        </button>
      </router-link>
    </div>
    <div class="absolute m-auto left-0 right-0 w-screen h-screen z-10 bg-black opacity-50"></div>
  </div>
</template>
<style scoped></style>
