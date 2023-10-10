<script setup lang="ts">
import PhaserContainer from './PhaserContainer.vue';
</script>

<template>
  <Suspense>
    <PhaserContainer />

    <template #fallback>
      <div class="placeholder">Loading Game ...</div>
    </template>
  </Suspense>
</template>

<style scoped>
.placeholder {
  font-size: 2rem;
}
</style>
