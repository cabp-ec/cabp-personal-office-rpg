import type { NamedEntityInterface } from '../../interfaces/NamedEntityInterface.ts';

export interface UserEntityInterface extends NamedEntityInterface {
  anonymous: boolean;
  uuid: string;
  countryId: PropertyKey | null;
  cityId: PropertyKey | null;
}
