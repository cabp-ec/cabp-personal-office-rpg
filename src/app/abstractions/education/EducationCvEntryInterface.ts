import type { CvEntryInterface } from '../CvEntryInterface.ts';
import type { EducationEntryInterface } from './EducationEntryInterface.ts';

export interface EducationCvEntryInterface extends CvEntryInterface {
  data: EducationEntryInterface[];
}
