export interface SplashComponentInterface extends HTMLElement {
  /**
   * Set the label for the loading bar
   *
   * @param value
   */
  setLabel(value?: string): void;

  /**
   * Show the splash component
   */
  show(): void;

  /**
   * Hide the splash component
   */
  hide(): void;

  /**
   * Get the loader HTML element from this component
   */
  getLoaderElement(): HTMLElement;
}