import 'phaser';
import playerimg from '../assets/yellowPlayer_nobg.png';
export default class MainScene extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Sprite | undefined;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('player', playerimg);
  }

  create() {
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(0.2);

    this.input.keyboard.on('keydown', (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          this.player?.setVelocityY(-200);
          break;
        case 'ArrowDown':
          this.player?.setVelocityY(200);
          break;
        case 'ArrowLeft':
          this.player?.setVelocityX(-200);
          break;
        case 'ArrowRight':
          this.player?.setVelocityX(200);
          break;
      }
    });

    this.input.keyboard.on('keyup', () => {
      this.player?.setVelocity(0);
    });
  }

  update() {}
}
