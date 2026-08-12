import { Tilemaps } from 'phaser';
import { BaseScene } from './BaseScene.ts';
import { requiredMaps } from '../../../resources/gameAssets/requiredMaps.ts';

export class MapScene extends BaseScene {
  protected tileSize = 32;
  protected tilemapWidth: number;
  protected tilemapHeight: number;
  protected tilemaps: Record<string, Tilemaps.Tilemap>;
  protected requiredTilesets: Record<string, string[][]>;
  protected requiredLayers: Record<string, string[]>;

  constructor(
    sceneKey: string,
    requiredTilesets: Record<string, string[][]>,
    requiredLayers: Record<string, string[]>
  ) {
    super(sceneKey);

    this.tilemaps = {};
    this.requiredTilesets = requiredTilesets;
    this.requiredLayers = requiredLayers;
    this.tilemapWidth = 19 * this.tileSize;
    this.tilemapHeight = 13 * this.tileSize;
  }

  #createTiledMaps(): void {
    const tilemaps: Record<string, Tilemaps.Tilemap> = {};

    for (const key in requiredMaps) {
      const requiredMap = requiredMaps[key];
      console.log('Create Map', requiredMap);

      tilemaps[key] = this.make.tilemap({
        key,
        tileWidth: this.tileSize,
        tileHeight: this.tileSize,
        width: this.tilemapWidth,
        height: this.tilemapHeight
      });
    }

    this.tilemaps = tilemaps;
  }

  #createTiledMapsLayers(): void {
    for (const key in requiredMaps) {
      const tiledMap = this.tilemaps[key];

      this.requiredTilesets[key].forEach(requiredTileset => {
        const tileset = tiledMap.addTilesetImage(requiredTileset[0], requiredTileset[1]);

        this.requiredLayers[key].forEach(layerKey => {
          tiledMap.createLayer(layerKey, tileset!, 0, 0);
        });
      });
    }
  }

  protected createMaps(): void {
    this.#createTiledMaps();
    this.#createTiledMapsLayers();
  }

  protected centerViewPort() {
    const mapWidth = this.tilemaps['cabp_office'].widthInPixels;
    const mapHeight = this.tilemaps['cabp_office'].heightInPixels;
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;
    const offsetX = ((gameWidth - mapWidth) / 2) + 12;
    const offsetY = (gameHeight - mapHeight) / 5;

    this.cameras.main.setViewport(offsetX, offsetY, mapWidth, mapHeight);
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
  }
}
