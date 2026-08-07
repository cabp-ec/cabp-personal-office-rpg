import type { SessionInterface } from '../../src/app/interfaces/SessionInterface.ts';
import { v4 as uuidv4 } from 'uuid';

export const sessionInitialState: SessionInterface = {
  uuid: uuidv4(),
  startDate: (new Date).getTime(),
  endDate: null
};
