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
  const moveUp = () => {
    if (playerPosition.value.row !== BORDER_TOP) {
      playerPosition.value.row--;
    }
  };

  const moveDown = () => {
    if (playerPosition.value.row !== BORDER_BOTTOM) {
      playerPosition.value.row++;
    }
  };

  const moveLeft = () => {
    if (playerPosition.value.column !== BORDER_LEFT) {
      playerPosition.value.column--;
    }
  };

  const moveRight = () => {
    if (playerPosition.value.column !== BORDER_RIGHT) {
      playerPosition.value.column++;
    }
  };

  return { playerPosition, moveUp, moveDown, moveLeft, moveRight };
});
