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
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
      };

      fetch('/', requestOptions)
        .then((response) => response.text())
        .then(() => {})
        .catch((error) => console.error(error));
    } catch (error) {
      console.error(error);
    }
  }
}
