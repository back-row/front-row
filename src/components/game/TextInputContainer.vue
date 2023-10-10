<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAnswers } from '@/utility/utility';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();
const userInput = ref('');
const question = ref('');

enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

onMounted(() => {
  getAnswers().then((obj) => [(question.value = obj.question)]);
});

const parseUserInput = async (stringArray: string[]) => {
  stringArray.forEach(async (s) => {
    switch (s) {
      case 'up':
        await playerStore.movePlayer(Direction.Up);
        await new Promise((resolve) => setTimeout(resolve, 500));
        playerStore.playerPosition.player!.setVelocity(0);
        break;
      case 'down':
        await playerStore.movePlayer(Direction.Down);
        await new Promise((resolve) => setTimeout(resolve, 500));
        playerStore.playerPosition.player!.setVelocity(0);
        break;
      case 'left':
        await playerStore.movePlayer(Direction.Left);
        await new Promise((resolve) => setTimeout(resolve, 500));
        playerStore.playerPosition.player!.setVelocity(0);
        break;
      case 'right':
        await playerStore.movePlayer(Direction.Right);
        await new Promise((resolve) => setTimeout(resolve, 500));
        playerStore.playerPosition.player!.setVelocity(0);
        break;
    }
  });
};

const onSubmit = async () => {
  let commands = userInput.value.split('\n');
  console.log(commands);
  await parseUserInput(commands);
};
</script>

<template>
  <div class="relative bg-[#2C3540] h-80 w-full p-2 pt-4 rounded-sm">
    <div class="bg-[#E5E5E5] h-4/5">
      <div class="question">{{ question }}</div>
      <div class="flex items-start justify-center">
        <textarea
          v-model="userInput"
          class="mt-4"
          id=""
          cols="45"
          rows="5"
          placeholder="Type your code here..."
        ></textarea>
      </div>
    </div>
    <button
      type="submit"
      @click.prevent="onSubmit"
      class="hover:animate-pulse bg-[#408080] h-10 w-20 m-2 rounded-md flex items-center justify-center absolute bottom-0 right-0 text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-8 h-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
        />
      </svg>
      Run
    </button>
  </div>
</template>

<style scoped></style>
