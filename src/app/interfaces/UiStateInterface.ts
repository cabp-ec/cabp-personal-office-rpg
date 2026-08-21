import type { DialoguesKeysType } from '../enums/dialoguesKeys.ts';
import type { VisitorDialogueOptionInterface } from './dialogs/VisitorDialogueOptionInterface.ts';

export interface UiStateInterface {
  mapTriggersLocked: boolean;
  splashScreenOn: boolean;
  playerDialogueOn: boolean;
  guestBookSigned: boolean;
  visitorRole: string;
  currentDialogueKey: DialoguesKeysType | null;
  currentOption: VisitorDialogueOptionInterface | null;
}
