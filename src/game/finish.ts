import Phaser from 'phaser';
import princessImg from './assets/characters/princess.png';
import princessAtlas from './assets/characters/princess_atlas.json';
import princessAnim from './assets/characters/princess_anim.json';
import { usePlayerStore } from '@/stores/player';

export default class Finish extends Phaser.Physics.Arcade.Sprite {
  private playerStore: ReturnType<typeof usePlayerStore>;

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

    this.playerStore = usePlayerStore();
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('princess', princessImg, princessAtlas);
    scene.load.json('princessAnim', princessAnim);
  }

  create() {
    const animData = this.scene.cache.json.get('princessAnim');
    this.scene.anims.fromJSON(animData);
    console.log('finish created');
    this.setImmovable(true);
    this.body?.setCircle(8, 8, 16);

    this.setScale(1.5);
  }

  update() {
    if (Math.abs(this.body!.velocity.x) > 0 || Math.abs(this.body!.velocity.y) > 0) {
      this.anims.play('princess_walk', true);
    } else {
      this.anims.play('princess_idle', true);
    }
  }
}
