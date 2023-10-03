<script setup lang="ts">
import { onMounted, type PropType } from 'vue';

type Location = { row: number; column: number };

const props = defineProps({
  startLocation: {
    type: Object as PropType<Location>,
    required: true
  }
});

onMounted(() => {
  console.log(
    'EndLocation mounted: ' +
      'row:' +
      props.startLocation.row +
      ' col:' +
      props.startLocation.column
  );
});
</script>
<template>
  <img
    ref="endLocation"
    id="endLocation"
    class="w-10"
    src="../../assets/icecream.png"
    alt="icecream"
    :style="{ gridRow: props.startLocation.row, gridColumn: props.startLocation.column }"
  />
</template>
