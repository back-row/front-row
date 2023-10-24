<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useMapStore } from '@/stores/map';
import { ref } from 'vue';

const mapStore = useMapStore();

const showModal = ref(true);


</script>
<template>
  <div v-if="showModal" >
    <div 
    class="z-20 absolute m-auto left-0 right-0 bg-blackBackRow w-4/5 flex flex-col justify-center items-center rounded-xl border-2 border-blackBackRow shadow-blackBackRow shadow-lg"
    >
    <img
    class="max-w-full max-h-full m-4 pt-10 px-20 rounded-lg"
    src="../../assets/nextLvl.jpg"
    alt="finish"
    />
    <router-link to="/level">
    <button
        class="w-48 h-16 flex items-center justify-center absolute top-28 right-36 rounded-lg text-2xl text-whiteBackRow bg-greenBackRow"
        >
          Next level
    </button>
    </router-link>
    </div>
    <div  class="absolute m-auto left-0 right-0 w-screen h-screen z-10 bg-blackBackRow opacity-50">


    </div>
  </div>
</template>
<style scoped></style>
