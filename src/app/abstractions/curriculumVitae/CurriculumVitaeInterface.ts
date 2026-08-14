import type { EducationEntryInterface } from './EducationEntryInterface.ts';

export interface CurriculumVitaeInterface {
  education: {
    title: string;
    data: EducationEntryInterface[];
  };
}
