import { Tilemaps } from 'phaser';
import { BaseScene } from './BaseScene.ts';

export class MapScene extends BaseScene {
  protected tileSize = 32;
  protected mapKey: string;
  protected tilemapWidth: number;
  protected tilemapHeight: number;
  protected tilemap!: Tilemaps.Tilemap;
  protected layerKeys: string[];
  protected requiredTilesets: string[][];

  constructor(sceneKey: string, mapKey: string, layerKeys: string[], requiredTilesets: string[][]) {
    super(sceneKey);

    this.mapKey = mapKey;
    this.layerKeys = layerKeys;
    this.requiredTilesets = requiredTilesets;
    this.tilemapWidth = 19 * this.tileSize;
    this.tilemapHeight = 13 * this.tileSize;
  }

  protected createMap(key: string): void {
    this.tilemap = this.make.tilemap({
      key,
      tileWidth: this.tileSize,
      tileHeight: this.tileSize,
      width: this.tilemapWidth,
      height: this.tilemapHeight
    });
  }

  protected createLayers(): void {
    const layers = [];

    this.requiredTilesets.forEach(requiredTileset => {
      const tileset = this.tilemap.addTilesetImage(requiredTileset[0], requiredTileset[1]);

      this.layerKeys.forEach(layerKey => {
        layers.push(this.tilemap.createLayer(layerKey, tileset!, 0, 0));
      });
    });
  }

  protected centerViewPort() {
    const mapWidth = this.tilemap.widthInPixels;
    const mapHeight = this.tilemap.heightInPixels;
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;
    const offsetX = (gameWidth - mapWidth) / 2;
    const offsetY = (gameHeight - mapHeight) / 2;

    this.cameras.main.setViewport(offsetX, offsetY, mapWidth, mapHeight);
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
  }
}
