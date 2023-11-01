<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { getAnswers, getAnswersSe } from '@/utility/utility';
import { usePlayerStore } from '@/stores/player';
import { useMapStore } from '@/stores/map';

const playerStore = usePlayerStore();
const mapStore = useMapStore();

type answer = { choice: string; answer: string[] };
const selectedAnswer = ref([]);
const answers: Ref<answer[]> = ref([]);
const answersSe: Ref<answer[]> = ref([]);
const question = ref('');
const questionSe = ref('');
const easyMode = ref(false);
const emit = defineEmits(['easyMode']);

enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}

onMounted(() => {
  getAnswers(mapStore.map.quizId).then((obj) => [
    answers.value.push(
      { choice: obj.choice1, answer: obj.answer1 },
      { choice: obj.choice2, answer: obj.answer2 },
      { choice: obj.choice3, answer: obj.answer3 }
    ),

    (question.value = obj.question)
  ]);

  getAnswersSe(mapStore.map.quizId).then((obj) => [
    answersSe.value.push(
      { choice: obj.choice1, answer: obj.answer1 },
      { choice: obj.choice2, answer: obj.answer2 },
      { choice: obj.choice3, answer: obj.answer3 }
    ),

    (questionSe.value = obj.question)
  ]);
});

const resetButton = () => {
  mapStore.map.reset = true;
  selectedAnswer.value = [];
};

const setDifficulty = () => {
  easyMode.value = !easyMode.value;
  emit('easyMode', easyMode.value);
};

const onSubmit = async () => {
  mapStore.map.score = mapStore.map.score - 70;
  for (const element of selectedAnswer.value) {
    console.log(element);
    switch (element) {
      case 'hide(spikes)':
        await playerStore.hideSpikes();
        console.log('hide spikes');
        break;
      case 'up':
        await playerStore.movePlayer(Direction.Up);
        break;
      case 'down':
        await playerStore.movePlayer(Direction.Down);
        break;
      case 'left':
        await playerStore.movePlayer(Direction.Left);
        break;
      case 'right':
        await playerStore.movePlayer(Direction.Right);
        break;
      default:
        console.log('You fail', element);
        break;
    }
  }
};
</script>

<template>
  <div
    class="relative shadow-lg shadow-gray-700 border-2 dark:border-none dark:shadow-none dark:bg-grayLightBackRow mx-1 sm:mx-0 h-80 sm:w-128 p-2 pt-4 rounded-sm"
  >
    <div v-if="$i18n.locale.match('se')" class="dark:bg-whiteBackRow h-4/5 w-full">
      <div class="question">{{ $i18n.locale.match('se') ? questionSe : question }}</div>
      <div v-for="answer in answersSe" :key="answer.choice" class="flex items-center ml-4">
        <input
          type="radio"
          class="border-blackBackRow border-2 w-4 h-4 accent-greenBackRow"
          v-model="selectedAnswer"
          :value="answer.answer"
        />
        <label class="ml-2">{{ answer.choice }}</label>
      </div>
    </div>
    <div v-else class="dark:bg-whiteBackRow h-4/5 w-full">
      <div class="question">{{ $i18n.locale.match('se') ? questionSe : question }}</div>
      <div v-for="answer in answers" :key="answer.choice" class="flex items-center ml-4">
        <input
          type="radio"
          class="border-blackBackRow border-2 w-4 h-4 accent-greenBackRow"
          v-model="selectedAnswer"
          :value="answer.answer"
        />
        <label class="ml-2">{{ answer.choice }}</label>
      </div>
    </div>
    <button
      @click.prevent="setDifficulty"
      class="hover:animate-pulse shadow-lg shadow-black bg-greenBackRow h-10 w-20 m-2 rounded-md flex items-center justify-center absolute bottom-0 left-0 text-whiteBackRow"
    >
      {{$t('textInput')}}
    </button>
    <button
      @click="resetButton"
      class="hover:animate-pulse shadow-lg shadow-black bg-greenBackRow h-10 w-20 m-2 rounded-md flex items-center justify-center absolute bottom-0 right-28 text-whiteBackRow"
    >
      {{$t('reset')}}
    </button>
    <button
      type="submit"
      @click.prevent="onSubmit()"
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
      {{$t('run')}}
    </button>
  </div>
</template>

<style scoped></style>
