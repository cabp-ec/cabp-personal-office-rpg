import { StoreService } from '../services/StoreService.ts';
import { UIService } from '../services/UIService.ts';
import { GameService } from '../services/GameService.ts';

export interface AppInterface {
  readonly store: StoreService;
  readonly uiService: UIService;
  readonly gameService: GameService;

  /**
   * Launch this app
   */
  launch: () => void;
}
