import type { DialoguesSetType } from '../../../app/interfaces/DialogueSetType.ts';
import type { VisitorDialogueOptionInterface } from '../../../app/interfaces/dialogs/VisitorDialogueOptionInterface.ts';

export interface PlayerDialoguePropsInterface {
  dialogueKey: string | null;
  dialoguesSet: DialoguesSetType;
  onOptionClick: (value: VisitorDialogueOptionInterface) => void;
}
