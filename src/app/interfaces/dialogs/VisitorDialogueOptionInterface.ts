export interface VisitorDialogueOptionInterface {
  id: PropertyKey;
  text: string;
  continueDialogue?: boolean;
  blockMapTriggers?: boolean;
  // ---
  targetTile?: number[];
  targetScene?: string;
  targetAction?: string;
  targetModal?: boolean;
  modalKey?: string;
  showShortVersion?: boolean;
}
