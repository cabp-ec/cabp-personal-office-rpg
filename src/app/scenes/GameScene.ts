import { MapScene } from './MapScene.ts';

import type { SpritesheetDefinitionInterface } from '../interfaces/SpritesheetDefinitionInterface.ts';
import CharacterModel from '../models/characterModel/CharacterModel.ts';
import { imagesKeys } from '../enums/imagesKeys.ts';
import { requiredSpritesheets } from '../../../resources/gameAssets/requiredSpritesheets.ts';
import { characterAnimations } from '../enums/characterAnimations.ts';
import FApp from '../index.ts';
import { dialoguesSet } from '../../../resources/staticData/dialoguesSet.ts';

export class GameScene extends MapScene {
  #spritesheetRefs: Record<string, SpritesheetDefinitionInterface>;
  #character!: CharacterModel;
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
        cabp_office: ['limits', 'floor', 'walls', 'exit', 'forniture', 'assets']
      }
    );

    this.#spritesheetRefs = requiredSpritesheets;
  }

  #createCharacterAnimations(): void {
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

  async #createCharacter(): Promise<void> {
    console.log('Create Character');
    this.#createCharacterAnimations();
    this.#character = new CharacterModel('mc', this, FApp.store, dialoguesSet);
    const tile = this.tilemaps['cabp_office'].getTileAt(2, 3, false, 'floor')!;
    this.#character.create(tile.getLeft(), tile.getTop());
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.#character.startDialogue();
  }

  public create() {
    console.warn('CREATE');
    this.createMaps();
    this.centerViewPort();
    void this.#createCharacter();
  }

  get candidate(): CharacterModel {
    return this.#character;
  }
}
