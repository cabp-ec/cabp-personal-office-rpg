import type { VisitorDialogueOptionInterface } from './DialogueSetInterface.ts';

export interface UiStateInterface {
  interactionBlocked: boolean;
  splashScreenOn: boolean;
  currentOption: VisitorDialogueOptionInterface | null;
}
