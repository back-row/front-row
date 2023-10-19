<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import type { Game } from 'phaser';

let gameInstance: Game | null = null;
const containerId = 'gamecontainer';
const game = await import('@/game/game');

onMounted(() => {
  gameInstance = game.launch(containerId);
});

onUnmounted(() => {
  gameInstance?.destroy(false);
  location.reload();
});
</script>

<template>
  <div :id="containerId" />
</template>
