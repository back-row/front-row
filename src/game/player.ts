import Phaser from 'phaser';
import { usePlayerStore } from '@/stores/player';
import { useUserStore } from '@/stores/user';
const characterPath = 'src/game/assets/characters/';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private playerStore: ReturnType<typeof usePlayerStore>;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture
  ) {
    super(scene, x, y, texture);
    this.scene.add.existing(this);
    scene.physics.world.enable(this);
    this.playerStore = usePlayerStore();
  }

  static preload(scene: Phaser.Scene) {
    const userStore = useUserStore();
    scene.load.atlas(
      `${userStore.user.avatar}`,
      `${characterPath}${userStore.user.avatar}.png`,
      `${characterPath}${userStore.user.avatar}_atlas.json`
    );
    scene.load.json('playeranim', `${characterPath}${userStore.user.avatar}_anim.json`);
  }

  create() {
    const animData = this.scene.cache.json.get('playeranim');
    this.scene.anims.fromJSON(animData);
    this.body?.setCircle(12, 5, 8);
    this.setCollideWorldBounds(true);
  }

  update() {
    const velocityX = this.body!.velocity.x;
    const velocityY = this.body!.velocity.y;

    let animationKey = 'down';

    if (Math.abs(velocityX) > Math.abs(velocityY)) {
      if (velocityX > 0) {
        animationKey = 'right';
      } else if (velocityX < 0) {
        animationKey = 'left';
      }
    } else {
      if (velocityY > 0) {
        animationKey = 'down';
      } else if (velocityY < 0) {
        animationKey = 'up';
      }
    }

    this.anims.play(animationKey, true);

    this.playerStore.playerPosition.x = this.x;
    this.playerStore.playerPosition.y = this.y;
  }
}
