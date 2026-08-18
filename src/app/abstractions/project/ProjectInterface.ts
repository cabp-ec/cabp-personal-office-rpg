import type { OrganizationalEntryInterface } from '../OrganizationalEntryInterface.ts';
import type { StarInterface } from '../professional/StarInterface.ts';

export interface ProjectInterface extends OrganizationalEntryInterface {
  status: 'Cancelled';
  fixedTerm: true;
  stars: StarInterface[];
  role?: string;
}
