import 'phaser';
import kingimg from '../assets/characters/king.png';
import kingjson from '../assets/characters/king_atlas.json';
import kinganim from '../assets/characters/king_anim.json';

export default class MainScene extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Sprite | undefined;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.atlas('king', kingimg, kingjson);
    // this.load.animation('player_anim', kinganim);
    this.load.json('king_anim', kinganim);
  }

  create() {
    this.player = this.physics.add.sprite(400, 300, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(1.5);
    // Load animation data from the loaded JSON
    const animData = this.cache.json.get('king_anim');
    this.anims.fromJSON(animData);

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
    this.player?.anims.play('walk', true);
  }
}
