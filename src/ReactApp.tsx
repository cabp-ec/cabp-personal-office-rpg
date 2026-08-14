import { useRef, useState, useEffect } from 'react';
import { select } from '@ngneat/elf';

import type { DialoguesSetType } from './app/interfaces/DialogueSetType.ts';
import type { UiStateInterface } from './app/interfaces/UiStateInterface.ts';
import type { VisitorDialogueOptionInterface } from './app/interfaces/dialogs/VisitorDialogueOptionInterface.ts';
import { GameScene } from './app/scenes/GameScene.ts';

import FApp from './app';
import { useElfSelector } from './app/hooks/useElf.ts';
import { getDialoguesSet } from './app/utils/react.utils.tsx';
import PlayerDialogue from './components/organisms/playerDialogue/PlayerDialogue.tsx';
import { candidateCurriculum } from '../resources/staticData/candidateCurriculum.ts';
import { DetailModal } from './components/organisms/detailModal/DetailModal.tsx';

function ReactApp() {
  const gameWrapper = useRef<HTMLDivElement | null>(null);
  const dialoguesSet = useElfSelector<DialoguesSetType>(getDialoguesSet);
  const [currentDialogKey, setCurrentDialogKey] = useState<string | null>(null);

  const onDialogueOptionClick = async (value: VisitorDialogueOptionInterface): Promise<void> => {
    console.clear();
    console.warn('PLAYER', value);

    const uiState = FApp.store.ui.value<UiStateInterface>();
    uiState.playerDialogueOn = false;
    uiState.currentOption = value;
    FApp.store.ui.set(uiState);
    setCurrentDialogKey(null);

    if (value.continueDialogue && value.continueDialogue === true) {
      const scene = FApp.gameService.getScene<GameScene>(GameScene.key);
      await scene.candidate.continueDialogue();
      FApp.store.ui.setProperty<boolean>('mapTriggersLocked', false);
    }
  };

  /*useEffect(() => {
    // Pipe the reactive stream from Elf into your local state setter
    const subscription = FApp.store.ui
      .pipe(select((state: UiStateInterface) => state))
      .subscribe((state) => {
        if (state.playerDialogueOn === true) {
          setCurrentDialogKey(state.currentDialogueKey);
        }
      });

    // Clean up subscription when the component unmounts to prevent leaks
    return () => subscription.unsubscribe();
  }, []);*/

  /*useEffect(() => {
    if (gameWrapper.current) {
      FApp.gameService.initialize(gameWrapper.current);
    }

    // Cleanup Phaser if the React component unmounts
    return () => {
      FApp.gameService.destroy();
    };
  }, []);*/

  return (
    <>
      <DetailModal
        dialogueKey={ 'education' }
        title={ 'Education' }
        curriculum={ candidateCurriculum }
      />

      {/*<PlayerDialogue
        dialogueKey={ currentDialogKey }
        dialoguesSet={ dialoguesSet! }
        onOptionClick={ onDialogueOptionClick }
      />

      <div ref={ gameWrapper } className="game-wrapper z-0 test-border-green"/>*/ }
    </>
  );
}

export default ReactApp;
