import Phaser from 'phaser';

export class TooltipBubble extends Phaser.GameObjects.Container {
  readonly #textObject: Phaser.GameObjects.Text;
  readonly #background: Phaser.GameObjects.Rectangle;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    const fontConfig = { fontSize: '12px', color: '#ffffff', padding: { x: 8, y: 4 } };
    this.#textObject = scene.add.text(0, 0, 'What\'s this...?', fontConfig).setOrigin(0.5, 1);

    const bgWidth = this.#textObject.width;
    const bgHeight = this.#textObject.height;

    this.#background = scene.add.rectangle(0, -(bgHeight / 2), bgWidth, bgHeight, 0x000000, 0.75);
    this.add([this.#background, this.#textObject]);

    this.setDepth(100); // Always stay on top of map environments
    this.setVisible(false);

    // Explicitly add this instance to the active Scene display list
    scene.add.existing(this);
  }

  /**
   * Updates the inner text and recalculates background bounds dynamically
   */
  public showMessage(text: string, worldX: number, worldY: number): void {
    this.#textObject.setText(text);

    // Match background geometry to the newly assigned text size
    this.#background.setSize(this.#textObject.width, this.#textObject.height);
    this.#background.setY(-(this.#textObject.height / 2));

    // Position the entire container relative to the screen cursor
    this.setPosition(worldX, worldY - 10);
    this.setVisible(true);
  }

  /**
   * Conceals the tooltip instantly
   */
  public hide(): void {
    this.setVisible(false);
  }
}
