import { MapScene } from './MapScene.ts';
import { imagesKeys } from '../enums/imagesKeys.ts';
import { requiredSpritesheets } from '../../../resources/gameAssets/requiredSpritesheets.ts';
import type { SpritesheetDefinitionInterface } from '../interfaces/SpritesheetDefinitionInterface.ts';
import { characterAnimations } from '../enums/characterAnimations.ts';
import CharacterModel from '../models/characterModel/CharacterModel.ts';

export class IntroductionsScene extends MapScene {
  #spritesheetRefs: Record<string, SpritesheetDefinitionInterface>;
  public static key = 'IntroductionsScene';

  constructor() {
    super(
      IntroductionsScene.key,
      'house_front',
      ['house'],
      [
        [`${ imagesKeys.house }_tileset`, imagesKeys.house]
      ]
    );

    this.#spritesheetRefs = requiredSpritesheets;
  }

  #createAnimations(): void {
    Object.keys(this.#spritesheetRefs).forEach((key: string) => {
      const animKeyIdleDown = `${ key }-${ characterAnimations.idleDown }`;
      const animKeyWalkDown = `${ key }-${ characterAnimations.walkDown }`;

      // Idle down frame
      if (!this.anims.exists(animKeyIdleDown)) {
        this.anims.create({
          key: animKeyIdleDown,
          frames: [{ key, frame: 130 }],
          frameRate: 1
        });
      }

      // Downward walking animation
      if (!this.anims.exists(animKeyWalkDown)) {
        this.anims.create({
          key: animKeyWalkDown,
          frames: this.anims.generateFrameNumbers(key, { start: 130, end: 138 }),
          frameRate: 10,
          repeat: -1 // Loop infinitely while moving
        });
      }
    });
  }

  create() {
    this.createMap(this.mapKey);
    this.createLayers();
    this.centerViewPort();

    // Character
    this.#createAnimations();
    const candidate = new CharacterModel('mc', this);
    candidate.create();
  }
}
