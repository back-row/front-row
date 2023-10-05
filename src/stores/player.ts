import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

const [BORDER_LEFT, BORDER_TOP] = [1, 1];
const [BORDER_RIGHT, BORDER_BOTTOM] = [11, 11];

export const usePlayerStore = defineStore('player', () => {
  const playerPosition = ref({
    row: BORDER_LEFT,
    column: BORDER_TOP,
    //TODO: get mapId from ? player status?
    mapId: 1
  });

  return { playerPosition };
});
