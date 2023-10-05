<script setup lang='ts'>
import { ref } from 'vue'

const isShowingHint = ref(false)
const showJson = () => {
  isShowingHint.value = !isShowingHint.value;
}
</script>

<template>
  <div class="relative bg-[#2C3540] h-64 w-full mb-3 p-2 pt-10 rounded-sm">
    <Button class="hover:animate-pulse " @click="showJson">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        class="stroke-[#408080] w-8 h-8 m-2 absolute top-0 right-0">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    </Button>

    <div v-if="isShowingHint" class=" absolute z-50 opacity-90 p-6">
      <div class=" bg-black  rounded-lg flex items-center -mt-20 mr-5 -ml-7  overflow-x-hidden overflow-y-auto ">
        <p class=" text-greenBackrow p-5 text-xl">
          You need to cross the bridge on the way to town. To move you here use the command
          hero.moveTo(), where X is the marker (number) of the place you want to mov.
          For Example, to move to location 1 on the map, type the command hero.moveTo(1)
          You need to cross the bridge on the way to town. To move you here use the command
          hero.moveTo(), where X is the marker (number) of the place you want to mov.
          For Example, to move to location 1 on the map, type the command hero.moveTo(1)
          You need to cross the bridge on the way to town. To move you here use the command
          hero.moveTo(), where X is the marker (number) of the place you want to mov.
          For Example, to move to location 1 on the map, type the command hero.moveTo(1)
          You need to cross the bridge on the way to town. To move you here use the command
          hero.moveTo(), where X is the marker (number) of the place you want to mov.
          For Example, to move to location 1 on the map, type the command hero.moveTo(1)
        </p>
      
    <div class="bg-[#E5E5E5] h-4/5">
      <p>Uppdrag här</p>
    </div>
  </div>
</template>

<style scoped></style>
