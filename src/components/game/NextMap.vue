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
    class="z-20 absolute m-auto top-20 sm:top-12 left-0 right-0 bg-blackBackRow w-4/5 flex flex-col justify-center items-center rounded-xl border-2 border-blackBackRow shadow-blackBackRow shadow-lg"
    >
    <img
    class="max-w-full max-h-full m-2 mb-0 sm:m-4 pt-2 px-8 sm:pt-10 sm:px-20 rounded-lg"
    src="../../assets/nextLvl.jpg"
    alt="finish"
    />
    <router-link to="/level">
    <button
        class="w-32 h-8 sm:w-48 sm:h-16 flex items-center justify-center relative sm:absolute sm:top-28 sm:right-36 rounded-lg text-2xl text-whiteBackRow bg-greenBackRow"
        >
          {{$t('nextLevel')}}
    </button>
    </router-link>
    </div>
    <div  class="absolute m-auto left-0 right-0 w-screen h-screen z-10 bg-blackBackRow opacity-50">


    </div>
  </div>
</template>
<style scoped></style>
