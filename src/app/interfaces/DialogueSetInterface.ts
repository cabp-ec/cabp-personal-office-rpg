export interface VisitorDialogueOptionInterface {
  id: PropertyKey;
  text: string;
  interactionBlocked: boolean;
  targetTile?: number[];
  targetScene?: string;
  targetAction?: string;
  targetModal?: boolean;
  modalKey?: string;
  showShortVersion?: boolean;
}

export interface DialogueSetInterface {
  mc: string[];
  nn: VisitorDialogueOptionInterface[];
}

export interface DialoguesSetInterface {
  introductions: DialogueSetInterface;
  hello: DialogueSetInterface;
  welcome: DialogueSetInterface;
  ideationRoom: DialogueSetInterface;
  myEducation: DialogueSetInterface;
  internetSpeed: DialogueSetInterface;
  contactMe: DialogueSetInterface;
  fullProfessionalHistory: DialogueSetInterface;
  whatILikeToRead: DialogueSetInterface;
  musicILike: DialogueSetInterface;
  whatImDoingNow: DialogueSetInterface;
  recentProfessionalHistory: DialogueSetInterface;
  professionalAchievements: DialogueSetInterface;
  myStyle: DialogueSetInterface;
  productsAndServices: DialogueSetInterface;
  myDrinksAndSnacks: DialogueSetInterface;
  standingDesk: DialogueSetInterface;
  bookshelf: DialogueSetInterface;
  myHobbies: DialogueSetInterface;
  guestBook: DialogueSetInterface;
  bonus: DialogueSetInterface;
  exit: DialogueSetInterface;
}
