import type { InitialStateInterface } from '../../src/app/interfaces/InitialStateInterface';
import { sessionInitialState } from './sessionInitialState.ts';
import { anonymousUser } from '../staticData/anonymousUser.ts';
import { candidateCurriculum } from '../staticData/candidateCurriculum.ts';
import { availableCountries } from '../staticData/availableCountries.ts';

export const appInitialState: InitialStateInterface = {
  user: anonymousUser,
  session: sessionInitialState,
  countries: availableCountries,
  candidateCurriculum: candidateCurriculum
};
