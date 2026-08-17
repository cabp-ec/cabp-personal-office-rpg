import type { EducationCvEntryInterface } from '../education/EducationCvEntryInterface.ts';
import type { ProfessionalExperienceCvEntryInterface } from '../professional/ProfessionalExperienceCvEntryInterface.ts';

export interface CurriculumVitaeInterface {
  education: EducationCvEntryInterface;
  professionalHistory: ProfessionalExperienceCvEntryInterface;
}
