import type { UiStateInterface } from '../../src/app/interfaces/UiStateInterface.ts';
import { dialoguesKeys } from '../../src/app/enums/dialoguesKeys.ts';

export const uiInitialState: UiStateInterface = {
  interactionBlocked: false,
  splashScreenOn: false,
  currentDialogueKey: dialoguesKeys.introductions,
  currentOption: null
};
