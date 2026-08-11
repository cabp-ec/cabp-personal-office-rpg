import type { NamedEntityInterface } from '../../interfaces/NamedEntityInterface.ts';

export interface CountryEntityInterface extends NamedEntityInterface {
  dialCode: number;
  alpha3: string;
}
