import type { OrganizationalEntryInterface } from '../OrganizationalEntryInterface.ts';
import type { ProjectInterface } from '../project/ProjectInterface.ts';

export interface ProfessionalExperienceInterface extends OrganizationalEntryInterface {
  contractor: boolean;
  seniority: 'Expert' | 'Senior' | 'Semi-Senior' | 'Junior' | 'Entry';
  remote: boolean;
  projects: ProjectInterface[];
}
