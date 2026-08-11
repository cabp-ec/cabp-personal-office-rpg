export const educationLevel = {
  primary: 'primary',
  secondLevel: 'secondLevel',
  thirdLevel: 'thirdLevel',
  fourthLevel: 'fourthLevel'
};

export type EducationLevelType = typeof educationLevel[keyof typeof educationLevel];
