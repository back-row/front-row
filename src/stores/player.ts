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
        await sleepyWork();
        break;
      case 'down':
        moveDown();
        await sleepyWork();
        break;
      case 'left':
        moveLeft();
        await sleepyWork();
        break;
      case 'right':
        moveRight();
        await sleepyWork();
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
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  async function sleepyWork() {
    console.log("I'm going to sleep for 1 second.");
    await sleep(1000);
    console.log('I woke up after 1 second.');
  }
  return { playerPosition, movePlayer };
});
