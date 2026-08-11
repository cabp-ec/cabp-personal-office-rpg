export const educationTypes = {
  formal: 'formal',
  course: 'course',
  certification: 'certification',
  workshop: 'workshop'
};

export type EducationTypesType = typeof educationTypes[keyof typeof educationTypes];
