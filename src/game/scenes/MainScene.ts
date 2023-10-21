import 'phaser';
import Player from '../player';
import { usePlayerStore } from '@/stores/player';
import { useMapStore } from '@/stores/map';
import Finish from '../finish';
import Spikes from '../spikes';
import tilesetImport from '../assets/map/tiles/DungeonPrison/Tiles.png';
import tilesetImportProps from '../assets/map/tiles/DungeonPrison/Props.png';

import coinImg from '../assets/map/props/coin.png';
import coinAtlas from '../assets/map/props/coin_atlas.json';
import coinAnim from '../assets/map/props/coin_anim.json';

const mapPath = 'src/game/assets/map/maps/';
const MAX_SCORE = 100;
let coins = 0;

const playerStore = usePlayerStore();

export default class MainScene extends Phaser.Scene {
  player: Player | undefined;
  finish: Finish | undefined;
  spike: Spikes | undefined;
  spike2: Spikes | undefined;
  spikecolliders: Phaser.Physics.Arcade.Collider[] | undefined;

  private mapStore: ReturnType<typeof useMapStore>;

  constructor() {
    super({ key: 'MainScene' });

    this.mapStore = useMapStore();
  }

  preload() {
    const mapStore = useMapStore();
    Player.preload(this);
    Finish.preload(this);
    Spikes.preload(this);

    this.load.image('tiles', tilesetImport);
    this.load.image('props', tilesetImportProps);

    this.load.tilemapTiledJSON('map', `${mapPath}${mapStore.map.mapJSON}.json`);

    this.load.atlas('coin', coinImg, coinAtlas);
    this.load.json('coin_anim', coinAnim);
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('Tiles', 'tiles');
    const props = map.addTilesetImage('Props', 'props');

    const ground = map.createLayer('Layer1', tileset!, 0, 0);
    const layer2 = map.createLayer('Layer2', tileset!, 0, 0);
    const layer3 = map.createLayer('Layer3', props!, 0, 0);

    layer2!.setCollisionByProperty({ collides: true });
    layer3!.setCollisionByProperty({ collides: true });

    const coinsTop = this.physics.add.group({
      key: 'coin',
      repeat: 1,
      setXY: { x: 200, y: 200, stepX: 400 }
    });
    const coinsBottom = this.physics.add.group({
      key: 'coin',
      repeat: 1,
      setXY: { x: 200, y: 400, stepX: 400 }
    });
    const animData = this.cache.json.get('coin_anim');
    this.anims.fromJSON(animData);

    coinsTop.playAnimation('rotate');
    coinsBottom.playAnimation('rotate');

    coinsTop.children.iterate((coin) => {
      coin.setCircle(8);
    });

    coinsBottom.children.iterate((coin) => {
      coin.setCircle(8);
    });

    const collectCoin = (player: Player, coin: Phaser.Physics.Arcade.Sprite) => {
      coin.disableBody(true, true);
      coins += 1;
    };

    this.player = new Player(
      this,
      this.mapStore.map.startLocationX,
      this.mapStore.map.startLocationY,
      'player'
    );
    this.finish = new Finish(
      this,
      this.mapStore.map.endLocationX,
      this.mapStore.map.endLocationY,
      'princess',
      'princess_idle_1'
    );

    playerStore.playerPosition.player = this.player;
    this.player.create();
    this.finish.create();

    this.physics.add.overlap(this.player, coinsTop, collectCoin, undefined, this);
    this.physics.add.overlap(this.player, coinsBottom, collectCoin, undefined, this);

    if (layer2) {
      this.physics.add.collider(this.player, layer2);
    }
    if (layer3) {
      this.physics.add.collider(this.player, layer3);
    }
    this.physics.add.collider(this.player, this.finish, () => {
      this.scene.pause('MainScene');
      this.mapStore.updateMapScore(this.mapStore.map.score, this.mapStore.map.id);
      this.mapStore.map.score = MAX_SCORE;
      setTimeout(() => {
        playerStore.playerPosition.atEnd = true;
      }, 1500);
    });

    if (this.mapStore.map.id === 5) {
      this.spike = new Spikes(this, 295, 285, 'spikes');
      this.spike2 = new Spikes(this, 295, 305, 'spikes');
      this.spike.create();
      this.spike2.create();
      this.spikecolliders = [];
      this.spikecolliders.push(this.physics.add.collider(this.player, this.spike));
      this.spikecolliders.push(this.physics.add.collider(this.player, this.spike2));
    }
    // this is for testing
    this.input.keyboard!.on('keydown', (event: KeyboardEvent) => {
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

    this.input.keyboard!.on('keyup', () => {
      this.player?.setVelocity(0);
    });
  }

  update() {
    this.player?.update();
    this.finish?.update();
    if (coins === 4) {
      console.log('you win');
    }

    if (this.mapStore.map.id === 5) {
      this.spike?.update();
      this.spike2?.update();
      if (playerStore.playerPosition.hideSpikes) {
        this.spike!.hideSpike = true;
        this.spike2!.hideSpike = true;
        this.spikecolliders?.forEach((collider) => {
          this.physics.world.removeCollider(collider);
        });
        this.spikecolliders = [];
        playerStore.playerPosition.hideSpikes = false;
      }

      if (this.mapStore.map.reset) {
        this.scene.restart();
        this.mapStore.map.reset = false;
        this.mapStore.map.score = MAX_SCORE;
      }
    }
  }
}
