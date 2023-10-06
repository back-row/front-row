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
    mapId: 1,
    atEnd: false
  });

  const moveUp = async () => {
    if (playerPosition.value.row !== BORDER_TOP) {
      playerPosition.value.row--;
    }
  };

  const moveDown = async () => {
    if (playerPosition.value.row !== BORDER_BOTTOM) {
      playerPosition.value.row++;
    }
  };

  const moveLeft = async () => {
    if (playerPosition.value.column !== BORDER_LEFT) {
      playerPosition.value.column--;
    }
  };

  const moveRight = async () => {
    if (playerPosition.value.column !== BORDER_RIGHT) {
      playerPosition.value.column++;
    }
  };

  const movePlayer = async (direction: Direction) => {
    console.log('movePlayer', direction);

    switch (direction) {
      case 'up':
        await moveUp();
        break;
      case 'down':
        await moveDown();
        break;
      case 'left':
        await moveLeft();
        break;
      case 'right':
        await moveRight();
        break;
    }
    await updatePlayerPosition();
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

    playerPosition.value.atEnd = data;
    console.log('Player at end location: ', data);
  }

  return { playerPosition, movePlayer };
});
