import type { AppInterface } from './interfaces/AppInterface.ts';
import { Api } from './api/Api.ts';
import { StoreService } from './services/StoreService.ts';
import { UIService } from './services/UIService.ts';
import { GameService } from './services/GameService.ts';
import { CurriculumService } from './services/CurriculumService.ts';
import { renderReactApp } from './utils/reactUtils.tsx';

const FunctionalApp = function (): AppInterface {
  'use strict';

  let _instance: AppInterface;

  class TheFunctionalApp implements AppInterface {
    readonly api: Api;
    readonly store: StoreService;
    readonly uiService: UIService;
    readonly gameService: GameService;
    readonly curriculumService: CurriculumService;

    constructor() {
      this.api = new Api();
      this.store = new StoreService();
      this.uiService = new UIService(this.store.ui);
      this.gameService = new GameService();
      this.curriculumService = new CurriculumService(this.store);
    }

    /**
     * Initialize this app
     *
     * @private
     */
    async #initialize(): Promise<void> {
      this.uiService.initialize();
      const initialStateData = await this.api.getInitialState();
      this.store.initialize(initialStateData);

      return Promise.resolve();
    }

    /**
     * @inheritDoc
     */
    public launch(): void {
      this.#initialize()
        .then(() => {
          renderReactApp();
        })
        .catch((error: unknown) => {
          console.error('Failed to boot application', error);
        });
    };

    /**
     * Get an instance of this class
     */
    static getInstance(): AppInterface {
      if (!_instance) {
        _instance = new this();
      }

      return _instance;
    }
  }

  return TheFunctionalApp.getInstance();
};

export default FunctionalApp;
