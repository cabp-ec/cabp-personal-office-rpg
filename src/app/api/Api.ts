import type { InitialStateInterface } from '../interfaces/InitialStateInterface.ts';
import { appInitialState } from '../../../resources/defaultStates/appInitialState.ts';
import type { GuestInterface } from '../interfaces/GuestInterface.ts';

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

  async postGuestEntry(data: GuestInterface): Promise<void> {
    try {
      // TODO: implement
      console.warn('GUEST SIGNED', data);
    } catch (error) {
      console.error(error);
    }
  }
}
