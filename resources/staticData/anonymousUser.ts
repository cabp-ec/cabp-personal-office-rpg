import type { UserEntityInterface } from '../../src/app/models/user/UserEntityInterface.ts';
import { v4 as uuidv4 } from 'uuid';

export const anonymousUser: UserEntityInterface = {
  id: 0,
  anonymous: true,
  uuid: uuidv4(),
  name: 'Fulano de Tal',
  countryId: null,
  cityId: null,
};
