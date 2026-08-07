import { withProps } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import type { ServiceInterface } from '../interfaces/ServiceInterface.ts';
import type { InitialStateInterface } from '../interfaces/InitialStateInterface.ts';
import type { PropsStoreInterface } from '../stores/props/PropsStoreInterface.ts';
import type { UiStateInterface } from '../interfaces/UiStateInterface.ts';
import type { SessionInterface } from '../interfaces/SessionInterface.ts';
import type { UserEntityInterface } from '../models/user/UserEntityInterface.ts';
import type { CountryEntityInterface } from '../models/country/CountryEntityInterface.ts';
import type { NamedEntityInterface } from '../interfaces/NamedEntityInterface.ts';
import { PropsStore } from '../stores/props/PropsStore.ts';
import { EntityStore } from '../stores/EntityStore.ts';
import { storesAvail } from '../enums/storesAvail.ts';
import { uiInitialState } from '../../../resources/defaultStates/uiInitialState.ts';
import { sessionInitialState } from '../../../resources/defaultStates/sessionInitialState.ts';
import { anonymousUser } from '../../../resources/staticData/anonymousUser.ts';

export class StoreService implements ServiceInterface {
  #initialized = false;
  ui: PropsStoreInterface;
  user: PropsStoreInterface;
  session: PropsStoreInterface;
  countries: EntityStore;
  cities: EntityStore;

  /**
   * The StoreService class
   */
  constructor() {
    this.ui = new PropsStore(storesAvail.ui, withProps<UiStateInterface>(uiInitialState));
    this.user = new PropsStore(storesAvail.user, withProps<UserEntityInterface>(anonymousUser));
    this.countries = new EntityStore(storesAvail.countries, withEntities<CountryEntityInterface>(), []);
    this.cities = new EntityStore(storesAvail.cities, withEntities<NamedEntityInterface>(), []);
    this.session = new PropsStore(storesAvail.session, withProps<SessionInterface>(sessionInitialState));
  }

  public initialize(initialStateData: InitialStateInterface): void {
    this.countries.set<CountryEntityInterface>(initialStateData.countries);
    this.user.set(initialStateData.user);
    this.session.set(initialStateData.session);
    this.#initialized = true;
  }

  /**
   * @inheritDoc
   */
  public initialized(): boolean {
    return this.#initialized;
  }
}
