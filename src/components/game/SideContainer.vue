<script setup lang="ts">
import { ref } from 'vue';
import MissionContainer from '@/components/game/MissionContainer.vue';
import AnswerContainer from '@/components/game/AnswerContainer.vue';
import TextInputContainer from '@/components/game/TextInputContainer.vue';

const easyMode = ref(false);
const activeButton = ref(false);

const changeDifficulty = () => {
  easyMode.value = !easyMode.value;
};

</script>

<template>
  <div class="sideArea mb-10 sm:hidden">
    <div class="flex text-blackBackRow dark:text-greenBackRow w-fit mt-4">
      <button class="p-2 cursor-pointer mx-2 dark:bg-grayLightBackRow border border-b-0 shadow-lg border-grayLightBackRow dark:border-none rounded-t-md" @click="activeButton = false" :class="{'text-2xl font-bold': activeButton === false}">{{$t('mission')}}</button>
      <button class="p-2 cursor-pointer dark:bg-grayLightBackRow border border-b-0 border-grayLightBackRow dark:border-none rounded-t-md" @click="activeButton = true" :class="{'text-2xl font-bold': activeButton === true}">{{$t('answer')}}</button>
    </div>
    <MissionContainer v-show="!activeButton"/>
    <div v-show="activeButton">
      <TextInputContainer @easy-mode="changeDifficulty" v-if="!easyMode" />
      <AnswerContainer @easy-mode="changeDifficulty" v-else-if="easyMode" />
    </div>
  </div>

  <div class="sideArea hidden sm:block sm:ml-3">
    <MissionContainer />
    <TextInputContainer @easy-mode="changeDifficulty" v-if="!easyMode" />
    <AnswerContainer @easy-mode="changeDifficulty" v-else-if="easyMode" />
  </div>
</template>
