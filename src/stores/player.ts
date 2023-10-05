import { defineStore } from 'pinia';
import { ref } from 'vue';

const [BORDER_LEFT, BORDER_TOP] = [1, 1];
const [BORDER_RIGHT, BORDER_BOTTOM] = [11, 11];

enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
}
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

  const movePlayer = async (direction: Direction) => {
    console.log('movePlayer', direction);

    switch (direction) {
      case 'up':
        moveUp();
        break;
      case 'down':
        moveDown();
        break;
      case 'left':
        moveLeft();
        break;
      case 'right':
        moveRight();
        break;
    }
    updatePlayerPosition();
  };

  async function updatePlayerPosition() {
    console.log('playerPosition: ', playerPosition.value);
    console.log('playerPosition sent to backend');
    const response = await fetch('http://localhost:8000/player', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerPosition.value)
    });
    const data = await response.json();
    console.log('Player at end location: ', data);
  }

  return { playerPosition, movePlayer };
});
