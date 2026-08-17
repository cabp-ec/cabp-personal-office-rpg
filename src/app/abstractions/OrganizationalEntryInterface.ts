import type { CountryEntityInterface } from '../models/country/CountryEntityInterface.ts';
import type { EntryDateInterface } from './EntryDateInterface.ts';
import type { NamedEntityInterface } from '../interfaces/NamedEntityInterface.ts';

export interface OrganizationalEntryInterface extends NamedEntityInterface {
  organization: string;
  country: CountryEntityInterface;
  startDate: EntryDateInterface | null;
  endDate: EntryDateInterface | null;
  keywords: string[];
}
