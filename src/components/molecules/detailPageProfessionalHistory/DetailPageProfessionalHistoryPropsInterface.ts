import type { ProfessionalExperienceInterface } from '../../../app/abstractions/professional/ProfessionalExperienceInterface.ts';

export interface DetailPageProfessionalHistoryPropsInterface {
  data: ProfessionalExperienceInterface[];
  showExperiencePager: boolean;
}
