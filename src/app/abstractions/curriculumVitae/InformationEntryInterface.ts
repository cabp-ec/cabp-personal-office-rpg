import type { EntityInterface } from '../../interfaces/EntityInterface.ts';
import type { EntryDateInterface } from './EntryDateInterface.ts';

export interface InformationEntryInterface extends EntityInterface {
  name: string;
  organization: string;
  country: PropertyKey;
  startDate: EntryDateInterface | null;
  endDate: EntryDateInterface | null;
  keywords: string[];
}
