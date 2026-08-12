import type { DialoguesKeysType } from '../enums/dialoguesKeys.ts';
import type { DialogueSetInterface } from './dialogs/DialogueSetInterface.ts';

// Dynamically generate keys based on object file definitions
export type DialoguesSetType = {
  [K in DialoguesKeysType]: DialogueSetInterface;
};
