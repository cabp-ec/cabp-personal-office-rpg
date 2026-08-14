export const educationTypes = {
  formal: 'formal',
  certification: 'certification',
  course: 'course',
  workshop: 'workshop',
  training: 'training'
};

export type EducationType = typeof educationTypes[keyof typeof educationTypes];
