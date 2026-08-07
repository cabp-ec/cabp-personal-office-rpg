import { createStore, type PropsFactory, Store } from '@ngneat/elf';
import {
  selectAllEntities,
  setEntities,
  addEntities,
  updateEntities,
  deleteEntities,
  selectEntity,
  getAllEntitiesApply,
  getAllEntities
} from '@ngneat/elf-entities';
import { Observable } from 'rxjs';
import type { KeyTypePoolInterface } from '../interfaces/KeyTypePoolInterface.ts';

export class EntityStore {
  #store: Store;
  entitie$: Observable<unknown[]>;

  constructor(name: string, withEntities: PropsFactory<unknown, unknown>, entities: unknown[] = []) {
    this.#store = createStore({ name }, withEntities);
    this.entitie$ = this.#store.pipe(selectAllEntities());
    this.set(entities);
  }

  /**
   * Returns the current state,
   * in a form of { ids: number[], entities: { #: T } }
   */
  state<T>(): KeyTypePoolInterface<T> {
    return this.#store.getValue() as KeyTypePoolInterface<T>;
  }

  nextId<T>(): PropertyKey {
    const state = this.state<T>();
    return state.ids.length ? (state.ids[state.ids.length - 1] + 1) : 1;
  }

  update<T>(id: PropertyKey, entity: Partial<T>) {
    this.#store.update(updateEntities(id, entity));
  }

  updateAll<T>(value: object) {
    this.#store.update(updateEntities(this.state<T>().ids, value));
  }

  /*exists(id: PropertyKey): boolean {
    const state = this.currentState();
    return state.ids.includes(id);
  }*/

  filterEntitiesById<T>(ids: PropertyKey[] = []): T[] {
    if (!ids.length) {
      return [];
    }

    return this.#store.query(
      getAllEntitiesApply({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        filterEntity: (e: T) => ids.includes(Number(e.id))
      })
    );
  }

  /**
   * Get all entities of the given Type
   */
  getAllEntities<T>(): T[] {
    return this.#store.query<T[]>(getAllEntities());
  }

  selectEntity<T>(id: PropertyKey): T {
    return this.#store.pipe(selectEntity(id)) as T;
  }

  add<T>(entity: T | T[]): void {
    this.#store.update(addEntities(entity));
  }

  rem(id: PropertyKey | PropertyKey[]) {
    this.#store.update(deleteEntities(id));
  }

  set<T>(entities: T[]): void {
    this.#store.update(setEntities(entities));
  }
}
