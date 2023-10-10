import Player from '@/game/player';
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
    player: null as Player | null,
    x: 0,
    y: 0,
    row: BORDER_LEFT,
    column: BORDER_TOP,
    //TODO: get mapId from ? player status?
    mapId: 1,
    atEnd: false
  });

  const moveUp = async () => {
    if (playerPosition.value.player) playerPosition.value.player.setVelocityY(-200);
  };

  const moveDown = async () => {
    if (playerPosition.value.player) playerPosition.value.player.setVelocityY(200);
  };

  const moveLeft = async () => {
    if (playerPosition.value.player) playerPosition.value.player.setVelocityX(-200);
  };

  const moveRight = async () => {
    if (playerPosition.value.player) playerPosition.value.player.setVelocityX(200);
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
