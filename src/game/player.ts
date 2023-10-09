import Phaser from 'phaser';
import kingimg from './assets/characters/king.png';
import kingatlas from './assets/characters/king_atlas.json';
import kinganim from './assets/characters/king_anim.json';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame: string | number | undefined
  ) {
    super(scene, x, y, texture, frame);
    this.scene.add.existing(this);
    scene.physics.world.enable(this);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('king', kingimg, kingatlas);
    scene.load.json('kinganim', kinganim);
  }

  create() {
    const animData = this.scene.cache.json.get('kinganim');
    this.scene.anims.fromJSON(animData);
  }

  update() {
    if (Math.abs(this.body.velocity.x) > 0 || Math.abs(this.body.velocity.y) > 0) {
      this.anims.play('walk', true);
    } else {
      this.anims.play('idle', true);
    }
  }
}