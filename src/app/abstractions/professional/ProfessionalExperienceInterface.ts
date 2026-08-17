import type { OrganizationalEntryInterface } from '../OrganizationalEntryInterface.ts';
import type { ProjectInterface } from '../project/ProjectInterface.ts';

export interface ProfessionalExperienceInterface extends OrganizationalEntryInterface {
  contractor: boolean;
  remote: boolean;
  projects: ProjectInterface[];
}
