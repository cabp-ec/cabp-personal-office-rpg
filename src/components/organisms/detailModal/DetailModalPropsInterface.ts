import type { DialoguesKeysType } from '../../../app/enums/dialoguesKeys.ts';
import type { CurriculumVitaeInterface } from '../../../app/abstractions/curriculumVitae/CurriculumVitaeInterface.ts';

export interface DetailModalPropsInterface {
  dialogueKey: DialoguesKeysType;
  title: string;
  curriculum: CurriculumVitaeInterface;
  // shortVersion: boolean;
}
