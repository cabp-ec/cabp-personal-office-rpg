import type { DialogueSetInterface, VisitorDialogueOptionInterface } from './DialogueSetInterface.ts';

export interface UiStateInterface {
  interactionBlocked: boolean;
  splashScreenOn: boolean;
  currentDialogueKey: keyof DialogueSetInterface | null;
  currentOption: VisitorDialogueOptionInterface | null;
}
