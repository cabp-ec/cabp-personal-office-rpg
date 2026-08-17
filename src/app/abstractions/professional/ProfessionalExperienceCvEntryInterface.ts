import type { CvEntryInterface } from '../CvEntryInterface.ts';
import type { ProfessionalExperienceInterface } from './ProfessionalExperienceInterface.ts';

export interface ProfessionalExperienceCvEntryInterface extends CvEntryInterface {
  data: ProfessionalExperienceInterface[];
}
