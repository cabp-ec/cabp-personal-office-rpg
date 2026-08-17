import { type MouseEvent } from 'react';
import type { DialoguesKeysType } from '../../../app/enums/dialoguesKeys.ts';
import type { CurriculumVitaeInterface } from '../../../app/abstractions/curriculumVitae/CurriculumVitaeInterface.ts';

export interface DetailModalPropsInterface {
  dialogueKey: DialoguesKeysType;
  cvKeys: string[];
  curriculum: CurriculumVitaeInterface;
  onCloseClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  // shortVersion: boolean;
}
