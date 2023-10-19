import 'phaser';
import Player from '../player';
import { usePlayerStore } from '@/stores/player';
import { useMapStore } from '@/stores/map';
import Finish from '../finish';
import tilesetImport from '../assets/map/tiles/DungeonPrison/Tiles.png';
import tilesetImportProps from '../assets/map/tiles/DungeonPrison/Props.png';
const mapPath = 'src/game/assets/map/maps/';
const MAX_SCORE = 100;

const playerStore = usePlayerStore();

export default class MainScene extends Phaser.Scene {
  player: Player | undefined;
  finish: Finish | undefined;

  private mapStore: ReturnType<typeof useMapStore>;

  constructor() {
    super({ key: 'MainScene' });

    this.mapStore = useMapStore();
  }

  preload() {
    const mapStore = useMapStore();
    Player.preload(this);
    Finish.preload(this);

    this.load.image('tiles', tilesetImport);
    this.load.image('props', tilesetImportProps);

    this.load.tilemapTiledJSON('map', `${mapPath}${mapStore.map.mapJSON}.json`);
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

    if (this.mapStore.map.reset) {
      this.scene.restart();
      this.mapStore.map.reset = false;
      this.mapStore.map.score = MAX_SCORE;
    }
  }
}
