import { AUTO, Game as PhaserGame, Scale, type Types } from 'phaser';
import type { ServiceInterface } from '../interfaces/ServiceInterface.ts';
import { PreloadScene } from '../scenes/PreloadScene.ts';
import { GameScene } from '../scenes/GameScene.ts';

export class GameService implements ServiceInterface {
  #game!: PhaserGame;
  readonly #gameConfig: Types.Core.GameConfig;
  #initialized = false;

  constructor() {
    this.#gameConfig = {
      type: AUTO,
      scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH
      },
      physics: {
        default: 'arcade',
        arcade: { debug: false }
      },
      transparent: true,
      width: 1024,
      height: 768
    };
  }

  initialize(el: HTMLDivElement): void {
    if (this.#game) {
      return;
    }

    this.#gameConfig.parent = el;
    this.#gameConfig.width = el.offsetWidth;
    this.#gameConfig.height = el.offsetHeight;
    this.#gameConfig.scene = [
      new PreloadScene(),
      new GameScene()
    ];

    this.#game = new PhaserGame(this.#gameConfig);
    this.#game.scene.stop(PreloadScene.key);

    this.#initialized = true;
    console.log('Game Service initialized');
  }

  getScene<T>(key: string): T {
    return this.#game.scene.getScene(key) as T;
  }

  destroy(): void {
    if (this.#game) {
      this.#game.destroy(true);
    }
  }

  initialized(): boolean {
    return this.#initialized;
  }
}
