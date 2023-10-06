<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();
const isShowingHint = ref(false);
const showJson = () => {
  isShowingHint.value = !isShowingHint.value;
}

type tutorial = {
  tutorialid: number;
  tutorialdescription: string;
  tutorialhint: string;
};

const currentMap = ref<tutorial>({
  tutorialid: 0,
  tutorialdescription: '',
  tutorialhint: ''
});

// Here is hook happen
onMounted(async () => {
  currentMap.value = await getTutorial(playerStore.playerPosition.mapId);
});

async function getTutorial(id: number) {
  try {
    const response = await fetch('http://localhost:8000/tutorial/' + id);
    return await response.json();
  } catch (error) {
    console.log(error);
    console.log('Could not get tutorial');
  }
}

</script>

<template>
  <div class="relative bg-[#2C3540] h-64 w-full mb-3 p-2 pt-10 rounded-sm">
    <Button class="hover:animate-pulse" @click="showJson">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        class="stroke-[#408080] w-8 h-8 m-2 absolute top-0 right-0"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    </Button>

    <div v-if="isShowingHint" class=" absolute z-50 opacity-90 p-6">
      <div class=" bg-black  rounded-lg flex items-center -mt-20 mr-5 -ml-7  overflow-x-hidden overflow-y-auto ">
        <p class=" text-greenBackrow p-5 text-xl">
          {{ currentMap.tutorialhint }}

        </p>
      </div>
    </div>
    <div class="bg-[#E5E5E5] h-4/5">
      <p>Uppdrag här</p>
    </div>
  </div>
</template>

<style scoped></style>
