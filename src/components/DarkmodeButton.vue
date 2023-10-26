<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<template>
  <div class="absolute top-2 right-60">
    <label for="toggle" class="text-xs dark:text-white pr-2">Toggle Darkmode.</label>
    <div
      class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
    >
      <input
        @input="toggleDark()"
        v-model="isDark"
        type="checkbox"
        name="toggle"
        id="toggle"
        class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-gray-400 border-4 appearance-none cursor-pointer dark:bg-gray-800"
      />
      <label
        for="toggle"
        class="toggle-label block overflow-hidden h-6 rounded-full bg-white border shadow-md shadow-cyan-600 cursor-pointer dark:border-none dark:shadow-none"
      ></label>
    </div>
  </div>
</template>
<style scoped>
.toggle-checkbox:checked {
  right: 0;
  border-color: #ffb300;
}

.toggle-checkbox:checked + .toggle-label {
  background-color: #ffb300;
}
</style>
