import type { InformationEntryInterface } from './InformationEntryInterface.ts';
import type { EducationType } from '../enums/educationTypes.ts';

export interface EducationEntryInterface extends InformationEntryInterface {
  type: EducationType;
  level: 1 | 2 | 3 | 4 | null;
}
