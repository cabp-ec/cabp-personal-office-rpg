import type { EntityInterface } from '../interfaces/EntityInterface.ts';

export interface InformationEntryInterface extends EntityInterface {
  name: string;
  keywords: string[];
}
