import type { OrganizationalEntryInterface } from '../OrganizationalEntryInterface.ts';

export interface EducationalHonorInterface extends OrganizationalEntryInterface {
  // Honor/Award — what you received      → name
  // Institution — where you received it  → organization
  // Date/Period — when                   → start/end dates
  criteria: string[]; // why you received it
}
