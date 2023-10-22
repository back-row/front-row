import Phaser from 'phaser';
import executionerImg from './assets/characters/executioner.png';
import executionerAtlas from './assets/characters/executioner_atlas.json';
import executionerAnim from './assets/characters/executioner_anim.json';

export default class Executioner extends Phaser.Physics.Arcade.Sprite {
  hideSpike = false;
  spikeHidden = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture
  ) {
    super(scene, x, y, texture);
    this.scene.add.existing(this);
    scene.physics.world.enable(this);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('executioner', executionerImg, executionerAtlas);
    scene.load.json('executioner_anim', executionerAnim);
  }

  create() {
    const executionerAnimData = this.scene.cache.json.get('executioner_anim');
    this.scene.anims.fromJSON(executionerAnimData);

    this.setImmovable(true);
    this.setCircle(16, 0, 4);
    this.anims.play('executioner_idle');
  }

  update() {}
}
