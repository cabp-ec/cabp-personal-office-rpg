import { Loader } from 'phaser';
import type { SpritesheetDefinitionInterface } from '../interfaces/SpritesheetDefinitionInterface.ts';
import type { AssetDefinitionInterface } from '../interfaces/gameAssets/AssetDefinitionInterface.ts';
import { BaseScene } from './BaseScene.ts';
import { GameScene } from './GameScene.ts';
import { requiredImages } from '../../../resources/gameAssets/requiredImages.ts';
import { requiredSpritesheets } from '../../../resources/gameAssets/requiredSpritesheets.ts';
import { requiredMaps } from '../../../resources/gameAssets/requiredMaps.ts';

export class PreloadScene extends BaseScene {
  #imageRefs: Record<string, SpritesheetDefinitionInterface>;
  #spritesheetRefs: Record<string, SpritesheetDefinitionInterface>;
  #tiledMapRefs: Record<string, AssetDefinitionInterface>;
  public static key = 'PreloadScene';

  constructor() {
    super(PreloadScene.key);

    this.#imageRefs = requiredImages;
    this.#spritesheetRefs = requiredSpritesheets;
    this.#tiledMapRefs = requiredMaps;
  }

  #setPreloadEventListeners() {
    this.load.on(Loader.Events.PROGRESS, (value: number) => {
      value = Math.ceil(value * 100);
      console.log('Loading:', value);
    });

    this.load.on(Loader.Events.COMPLETE, () => {
      console.warn('START "INTRODUCTIONS" SCENE');
      this.switchScenes(PreloadScene.key, GameScene.key);
    });
  }

  preload() {
    this.#setPreloadEventListeners();

    // Images
    Object.keys(this.#imageRefs).forEach((key: string) => {
      const value = this.#imageRefs[key];
      this.load.image(key, value.asset);
    });

    // Spritesheets
    Object.keys(this.#spritesheetRefs).forEach((key: string) => {
      const value = this.#spritesheetRefs[key];
      this.load.spritesheet(key, value.asset, value.frameConfig);
    });

    // Tiled Maps
    Object.keys(this.#tiledMapRefs).forEach((key: string) => {
      const value = this.#tiledMapRefs[key];
      this.load.tilemapTiledJSON(key, value.asset);
    });
  }

  create() {
    this.shutDownEventListeners();
  }
}
