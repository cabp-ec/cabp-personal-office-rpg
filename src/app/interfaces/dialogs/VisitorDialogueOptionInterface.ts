export interface VisitorDialogueOptionInterface {
  id: PropertyKey;
  text: string;
  interactionBlocked: boolean;
  continueDialogue?: boolean;
  // ---
  targetTile?: number[];
  targetScene?: string;
  targetAction?: string;
  targetModal?: boolean;
  modalKey?: string;
  showShortVersion?: boolean;
}
