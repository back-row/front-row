<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import FootBar from './components/FootBar.vue';
import Game from './components/game/Game.vue';
</script>

<template>
  <NavBar />
  <RouterView />
  <Game />
  <FootBar />
</template>

<style scoped></style>
