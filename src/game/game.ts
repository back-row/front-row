import Phaser from 'phaser';
import MainScene from './scenes/MainScene';

function launch(containerId: string) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: { y: 0 }
      }
    },
    scene: [MainScene]
  });
}

export default launch;
export { launch };
