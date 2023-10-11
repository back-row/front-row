<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAnswers } from '@/utility/utility';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();
const userInput = ref('');
const question = ref('');
const easyMode = ref(false);
const emit = defineEmits(['easyMode']);

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
  for (const s of stringArray) {
    switch (s) {
      case 'hero.up()':
        await playerStore.movePlayer(Direction.Up);
        break;
      case 'hero.down()':
        await playerStore.movePlayer(Direction.Down);
        break;
      case 'hero.left()':
        await playerStore.movePlayer(Direction.Left);
        break;
      case 'hero.right()':
        await playerStore.movePlayer(Direction.Right);
        break;
      default:
        console.log('You fail', s);
        break;
    }
  }
};

const setDifficulty = () => {
  easyMode.value = !easyMode.value;
  emit('easyMode', easyMode.value);
};

const onSubmit = async () => {
  let commands = userInput.value.split(/[\n;]/).map((s) => s.trim());
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
      @click.prevent="setDifficulty"
      class="hover:animate-pulse bg-[#408080] h-10 w-20 m-2 rounded-md flex items-center justify-center absolute bottom-0 left-0 text-white"
    >
      Quiz mode
    </button>
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
