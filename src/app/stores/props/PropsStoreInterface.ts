import { Observable } from 'rxjs';
import type { OperatorFunction } from 'rxjs';

export interface PropsStoreInterface {
  /**
   * Get the current value of a prop or the current state
   *
   * @param prop
   */
  value<T>(prop?: string): T;

  /**
   * Get the current state
   */
  state<T>(): Observable<T>;

  /**
   * Get an observer for a single property of the state
   *
   * @param prop
   */
  getProp(prop: string): void;

  /**
   * Set a value for a single property of the state
   *
   * @param prop
   * @param value
   */
  setProperty<T>(prop: string, value: T): void;

  /**
   * Set the whole state
   *
   * @param props
   */
  set(props: object): void;

  // pipe(): void;
  pipe<T, A>(op1: OperatorFunction<T, A>): Observable<A>;
}
