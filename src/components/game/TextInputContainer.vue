<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAnswers } from '@/utility/utility';
import { usePlayerStore } from '@/stores/player';
import { useMapStore } from '@/stores/map';
import { match } from 'assert';
<<<<<<< HEAD
import { handleError } from 'vue';
=======
>>>>>>> 453cc14 (now is working)

const mapStore = useMapStore();
const playerStore = usePlayerStore();
const userInput = ref('');
const question = ref('');
const easyMode = ref(false);
const emit = defineEmits(['easyMode']);

const resetButton = () => {
  userInput.value = '';
  mapStore.map.reset = true;
};

enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

onMounted(() => {
  getAnswers(mapStore.map.quizId).then((obj) => [(question.value = obj.question)]);
});

const parseUserInput = async (stringArray: string) => {

  for (const s of stringArray) {
        const concatenatedInput = stringArray.join('\n');

   const regexForLoop = /^loop\((\d+)\){\s*([^{}]+)\s*}$/;
    const match = s.match(regexForLoop);

    if (match) {
      const argument = parseInt(match[1]);
      const actions = match[2].trim().split(/\s+/);

      for (let i = 0; i < argument; i++) {
        for (const action of actions) {
          await processLoop(action, argument, playerStore);
        }
      }


    } else {
    
    let regex = /^hero\.(\w+)\(\d+\)$/;
    let argument = 1;

    if (s.match(regex)) {
      argument = parseInt(s.substring(s.length - 2, s.length - 1));
    }
    

    switch (s) {
      case 'hero.up(' + argument + ')': case 'hero.up()':
        for (let i = 0; i < argument; i++) {
          await playerStore.movePlayer(Direction.Up);
        }
        break;
      case 'hero.down(' + argument + ')': case 'hero.down()':
        for (let i = 0; i < argument; i++) {
          await playerStore.movePlayer(Direction.Down);
        }
        break;
      case 'hero.left(' + argument + ')': case 'hero.left()':
        for (let i = 0; i < argument; i++) {
          await playerStore.movePlayer(Direction.Left);
        }
        break;
      case 'hero.right(' + argument + ')': case 'hero.right()':
        for (let i = 0; i < argument; i++) {
          await playerStore.movePlayer(Direction.Right);
        }
        break;
      case 'hide(spikes)':
        await playerStore.hideSpikes();
        break;
      case 'coin += 1':
        if (mapStore.map.touchCoin) mapStore.map.collectCoin = true;
        break;
      case 'coin = coin + 1':
        if (mapStore.map.touchCoin) mapStore.map.collectCoin = true;
        break;
      case 'bribe()':
        if (mapStore.map.touchGuard) mapStore.map.bribeGuard = true;
        break;
      default:
        // console.log('You fail', s);
        break;

      }
    }
  }
};

const processLoop = async (action: string, argument: integer, playerStore) => {
  switch (action) {
    case 'hero.right()':
      await playerStore.movePlayer(Direction.Right);
    
      break;
    case 'hero.down()':
      await playerStore.movePlayer(Direction.Down);
  
      break;
    case 'hero.up()':
      await playerStore.movePlayer(Direction.Up);
     
      break;
    case 'hero.left()':
      await playerStore.movePlayer(Direction.Left);
     
      break;
    default:
      console.log('Invalid action:', action);
  }
};

const setDifficulty = () => {
  easyMode.value = !easyMode.value;
  emit('easyMode', easyMode.value);
};

const onSubmit = async () => {
  const userInputValue = userInput.value;
  let commands = [];

  // Check for a loop construct using a regular expression
  const loopRegex = /loop\(\d+\)\{[^{}]*\}/;

  if (loopRegex.test(userInputValue)) {
    commands = userInput.value.split(/[]/).map((s) => s.trim());
    console.log('commands', commands);
  } else {
    commands = userInput.value.split(/[\n;]/).map((s) => s.trim());
  }

  mapStore.map.score = mapStore.map.score - commands.length * 2;
  await parseUserInput(commands);
};
</script>

<template>
  <div class="relative bg-grayLightBackRow h-80 sm:w-128 p-2 pt-4 rounded-sm">
    <div class="bg-whiteBackRow h-4/5 w-full">
      <div class="question m-1">{{ question }}</div>
      <div class="flex items-start justify-center">
        <textarea
          v-model="userInput"
          class="mt-4 text-blackBackRow"
          id=""
          cols="45"
          rows="5"
          placeholder="Type your code here..."
        ></textarea>
      </div>
    </div>
    <button
      @click.prevent="setDifficulty"
      v-show="mapStore.map.id !== 4"
      class="hover:animate-pulse bg-greenBackRow h-10 w-20 m-2 rounded-md flex items-center justify-center absolute bottom-0 left-0 text-whiteBackRow"
    >
      Quiz mode
    </button>
    <button
      @click="resetButton"
      class="hover:animate-pulse bg-greenBackRow h-10 w-20 m-2 rounded-md flex items-center justify-center absolute bottom-0 right-28 text-whiteBackRow"
    >
      Reset
    </button>
    <button
      type="submit"
      @click.prevent="onSubmit"
      class="hover:animate-pulse bg-greenBackRow h-10 w-20 m-2 rounded-md flex items-center justify-center absolute bottom-0 right-0 text-whiteBackRow"
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
