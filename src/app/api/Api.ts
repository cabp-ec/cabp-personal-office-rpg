import type { InitialStateInterface } from '../interfaces/InitialStateInterface.ts';
import { appInitialState } from '../../../resources/defaultStates/appInitialState.ts';

export class Api {
  async getInitialState(): Promise<InitialStateInterface> {
    try {
      // TODO: perform request to API here
      return appInitialState;
    } catch (error) {
      console.error(error);

      return appInitialState;
    }
  }
}
