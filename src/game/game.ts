import Phaser from 'phaser';
import BootScene from '@/game/scenes/BootScene';
import PlayScene from '@/game/scenes/PlayScene';

function launch(containerId: string) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: containerId,
    scene: [BootScene, PlayScene]
  });
}

export default launch;
export { launch };
