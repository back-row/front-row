import Player from '@/game/player';
import { defineStore } from 'pinia';
import { ref } from 'vue';

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
    await new Promise((resolve) => setTimeout(resolve, 500));
    playerPosition.value.player!.setVelocity(0);
  };

  return { playerPosition, movePlayer };
});
