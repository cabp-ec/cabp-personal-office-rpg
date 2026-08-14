import type { SpritesheetDefinitionInterface } from '../interfaces/SpritesheetDefinitionInterface.ts';
import { MapScene } from './MapScene.ts';
import CharacterModel from '../models/characterModel/CharacterModel.ts';

import FApp from '../index.ts';
import { imagesKeys } from '../enums/imagesKeys.ts';
import { requiredSpritesheets } from '../../../resources/gameAssets/requiredSpritesheets.ts';
import { characterAnimations } from '../enums/characterAnimations.ts';
import { dialoguesSet } from '../../../resources/staticData/dialoguesSet.ts';

export class GameScene extends MapScene {
  #spritesheetRefs: Record<string, SpritesheetDefinitionInterface>;
  public static key = 'GameScene';

  constructor() {
    super(
      GameScene.key,
      {
        /*house_front: [
          [`${ imagesKeys.house }_tileset`, imagesKeys.house]
        ],*/
        cabp_office: [
          [`${ imagesKeys.office }_tileset`, imagesKeys.office]
        ]
      },
      {
        // house_front: ['house'],
        cabp_office: ['limits', 'floor', 'walls', 'exit', 'furniture', 'assets']
      }
    );

    this.#spritesheetRefs = requiredSpritesheets;
  }

  #createCharacterAnimations(): void {
    Object.keys(this.#spritesheetRefs).forEach((key: string) => {
      const animKeyIdleDown = `${ key }-${ characterAnimations.idleDown }`;
      const animKeyWalkDown = `${ key }-${ characterAnimations.walkDown }`;
      const animKeyWalkUp = `${ key }-${ characterAnimations.walkUp }`;
      const animKeyWalkLeft = `${ key }-${ characterAnimations.walkLeft }`;
      const animKeyWalkRight = `${ key }-${ characterAnimations.walkRight }`;

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

      // Upward walking animation
      if (!this.anims.exists(animKeyWalkUp)) {
        this.anims.create({
          key: animKeyWalkUp,
          frames: this.anims.generateFrameNumbers(key, { start: 104, end: 112 }),
          frameRate: 10,
          repeat: -1 // Loop infinitely while moving
        });
      }

      // Leftward walking animation
      if (!this.anims.exists(animKeyWalkLeft)) {
        this.anims.create({
          key: animKeyWalkLeft,
          frames: this.anims.generateFrameNumbers(key, { start: 117, end: 125 }),
          frameRate: 10,
          repeat: -1 // Loop infinitely while moving
        });
      }

      // Rightward walking animation
      if (!this.anims.exists(animKeyWalkRight)) {
        this.anims.create({
          key: animKeyWalkRight,
          frames: this.anims.generateFrameNumbers(key, { start: 143, end: 151 }),
          frameRate: 10,
          repeat: -1 // Loop infinitely while moving
        });
      }
    });
  }

  async #createCharacter(): Promise<void> {
    console.log('Create Character');

    this.#createCharacterAnimations();
    this.character = new CharacterModel('mc', this, FApp.store, dialoguesSet);
    const tile = this.map.getTileAt(2, 3, false, 'floor')!;
    this.character.create(tile.getLeft(), tile.getTop());
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.character.startDialogue();
  }

  public create() {
    console.warn('CREATE');

    this.createMaps();
    this.createPathFinder();
    this.centerViewPort();
    void this.#createCharacter();
  }

  get candidate(): CharacterModel {
    return this.character;
  }
}
