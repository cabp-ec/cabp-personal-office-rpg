export const dialoguesKeys = {
  introductions: 'introductions',
  welcome: 'welcome',
  ideationRoom: 'ideationRoom',
  education: 'education',
  internetSpeed: 'internetSpeed',
  contactMe: 'contactMe',
  fullProfessionalHistory: 'fullProfessionalHistory',
  whatILikeToRead: 'whatILikeToRead',
  musicILike: 'musicILike',
  whatImDoingNow: 'whatImDoingNow',
  recentProfessionalHistory: 'recentProfessionalHistory',
  professionalAchievements: 'professionalAchievements',
  myStyle: 'myStyle',
  productsAndServices: 'productsAndServices',
  myDrinksAndSnacks: 'myDrinksAndSnacks',
  standingDesk: 'standingDesk',
  bookshelf: 'bookshelf',
  myHobbies: 'myHobbies',
  guestBook: 'guestBook',
  bonus: 'bonus',
  exit: 'exit'
};

export type DialoguesKeysType = typeof dialoguesKeys[keyof typeof dialoguesKeys];
