import 'phaser';
import Player from '../player';
import { usePlayerStore } from '@/stores/player';
const playerStore = usePlayerStore();

export default class MainScene extends Phaser.Scene {
  player: Player | undefined;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    Player.preload(this);
  }

  create() {
    this.player = new Player(this, 0, 0, 'king', 'king_idle_1');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(1.5);
    this.player.create();
    playerStore.playerPosition.player = this.player;

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

  update() {
    this.player?.update();
  }
}
