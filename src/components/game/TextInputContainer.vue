<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAnswers, getAnswersSe } from '@/utility/utility';
import { usePlayerStore } from '@/stores/player';
import { useMapStore } from '@/stores/map';

const mapStore = useMapStore();
const playerStore = usePlayerStore();
const userInput = ref('');
const question = ref('');
const questionSe = ref('');
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

onMounted(async () => {
  await getAnswers(mapStore.map.quizId).then((obj) => [(question.value = obj.question)]);
  await getAnswersSe(mapStore.map.quizId).then((obj) => [(questionSe.value = obj.question)]);
});

const parseUserInput = async (stringArray: string[]) => {
  for (const s of stringArray) {
    const regexForLoop = /^loop\((\d+)\){\s*([^{}]+)\s*}$/;
    const match = s.match(regexForLoop);
    let regex = /^hero\.(\w+)\(\d+\)$/;
    let argument = 1;

    if (match) {
      const argument = parseInt(match[1]);
      const actions = match[2].trim().split(/\s+/);
      for (let i = 0; i < argument; i++) {
        for (const action of actions) {
          await processLoop(action, argument, playerStore);
        }
      }
    } else {
      if (s.match(regex)) {
        argument = parseInt(s.substring(s.length - 2, s.length - 1));
      }
    }

    switch (s) {
      case 'hero.up(' + argument + ')':
      case 'hero.up()':
        for (let i = 0; i < argument; i++) {
          await playerStore.movePlayer(Direction.Up);
        }
        break;
      case 'hero.down(' + argument + ')':
      case 'hero.down()':
        for (let i = 0; i < argument; i++) {
          await playerStore.movePlayer(Direction.Down);
        }
        break;
      case 'hero.left(' + argument + ')':
      case 'hero.left()':
        for (let i = 0; i < argument; i++) {
          await playerStore.movePlayer(Direction.Left);
        }
        break;
      case 'hero.right(' + argument + ')':
      case 'hero.right()':
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
        console.log('You fail', s);
        break;
    }
  }
};

const processLoop = async (action: string, argument: integer, playerStore: PlayerStore) => {
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

//docker build conflict fix
interface PlayerStore {
  movePlayer(direction: Direction): Promise<void>;
}

const setDifficulty = () => {
  easyMode.value = !easyMode.value;
  emit('easyMode', easyMode.value);
};

const onSubmit = async () => {
  let commands = [];
  const userInputValue = userInput.value;
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
  <div
    class="relative shadow-lg shadow-gray-700 border-2 dark:shadow-none dark:border-none dark:bg-grayLightBackRow mx-1 sm:mx-0 h-80 sm:w-128 p-2 pt-4 rounded-sm"
  >
    <div class="dark:bg-whiteBackRow h-4/5 w-full">
      <div class="question m-1">
        {{
          $i18n.locale.match('se')
            ? 'Vilka kommandon får spelaren att gå till prinsessan?'
            : 'Which combination of commands makes the player move to the princess?'
        }}
      </div>
      <div class="flex items-start justify-center">
        <textarea
          v-model="userInput"
          class="mt-4 bg-whiteBackRow dark:bg-white dark:text-blackBackRow"
          id=""
          cols="45"
          rows="5"
          placeholder="Type your code here..."
        ></textarea>
      </div>
    </div>
    <button
      @click.prevent="setDifficulty"
      class="hover:animate-pulse shadow-lg shadow-black bg-greenBackRow h-10 w-fit px-2 m-2 rounded-md flex items-center justify-center absolute bottom-0 left-0 text-whiteBackRow"
    >
      {{ $t('quizMode') }}
    </button>
    <button
      @click="resetButton"
      class="hover:animate-pulse shadow-lg shadow-black bg-greenBackRow h-10 w-20 m-2 rounded-md flex items-center justify-center absolute bottom-0 right-28 text-whiteBackRow"
    >
      {{ $t('reset') }}
    </button>
    <button
      type="submit"
      @click.prevent="onSubmit"
      class="hover:animate-pulse shadow-lg shadow-black bg-greenBackRow h-10 w-20 m-2 rounded-md flex items-center justify-center absolute bottom-0 right-0 text-whiteBackRow"
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
      {{ $t('run') }}
    </button>
  </div>
</template>

<style scoped></style>
