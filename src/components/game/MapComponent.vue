<script setup lang="ts">
import { onMounted, type PropType } from 'vue';

type Location = { row: number; column: number };

const props = defineProps({
  endLocation: {
    type: Object as PropType<Location>,
    required: true
  }
});

onMounted(() => {
  console.log(
    'EndLocation mounted: ' + 'row:' + props.endLocation.row + ' col:' + props.endLocation.column
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
    :style="{ gridRow: props.endLocation.row, gridColumn: props.endLocation.column }"
  />
</template>
