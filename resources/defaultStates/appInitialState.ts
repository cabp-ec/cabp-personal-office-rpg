import type { InitialStateInterface } from '../../src/app/interfaces/InitialStateInterface';
import { sessionInitialState } from './sessionInitialState.ts';
import { anonymousUser } from '../staticData/anonymousUser.ts';

export const appInitialState: InitialStateInterface = {
  user: anonymousUser,
  session: sessionInitialState,
  countries: []
};
