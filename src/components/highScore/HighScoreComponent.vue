<script setup lang="ts">
import { RouterLink } from 'vue-router';

type scores = { name: string; score: string };

const highScore: scores[] = [
  { name: 'test test', score: '2000' },
  { name: 'test test', score: '2000' },
  { name: 'test test', score: '2000' },
  { name: 'test test', score: '2000' },
  { name: 'test test', score: '2000' },
  { name: 'test test', score: '2000' },
  { name: 'test test', score: '2000' },
  { name: 'test test', score: '2000' },
  { name: 'test test', score: '2000' },
  { name: 'test test', score: '2000' }
];
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="bg-[#E5E5E5] w-1/2 mt-20 rounded-lg">
      <h1 class="text-center text-3xl mt-12 mb-6">HIGH SCORE</h1>
      <ol class="list-decimal list-inside text-lg ml-32 mr-32 mb-12">
        <li v-for="score in highScore" :key="score.name">
          <span class="pl-3">{{ score.name }}</span>
          <span class="float-right">{{ score.score }}</span>
        </li>
      </ol>
    </div>
    <router-link to="/game">
      <button class="w-64 h-16 m-4 rounded-lg text-2xl text-white bg-[#408080] hover:animate-pulse">
        Play
      </button>
    </router-link>
  </div>
</template>

<style></style>
