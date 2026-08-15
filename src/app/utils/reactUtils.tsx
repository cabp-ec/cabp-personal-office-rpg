import { createRoot } from 'react-dom/client';
import ReactApp from '../../ReactApp.tsx';
import { select } from '@ngneat/elf';
import type { DialoguesSetType } from '../interfaces/DialogueSetType.ts';
import FApp from '../index.ts';
import type { EducationEntryInterface } from '../abstractions/education/EducationEntryInterface.ts';
import type { CurriculumVitaeInterface } from '../abstractions/curriculumVitae/CurriculumVitaeInterface.ts';

export function renderReactApp() {
  const elRoot = document.getElementById('root');
  console.warn('RENDERING REACT!');

  createRoot(elRoot!).render(
    // <StrictMode>
    <ReactApp/>
    // </StrictMode>
  );
}

export function getDialoguesSet() {
  return FApp.store.dialogues.pipe(
    select((state: DialoguesSetType) => state)
  );
}

export function separateEducationEntries(values: EducationEntryInterface[]): {
  formal: EducationEntryInterface[];
  others: EducationEntryInterface[];
} {
  return values.reduce(
    (groups, entry) => {
      if (entry.type === 'formal') {
        groups.formal.push(entry);
      } else {
        groups.others.push(entry);
      }

      return groups;
    },
    {
      formal: [],
      others: []
    } as {
      formal: EducationEntryInterface[];
      others: EducationEntryInterface[];
    }
  );
}

export function getPrevAndNextTitles(needle: string, haystack: string[], curriculum: CurriculumVitaeInterface): {
  prev: string | null,
  next: string | null
} | null {
  if (!haystack.includes(needle)) {
    return null;
  }

  const index = haystack.indexOf(needle);
  const prevKey = haystack[index - 1] ?? null;
  const nextKey = haystack[index + 1] ?? null;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const prev = prevKey ? curriculum[prevKey].title : null;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const next = nextKey ? curriculum[nextKey].title : null;

  return { prev, next };
}
