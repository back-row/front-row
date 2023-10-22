import Phaser from 'phaser';
import coinImg from './assets/map/props/coin.png';
import coinAtlas from './assets/map/props/coin_atlas.json';
import coinAnim from './assets/map/props/coin_anim.json';
import executionerImg from './assets/characters/executioner.png';
import executionerAtlas from './assets/characters/executioner_atlas.json';
import executionerAnim from './assets/characters/executioner_anim.json';
import { useMapStore } from '@/stores/map';

const mapStore = useMapStore();
let coins = 0;
let executioner = null;

export default class Map4 extends Phaser.Physics.Arcade.Sprite {
  hideSpike = false;
  spikeHidden = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture
  ) {
    super(scene, x, y, texture);
  }

  static preload(scene: Phaser.Scene) {
    scene.load.atlas('coin', coinImg, coinAtlas);
    scene.load.json('coin_anim', coinAnim);
    scene.load.atlas('executioner', executionerImg, executionerAtlas);
    scene.load.json('executioner_anim', executionerAnim);
  }

  create(player: Phaser.Physics.Arcade.Sprite) {
    const executionerAnimData = this.scene.cache.json.get('executioner_anim');
    this.scene.anims.fromJSON(executionerAnimData);
    executioner = this.scene.physics.add
      .sprite(400, 180, 'executioner')
      .anims.play('executioner_idle');
    executioner.setImmovable(true);
    executioner.setCircle(16, 0, 4);
    this.scene.physics.add.collider(player, executioner, () => {
      mapStore.map.touchGuard = true;
    });

    const coinsTop = this.scene.physics.add.group({
      key: 'coin',
      repeat: 1,
      setXY: { x: 200, y: 180, stepX: 400 }
    });
    const coinsBottom = this.scene.physics.add.group({
      key: 'coin',
      repeat: 1,
      setXY: { x: 200, y: 350, stepX: 400 }
    });
    const coinAnimData = this.scene.cache.json.get('coin_anim');
    this.scene.anims.fromJSON(coinAnimData);

    coinsTop.playAnimation('rotate');
    coinsBottom.playAnimation('rotate');

    coinsTop.children.iterate((coin) => {
      coin.setCircle(8);
    });

    coinsBottom.children.iterate((coin) => {
      coin.setCircle(8);
    });

    this.scene.physics.add.overlap(player, coinsTop, collectCoin, undefined, this);
    this.scene.physics.add.overlap(player, coinsBottom, collectCoin, undefined, this);
  }

  update() {
    if (coins === 4 && mapStore.map.bribeGuard) {
      this.scene.tweens.add({
        targets: executioner!,
        x: 300,
        duration: 2000,
        ease: 'linear',
        repeat: 0
      });
    }
  }
}
function collectCoin(player, coin) {
  mapStore.map.touchCoin = true;
  if (mapStore.map.collectCoin) {
    coins += 1;
    mapStore.map.collectCoin = false;
    mapStore.map.touchCoin = false;
    coin.disableBody(true, true);
  }
}
