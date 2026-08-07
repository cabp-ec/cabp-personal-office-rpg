import type { ServiceInterface } from '../interfaces/ServiceInterface.ts';
import type { SplashComponentInterface } from '../interfaces/SplashComponentInterface.ts';
import type { PropsStoreInterface } from '../stores/props/PropsStoreInterface.ts';
import type { UiStateInterface } from '../interfaces/UiStateInterface.ts';

export class UIService implements ServiceInterface {
  #initialized = false;
  #store: PropsStoreInterface;
  #splashOn = true;
  public readonly splashComponent: SplashComponentInterface;

  constructor(uiStore: PropsStoreInterface) {
    this.splashComponent = UIService.getSplashComponent();
    this.#store = uiStore;
  }

  /**
   * Get the Splash web component
   */
  public static getSplashComponent(): SplashComponentInterface {
    const el = document.getElementById('id');
    return el as SplashComponentInterface;
  }

  public hideSplashComponent(): void {
    if (this.#splashOn) {
      this.splashComponent.hide();
      this.#splashOn = false;
    }
  }

  get splashOn(): boolean {
    return this.#splashOn;
  }

  /**
   * Initialize this service
   */
  public initialize(): void {
    this.#initialized = true;
  }

  /**
   * @inheritDoc
   */
  initialized(): boolean {
    return this.#initialized;
  }

  /**
   * Get the UI state
   */
  get state(): UiStateInterface {
    return this.#store.value<UiStateInterface>();
  }
}
