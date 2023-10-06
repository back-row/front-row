<script setup lang="ts">
import { onMounted, ref } from 'vue';


type Map = {
  mapid: number;
  mapdifficulty: number;
  mapisquiz: boolean;
  mapquizid: number;
  mapendlocationrow: number;
  mapendlocationcolumn: number;
  maptutorialid: number;
};

const currentMap = ref<Map>({
  mapid: 0,
  mapdifficulty: 0,
  mapisquiz: false,
  mapquizid: 0,
  mapendlocationrow: 6,
  mapendlocationcolumn: 6,
  maptutorialid: 0
});

const props = defineProps({
  mapId: {
    type: Number,
    required: true
  }
});

onMounted(async () => {
  currentMap.value = await getMap(props.mapId);
  console.log(
    'EndLocation mounted: ' +
      'row:' +
      currentMap.value.mapendlocationrow +
      ' col:' +
      currentMap.value.mapendlocationcolumn
  );
});

async function getMap(id: number) {
  try {
    const response = await fetch('http://localhost:8000/map/' + id);
    return await response.json();
  } catch (error) {
    console.log(error);
    console.log('Could not get map setting to default location (6,6)');
  }
}
</script>
<template>
  <img
    ref="endLocation"
    id="endLocation"
    class="w-10"
    src="../../assets/treasureChest_nobg.png"
    alt="treasure chest"
    :style="{ gridRow: currentMap.mapendlocationrow, gridColumn: currentMap.mapendlocationcolumn }"
  />
</template>
