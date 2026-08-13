import EasyStar from 'easystarjs';
import { type Types, Geom, GameObjects, Input } from 'phaser';
import { Tilemaps } from 'phaser';
import { BaseScene } from './BaseScene.ts';

import FApp from '../index.ts';
import type {
  ClickableObjectPropertiesInterface
} from '../interfaces/gameAssets/ClickableObjectPropertiesInterface.ts';
import { TooltipBubble } from '../gameObjects/TooltipBubble.ts';
import CharacterModel from '../models/characterModel/CharacterModel.ts';
import { filterByDialogueKey } from '../utils/mapUtils.ts';
import { requiredMaps } from '../../../resources/gameAssets/requiredMaps.ts';
import type { CustomPropertyNumberInterface } from '../interfaces/gameAssets/CustomPropertyNumberInterface.ts';
import type { CustomPropertyStringInterface } from '../interfaces/gameAssets/CustomPropertyStringInterface.ts';
import type { XyPositionInterface } from '../interfaces/XyPositionInterface.ts';
import { characterAnimations, type CharacterAnimationsType } from '../enums/characterAnimations.ts';

export class MapScene extends BaseScene {
  protected tileSize = 32;
  protected tilemapWidth: number;
  protected tilemapHeight: number;
  protected tilemaps: Record<string, Tilemaps.Tilemap>;
  protected requiredTilesets: Record<string, string[][]>;
  protected requiredLayers: Record<string, string[]>;
  protected tooltipBubble!: TooltipBubble;
  protected character!: CharacterModel;
  protected pathFinder!: EasyStar.js;

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

  #onMapTriggerOver(pointer: Input.Pointer, target: GameObjects.Rectangle) {
    if (this.areMapTriggersLocked()) {
      return;
    }

    target.setFillStyle(0x00ff00, 0.25);
    this.tooltipBubble.showMessage('What\'s this...?', pointer.worldX, pointer.worldY);
  }

  #onMapTriggerOut(target: GameObjects.Rectangle) {
    if (this.areMapTriggersLocked()) {
      return;
    }

    target.setFillStyle(0x000000, 0);
    this.tooltipBubble.hide();
  }

  #moveCharacter(path: XyPositionInterface[]) {
    const map = this.tilemaps['cabp_office'];
    const spritesheetKey = 'candidate'; // use your actual spritesheet key

    let index = 1;

    const moveNext = () => {
      if (index >= path.length) {
        return;
      }

      const current = path[index - 1];
      const next = path[index];

      let direction: CharacterAnimationsType;

      if (next.x > current.x) {
        direction = characterAnimations.walkRight;
      } else if (next.x < current.x) {
        direction = characterAnimations.walkLeft;
      } else if (next.y > current.y) {
        direction = characterAnimations.walkDown;
      } else {
        direction = characterAnimations.walkUp;
      }

      this.character.sprite.anims.play(`${ spritesheetKey }-${ direction }`, true);

      this.tweens.add({
        targets: this.character.container,
        x: next.x * map.tileWidth,
        y: next.y * map.tileHeight,
        duration: 200,
        ease: 'Linear',

        onComplete: () => {
          index++;

          if (index >= path.length) {
            this.character.sprite.anims.play(
              `${ spritesheetKey }-${ characterAnimations.idleDown }`,
              true
            );
            return;
          }

          moveNext();
        }
      });
    };

    moveNext();
  }

  async #onMapTriggerClick(target: Types.Tilemaps.TiledObject) {
    if (this.areMapTriggersLocked()) {
      return;
    }

    const map = this.tilemaps['cabp_office'];
    const properties = target.properties as ClickableObjectPropertiesInterface[];
    const dialogueKeyProperty = filterByDialogueKey<CustomPropertyStringInterface>('dialogueKey', properties)!;
    const targetTileXProperty = filterByDialogueKey<CustomPropertyNumberInterface>('targetTileX', properties)!;
    const targetTileYProperty = filterByDialogueKey<CustomPropertyNumberInterface>('targetTileY', properties)!;

    const fromX = Math.floor(this.character.x / 32);
    const fromY = Math.floor(this.character.y / 32);

    const targetXY = map.tileToWorldXY(targetTileXProperty.value, targetTileYProperty.value) as XyPositionInterface;
    const targetX = Math.floor(targetXY.x / 32);
    const targetY = Math.floor(targetXY.y / 32);

    console.warn('TRIGGER', target.name);
    console.log(dialogueKeyProperty, targetTileXProperty, targetTileYProperty);
    console.log(fromX, fromY);
    console.log(targetX, targetY);

    this.pathFinder.findPath(fromX, fromY, targetX, targetY, (path) => {
      if (path === null) {
        console.warn('Path was not found.');
      } else {
        console.warn('PATH', path);
        this.#moveCharacter(path);
      }
    });

    this.pathFinder.calculate();
    await this.character.continueDialogueFrom(String(dialogueKeyProperty.value));
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

  #createMapTriggers(): void {
    const triggersLayer = this.tilemaps['cabp_office'].getObjectLayer('triggers')!;
    console.warn('TRIGGERS', triggersLayer.objects);

    triggersLayer.objects.forEach(tiledObj => {
      const { x = 0, y = 0, width = 0, height = 0 } = tiledObj;
      const clickableTrigger = this.add.rectangle(x, y, width, height, 0x000000, 0).setOrigin(0, 0);
      const hitAreaShape = new Geom.Rectangle(0, 0, width, height); // Hit area

      clickableTrigger.setInteractive(hitAreaShape, Geom.Rectangle.Contains);
      clickableTrigger.input!.cursor = 'pointer';

      clickableTrigger.on(Input.Events.POINTER_OVER, (pointer: Input.Pointer) => this.#onMapTriggerOver(pointer, clickableTrigger));
      clickableTrigger.on(Input.Events.POINTER_OUT, () => this.#onMapTriggerOut(clickableTrigger));
      clickableTrigger.on(Input.Events.POINTER_DOWN, () => this.#onMapTriggerClick(tiledObj));
    });
  }

  protected createMaps(): void {
    this.#createTiledMaps();
    this.#createTiledMapsLayers();

    this.tooltipBubble = new TooltipBubble(this, 0, 0);
    this.#createMapTriggers();
  }

  protected createPathFinder(): void {
    const map = this.tilemaps['cabp_office'];
    const grid: number[][] = [];
    this.pathFinder = new EasyStar.js();

    for (let y = 0; y < map.height; y++) {
      const row: number[] = [];

      for (let x = 0; x < map.width; x++) {
        // Read if an obstacle tile exists at this coordinate
        const tileF = map.getTileAt(x, y, true, 'furniture');
        const tileE = map.getTileAt(x, y, true, 'exit');
        const blockedTile = (tileF && tileF.index > 0) || (tileE && tileE.index > 0);
        row.push(blockedTile ? 1 : 0);
      }

      grid.push(row);
    }

    this.pathFinder.setGrid(grid);
    this.pathFinder.setAcceptableTiles([0]); // Only allow walking on '0' index tiles
    this.pathFinder.setIterationsPerCalculation(1000);
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

  protected areMapTriggersLocked(): boolean {
    return FApp.store.ui.value<boolean>('mapTriggersLocked');
  }
}
