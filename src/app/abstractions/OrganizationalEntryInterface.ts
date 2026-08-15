import type { InformationEntryInterface } from './InformationEntryInterface.ts';
import type { CountryEntityInterface } from '../models/country/CountryEntityInterface.ts';
import type { EntryDateInterface } from './EntryDateInterface.ts';

export interface OrganizationalEntryInterface extends InformationEntryInterface {
  organization: string;
  country: CountryEntityInterface;
  startDate: EntryDateInterface | null;
  endDate: EntryDateInterface | null;
}
