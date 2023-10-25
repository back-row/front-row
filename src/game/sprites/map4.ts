import Phaser from 'phaser';
import coinImg from '../assets/map/props/coin.png';
import coinAtlas from '../assets/map/props/coin_atlas.json';
import coinAnim from '../assets/map/props/coin_anim.json';
import { useMapStore } from '@/stores/map';
import Executioner from './executioner';

const mapStore = useMapStore();
let coins = 0;

export default class Map4 extends Phaser.Physics.Arcade.Sprite {
  hideSpike = false;
  spikeHidden = false;
  executioner: Executioner | undefined;

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
    Executioner.preload(scene);
  }

  create(player: Phaser.Physics.Arcade.Sprite) {
    this.executioner = new Executioner(this.scene, 400, 180, 'executioner');
    this.executioner.create();
    this.scene.physics.add.collider(player, this.executioner, () => {
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
      return (coin as any).setCircle(8);
    });

    coinsBottom.children.iterate((coin) => {
      return (coin as any).setCircle(8);
    });

    this.scene.physics.add.overlap(player, coinsTop, collectCoin, undefined, this);
    this.scene.physics.add.overlap(player, coinsBottom, collectCoin, undefined, this);
  }

  update() {
    if (coins === 4 && mapStore.map.bribeGuard) {
      this.scene.tweens.add({
        targets: this.executioner!,
        x: 300,
        duration: 2000,
        ease: 'linear',
        repeat: 0
      });
    }
  }
}
function collectCoin(player: any, coin: any) {
  mapStore.map.touchCoin = true;
  if (mapStore.map.collectCoin) {
    coins += 1;
    mapStore.map.collectCoin = false;
    mapStore.map.touchCoin = false;
    coin.disableBody(true, true);
  }
}
