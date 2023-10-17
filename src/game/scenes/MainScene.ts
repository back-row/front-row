import 'phaser';
import Player from '../player';
import { usePlayerStore } from '@/stores/player';
import { useMapStore } from '@/stores/map';
import Finish from '../finish';
import tilesetImport from '../assets/map/tiles/DungeonPrison/Tiles.png';
import tilesetImportProps from '../assets/map/tiles/DungeonPrison/Props.png';
import mapImport from '../assets/map/tiles/DungeonPrison/mapOne.json';

const playerStore = usePlayerStore();
const mapStore = useMapStore();

export default class MainScene extends Phaser.Scene {
  player: Player | undefined;
  finish: Finish | undefined;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    Player.preload(this);
    Finish.preload(this);

    this.load.image('tiles', tilesetImport);
    this.load.image('props', tilesetImportProps);

    this.load.tilemapTiledJSON('map', mapImport);
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('Tiles', 'tiles');
    const props = map.addTilesetImage('Props', 'props');

    // TODO:rename layers
    const ground = map.createLayer('Layer1', tileset!, 0, 0);
    const layer2 = map.createLayer('Layer2', tileset!, 0, 0);
    const layer3 = map.createLayer('Layer3', props!, 0, 0);

    layer2!.setCollisionByProperty({ collides: true });
    layer3!.setCollisionByProperty({ collides: true });

    this.player = new Player(this, 50, 70, 'player');
    this.finish = new Finish(
      this,
      mapStore.map.endLocationX,
      mapStore.map.endLocationY,
      'princess',
      'princess_idle_1'
    );

    playerStore.playerPosition.player = this.player;

    this.player.create();
    this.finish.create();
    if (layer2) {
      this.physics.add.collider(this.player, layer2);
    }
    if (layer3) {
      this.physics.add.collider(this.player, layer3);
    }
    this.physics.add.collider(this.player, this.finish, () => {
      this.scene.pause('MainScene');
      mapStore.updateMapScore(mapStore.map.score, mapStore.map.id);
      mapStore.map.score = 100;
      setTimeout(() => {
        playerStore.playerPosition.atEnd = true;
      }, 1500);
    });

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
  }
}
