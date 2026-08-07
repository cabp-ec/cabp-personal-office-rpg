import { Scene as PhaserScene, Scenes, Input } from 'phaser';
import { preloadableObjects, type PreloadableObjectType } from '../enums/preloadableObjects.ts';

export abstract class BaseScene extends PhaserScene {
  public static width = 1400;
  public static height = 1050;

  protected constructor(key: string) {
    super({ key });
  }

  protected switchScenes(from: string, to: string): void {
    this.scene.stop(from);
    this.scene.start(to);
  }

  shutDownEventListeners(): void {
    this.events.on(Scenes.Events.SHUTDOWN, () => {
      this.input.off(Input.Events.POINTER_DOWN);
      this.input.off(Input.Events.POINTER_MOVE);
      this.input.off(Input.Events.POINTER_UP);
      this.input.off(Input.Events.POINTER_WHEEL);
    });
  }

  /**
   * Preload a single asset
   *
   * @param key
   * @param assetType
   * @param url
   */
  preloadAsset(key: string, assetType: PreloadableObjectType, url: string): void {
    switch (assetType) {
      case preloadableObjects.image:
        this.load.image(key, url);
        break;
      case preloadableObjects.tilemapTiledJSON:
        this.load.tilemapTiledJSON(key, url);
        break;
      case preloadableObjects.json:
        break;
      case preloadableObjects.animations:
        this.load.animation(key, url);
        break;
      default:
        return;
    }
  }
}
