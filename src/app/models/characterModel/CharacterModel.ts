import { Scene as PhaserScene } from 'phaser';
import type { StoreService } from '../../services/StoreService.ts';
import type { UiStateInterface } from '../../interfaces/UiStateInterface.ts';
import type { DialoguesSetType } from '../../interfaces/DialogueSetType.ts';
import { characterAnimations } from '../../enums/characterAnimations.ts';
import { spritesheetsKeys } from '../../enums/spritesheetsKeys.ts';
import { dialoguesKeys, type DialoguesKeysType } from '../../enums/dialoguesKeys.ts';

class CharacterModel {
  readonly #key: string | number;
  #storeService: StoreService;
  #dialogues: DialoguesSetType;
  #scene: PhaserScene;
  #container!: Phaser.GameObjects.Container;
  #sprite!: Phaser.GameObjects.Sprite;
  #bubbleContainer: Phaser.GameObjects.Container | null = null;
  #bubbleGraphics: Phaser.GameObjects.Graphics | null = null;
  #bubbleText: Phaser.GameObjects.Text | null = null;
  #defaultX = 100;
  #defaultY = 100;
  #dialogueKeyIndex = -1;

  constructor(
    key: string | number,
    scene: PhaserScene,
    storeService: StoreService,
    dialogues: DialoguesSetType
  ) {
    this.#key = key;
    this.#storeService = storeService;
    this.#dialogues = dialogues;
    this.#scene = scene;
  }

  /**
   * Create the speech bubble structure.
   *
   * The bubble itself is created only once per speaking turn.
   */
  #createBubble(): void {
    const padding = 8;
    const arrowHeight = 6;

    this.#bubbleText = this.#scene.add.text(
      0,
      0,
      '',
      {
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#000000',
        align: 'center',
        wordWrap: {
          width: 180,
          useAdvancedWrap: true
        }
      }
    );

    this.#bubbleGraphics = this.#scene.add.graphics();

    const localX = 20;
    const localY = -(this.#sprite.height * 0.5);

    this.#bubbleContainer = this.#scene.add.container(localX, localY);
    this.#bubbleContainer.add([this.#bubbleGraphics, this.#bubbleText]);
    this.#container.add(this.#bubbleContainer);

    // Store these values on the graphics/text objects through the update method.
    void padding;
    void arrowHeight;
  }

  /**
   * Update the existing bubble with a new phrase.
   *
   * The bubble container remains the same; only its
   * dimensions and text are updated.
   */
  #updateBubbleText(quote: string): void {
    if (!this.#bubbleGraphics || !this.#bubbleText) {
      return;
    }

    const padding = 8;
    const arrowHeight = 6;

    this.#bubbleText.setText(quote);

    const textWidth = this.#bubbleText.width;
    const textHeight = this.#bubbleText.height;
    const bubbleWidth = textWidth + padding * 2;
    const bubbleHeight = textHeight + padding * 2;
    const bx = -bubbleWidth / 2;
    const by = -bubbleHeight - arrowHeight;

    // Redraw the SAME graphics object.
    this.#bubbleGraphics.clear();
    this.#bubbleGraphics.fillStyle(0xffffff, 1);
    this.#bubbleGraphics.lineStyle(2, 0x000000, 1);
    this.#bubbleGraphics.fillRoundedRect(bx, by, bubbleWidth, bubbleHeight, 4);
    this.#bubbleGraphics.strokeRoundedRect(bx, by, bubbleWidth, bubbleHeight, 4);

    // Speech bubble arrow.
    this.#bubbleGraphics.beginPath();
    this.#bubbleGraphics.moveTo(-5, by + bubbleHeight);
    this.#bubbleGraphics.lineTo(0, by + bubbleHeight + arrowHeight);
    this.#bubbleGraphics.lineTo(5, by + bubbleHeight);
    this.#bubbleGraphics.closePath();
    this.#bubbleGraphics.fillPath();
    this.#bubbleGraphics.strokePath();

    // Reposition text inside the resized bubble.
    this.#bubbleText.setPosition(bx + padding, by + padding);
  }

  /**
   * Create the LPC character
   *
   * @param x
   * @param y
   */
  public create(x: number = this.#defaultX, y: number = this.#defaultY): void {
    this.#defaultX = x;
    this.#defaultY = y;

    /**
     * Character Sprite
     * - Frame 130 is the static "facing front"
     * - LPC characters naturally stand on the ground,
     *   offset the origin so the container's (x, y) coordinates align perfectly with their feet
     * - Container for dragging mechanics
     */

    this.#sprite = this.#scene.add.sprite(0, 0, spritesheetsKeys.candidate, 130);
    this.#sprite.setOrigin(0.25, 0.5);

    this.#container = this.#scene.add.container(x, y);
    this.#container.add([this.#sprite]);
    this.#container.setDepth(10);
  }

  /**
   * Walk forward X steps
   *
   * Returns a Promise that resolves when the movement is complete,
   * allowing movement and dialogue to be executed sequentially.
   *
   * @param spritesheetKey
   * @param steps
   */
  public walkForward(spritesheetKey: string, steps: number = 3): Promise<this> {
    const walkAnimKey = `${ spritesheetKey }-${ characterAnimations.walkDown }`;
    const idleAnimKey = `${ spritesheetKey }-${ characterAnimations.idleDown }`;
    const distance = steps * 32;
    const targetY = this.#container.y + distance;

    // Start walking animation.
    this.#sprite.anims.play(walkAnimKey, true);

    return new Promise(resolve => {
      this.#scene.tweens.add({
        targets: this.#container,
        y: targetY,
        duration: steps * 500,
        ease: 'Linear',

        onComplete: () => {
          this.#sprite.anims.play(idleAnimKey); // Return to idle animation.
          resolve(this); // Movement is now complete.
        }
      });
    });
  }

  /**
   * Dispose the active speech bubble
   */
  public clearBubble(): void {
    if (!this.#bubbleContainer) {
      return;
    }

    this.#bubbleContainer.destroy();
    this.#bubbleContainer = null;
    this.#bubbleGraphics = null;
    this.#bubbleText = null;
  }

  /**
   * Say one or multiple phrases
   *
   * @param quote One phrase or multiple sequential phrases
   */
  public say(quote: string | string[]): Promise<this> {
    const phrases = Array.isArray(quote) ? quote : [quote];

    // Remove any existing bubble before starting a completely new speaking turn.
    this.clearBubble();

    // Create the bubble once.
    this.#createBubble();

    // Helper function to calculate reading time dynamically per phrase.
    const getDynamicDuration = (text: string): number => {
      const wordCount = text.trim().split(/\s+/).length;
      const msPerWord = 250; // Adjust this to speed up or slow down text reading rate
      const basePadding = 1000; // Base time given to any bubble just to be noticed
      const minDuration = 2000; // absolute minimum time a bubble will stay on screen

      return Math.max(minDuration, (wordCount * msPerWord) + basePadding);
    };

    return new Promise(resolve => {
      let phraseIndex = 0;

      const showNextPhrase = (): void => {
        const phrase = phrases[phraseIndex];
        this.#updateBubbleText(phrase);

        // Calculate dynamic duration specifically for the CURRENT phrase
        const currentPhraseDuration = getDynamicDuration(phrase);
        phraseIndex++;

        if (phraseIndex >= phrases.length) {
          // Last phrase.
          this.#scene.time.delayedCall(currentPhraseDuration, () => {
            this.clearBubble();
            resolve(this);
          });

          return;
        }

        // Continue with the next phrase while keeping the SAME bubble alive.
        this.#scene.time.delayedCall(currentPhraseDuration, showNextPhrase);
      };

      showNextPhrase();
    });
  }

  public async startDialogue(): Promise<void> {
    await this.walkForward(spritesheetsKeys.candidate, 2);
    const dialogue = this.#dialogues[dialoguesKeys.introductions];
    this.#dialogueKeyIndex = 0;
    await this.say(dialogue.mc);

    const uiState = this.#storeService.ui.value<UiStateInterface>();
    uiState.playerDialogueOn = true;
    uiState.interactionBlocked = true;
    this.#storeService.ui.set(uiState);
  }

  public async continueDialogue(): Promise<void> {
    this.#dialogueKeyIndex++;
    const keys = Object.keys(dialoguesKeys);
    const dialogueKey = keys[this.#dialogueKeyIndex];
    const dialogue = this.#dialogues[dialogueKey];
    await this.say(dialogue.mc);
  }

  public async continueDialogueFrom(key: DialoguesKeysType): Promise<void> {
  }

  get key(): string | number {
    return this.#key;
  }
}

export default CharacterModel;
