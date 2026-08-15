import type { EducationType } from '../enums/educationTypes.ts';
import type { EducationalHonorInterface } from './EducationalHonorInterface.ts';
import type { OrganizationalEntryInterface } from '../OrganizationalEntryInterface.ts';

export interface EducationEntryInterface extends OrganizationalEntryInterface {
  type: EducationType;
  level: 1 | 2 | 3 | 4 | null;
  honors: EducationalHonorInterface[];
}
