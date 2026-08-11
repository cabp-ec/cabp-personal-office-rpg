import type {
  DialoguesSetInterface,
  VisitorDialogueOptionInterface
} from '../../../app/interfaces/DialogueSetInterface.ts';

export interface PlayerDialoguePropsInterface {
  dialogueKey: string | null;
  dialoguesSet: DialoguesSetInterface;
  onOptionClick: (value: VisitorDialogueOptionInterface) => void;
}
