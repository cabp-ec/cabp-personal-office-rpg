import type { UserEntityInterface } from '../models/user/UserEntityInterface.ts';
import type { SessionInterface } from './SessionInterface.ts';
import type { CountryEntityInterface } from '../models/country/CountryEntityInterface.ts';
import type { DialoguesSetInterface } from './DialogueSetInterface.ts';

export interface InitialStateInterface {
  user: UserEntityInterface;
  session: SessionInterface;
  countries: CountryEntityInterface[];
}
