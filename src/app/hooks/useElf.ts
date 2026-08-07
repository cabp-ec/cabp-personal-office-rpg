import { useMemo } from 'react';
import { useObservable } from '@ngneat/react-rxjs';
import { Observable } from 'rxjs';

export function useElfSelector<T>(getStream: () => Observable<T>): T | undefined {
  // eslint-disable-next-line react-hooks/use-memo,react-hooks/exhaustive-deps
  const stream$ = useMemo(getStream, []);
  const [value] = useObservable(stream$);
  return value;
}
