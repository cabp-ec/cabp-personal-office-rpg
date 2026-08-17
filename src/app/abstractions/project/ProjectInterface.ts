import type { OrganizationalEntryInterface } from '../OrganizationalEntryInterface.ts';
import type { StarInterface } from '../professional/StarInterface.ts';

export interface ProjectInterface extends OrganizationalEntryInterface {
  stars: StarInterface[],
  role?: string;
}
