<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';
import darkModeBg from '@assets/darkmode.png';
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<template>
  <div class="md:block absolute top-2 right-52">
    <div
      class="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in"
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
        class="toggle-label icon block overflow-hidden h-6 rounded-full border shadow-md shadow-gray-700 cursor-pointer dark:border-none dark:shadow-none"
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
  border-color: #ffb300;
}
.icon {
  background: url('../assets/darkmode.png');
  background-size: cover;
  background-color: #ffb300;
  background-position: center;
}
</style>
