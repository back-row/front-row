<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useMapStore } from '@/stores/map';


const mapStore = useMapStore();

const nextLevel = async () => {

  await mapStore.getMapFromDb(2);
};
</script>
<template>
  <div>
    <div
      class="z-20 absolute m-auto left-0 right-0 bg-blackBackrow w-4/5 flex flex-col justify-center items-center rounded-xl border-2 border-blackBackrow shadow-blackBackrow shadow-lg"
    >
      <img
        class="max-w-full max-h-full m-4 pt-10 px-20 rounded-lg"
        src="../../assets/finish.png"
        alt="finish"
      />
      <router-link to="/">
     
        <button
          @onclick="nextLevel"
          class="w-48 h-16 flex items-center justify-center absolute top-28 right-36 rounded-lg text-2xl text-whiteBackRow bg-greenBackrow"
        >
         Next level
        </button>
      </router-link>
    </div>
    <div class="absolute m-auto left-0 right-0 w-screen h-screen z-10 bg-blackBackrow opacity-50">


    </div>
  </div>
</template>
<style scoped></style>
