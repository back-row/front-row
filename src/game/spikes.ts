import Phaser from 'phaser';
import spikeImg from './assets/map/props/spikes.png';
import spikeAtlas from './assets/map/props/spikes_atlas.json';
import spikeAnim from './assets/map/props/spikes_anim.json';

export default class Spikes extends Phaser.Physics.Arcade.Sprite {
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
    scene.load.atlas('spikes', spikeImg, spikeAtlas);
    scene.load.json('spikesAnim', spikeAnim);
  }

  create() {
    const animData = this.scene.cache.json.get('spikesAnim');
    this.scene.anims.fromJSON(animData);
    this.setImmovable(true);
    this.setScale(2);
  }

  update() {
    if (this.hideSpike && !this.spikeHidden) {
      this.anims.play('spike_lower', false);
      this.spikeHidden = true;
    } else if (!this.spikeHidden) {
      this.anims.play('spike_up', true);
    } else {
      this.anims.play('spike_down', false);
    }
  }
}
