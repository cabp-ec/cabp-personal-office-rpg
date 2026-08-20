import { StoreService } from '../services/StoreService.ts';
import { UIService } from '../services/UIService.ts';
import { GameService } from '../services/GameService.ts';
import { CurriculumService } from '../services/CurriculumService.ts';
import { Api } from '../api/Api.ts';

export interface AppInterface {
  readonly api: Api;
  readonly store: StoreService;
  readonly uiService: UIService;
  readonly gameService: GameService;
  readonly curriculumService: CurriculumService;

  /**
   * Launch this app
   */
  launch: () => void;
}
