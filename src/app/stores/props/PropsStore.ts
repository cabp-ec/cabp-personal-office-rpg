import { createStore, type PropsFactory, select, setProp, Store } from '@ngneat/elf';
import type { PropsStoreInterface } from './PropsStoreInterface.ts';
import { Observable, type OperatorFunction } from 'rxjs';

export class PropsStore implements PropsStoreInterface {
  #store: Store;

  constructor(name: string, withProps: PropsFactory<unknown, unknown>) {
    this.#store = createStore({ name }, withProps);
  }

  /**
   * @inheritDoc
   */
  value<T>(prop: string | null = null): T {
    const state = this.#store.getValue();
    return prop ? state[prop] : state;
  }

  /**
   * @inheritDoc
   */
  state<T>(): Observable<T> {
    const value = select<T, T>((state) => state);
    return this.#store.pipe(value);
  }

  /**
   * @inheritDoc
   */
  getProp(prop: string) {
    return this.#store.pipe(select((state) => state[prop]));
  }

  /**
   * @inheritDoc
   */
  setProperty<T>(prop: string, value: T): void {
    this.#store.update(setProp(prop, value));
  }

  /**
   * @inheritDoc
   */
  set(props: object): void {
    Object.keys(props).forEach((key: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.setProperty(key, props[key]);
    });
  }

  pipe<T, A>(op1: OperatorFunction<T, A>): Observable<A> {
    return this.#store.pipe(op1);
  }
}
