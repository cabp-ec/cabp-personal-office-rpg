import type { UiStateInterface } from '../../src/app/interfaces/UiStateInterface.ts';
import { dialoguesKeys } from '../../src/app/enums/dialoguesKeys.ts';

export const uiInitialState: UiStateInterface = {
  mapTriggersLocked: true,
  splashScreenOn: false,
  playerDialogueOn: false,
  currentDialogueKey: dialoguesKeys.introductions,
  currentOption: null,
};
