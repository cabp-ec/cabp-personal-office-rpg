import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { select } from '@ngneat/elf';

import FApp from './app';
import type { DialoguesSetInterface, VisitorDialogueOptionInterface } from './app/interfaces/DialogueSetInterface.ts';
import { useElfSelector } from './app/hooks/useElf.ts';
import PlayerDialogue from './components/organisms/playerDialogue/PlayerDialogue.tsx';

const getDialoguesSet = () => FApp.store.dialogues.pipe(
  select((state: DialoguesSetInterface) => state)
);

function ReactApp() {
  const gameWrapper = useRef<HTMLDivElement | null>(null);
  const dialoguesSet = useElfSelector<DialoguesSetInterface>(getDialoguesSet);
  const [currentDialogKey, setCurrentDialogKey] = useState<string | null>(null);
  const [dialogueOption, setDialogueOption] = useState<VisitorDialogueOptionInterface | null>(null);

  const onDialogueOptionClick = (value: VisitorDialogueOptionInterface): void => {
    console.clear();
    console.warn('PLAYER', value);
    // setDialogueOption(value);
    // FApp.store.ui.setProperty<VisitorDialogueOptionInterface>('currentOption', value);
  };

  useEffect(() => {
    if (gameWrapper.current) {
      FApp.gameService.initialize(gameWrapper.current);
    }

    // Cleanup Phaser if the React component unmounts
    return () => {
      FApp.gameService.destroy();
    };
  }, []);

  return (
    <>
      <PlayerDialogue
        dialogueKey={ currentDialogKey }
        dialoguesSet={ dialoguesSet! }
        onOptionClick={ onDialogueOptionClick }
      />

      <div ref={ gameWrapper } className="game-wrapper z-0 test-border-green"/>
    </>
  );
}

export default ReactApp;
