import { createRoot } from 'react-dom/client';
import ReactApp from '../../ReactApp.tsx';
import { select } from '@ngneat/elf';
import type { DialoguesSetType } from '../interfaces/DialogueSetType.ts';
import FApp from '../index.ts';

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
