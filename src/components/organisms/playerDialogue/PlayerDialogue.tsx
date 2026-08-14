import type { PlayerDialoguePropsInterface } from './PlayerDialoguePropsInterface.ts';
import type { DialogueSetInterface } from '../../../app/interfaces/dialogs/DialogueSetInterface.ts';

function PlayerDialogue({ dialogueKey, dialoguesSet, onOptionClick }: PlayerDialoguePropsInterface) {
  if (!dialogueKey) {
    return;
  }

  const dialogue = dialoguesSet[dialogueKey] as DialogueSetInterface;

  return (
    <div className="dialog z-100">
      <div className="dialog-name">You</div>

      <div className="dialog-content dialog-options">
        { dialogue.nn.map((set, i) => (
          <button key={ `key_${ i }` } type="button" onClick={ () => onOptionClick(set) }>
            { set.text }
          </button>
        )) }
      </div>
    </div>
  );
}

export default PlayerDialogue;
