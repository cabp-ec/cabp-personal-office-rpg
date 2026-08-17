import { useRef, useState, useEffect, type MouseEvent, type ReactNode } from 'react';
import { select } from '@ngneat/elf';

import type { DialoguesSetType } from './app/interfaces/DialogueSetType.ts';
import type { UiStateInterface } from './app/interfaces/UiStateInterface.ts';
import type { VisitorDialogueOptionInterface } from './app/interfaces/dialogs/VisitorDialogueOptionInterface.ts';
import { GameScene } from './app/scenes/GameScene.ts';

import FApp from './app';
import { useElfSelector } from './app/hooks/useElf.ts';
import { getDialoguesSet } from './app/utils/reactUtils.tsx';
import PlayerDialogue from './components/organisms/playerDialogue/PlayerDialogue.tsx';
import DetailModal from './components/organisms/detailModal/DetailModal.tsx';
import { dialoguesKeys, type DialoguesKeysType } from './app/enums/dialoguesKeys.ts';
import { candidateCurriculum } from '../resources/staticData/candidateCurriculum.ts';
import { DetailPageEducation } from './components/molecules/detailPageEducation/DetailPageEducation.tsx';
import DetailPageProfessionalHistory
  from './components/molecules/detailPageProfessionalHistory/DetailPageProfessionalHistory.tsx';

function ReactApp() {
  const gameWrapper = useRef<HTMLDivElement | null>(null);
  const dialoguesSet = useElfSelector<DialoguesSetType>(getDialoguesSet);
  const [currentDialogKey, setCurrentDialogKey] = useState<DialoguesKeysType | null>(null);
  const [currentDetailKey, setCurrentDetailKey] = useState<DialoguesKeysType | null>(dialoguesKeys.professionalHistory);
  const cvKeys = Object.keys(candidateCurriculum);

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

  const onDetailCloseClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setCurrentDetailKey(null);
  };

  const renderDetailPage = (): ReactNode => {
    switch (currentDetailKey) {
      case dialoguesKeys.education:
        return <DetailPageEducation/>;
      case dialoguesKeys.professionalHistory:
        return <DetailPageProfessionalHistory/>
    }

    return null;
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
      {
        <DetailModal
          title={ 'education' }
          onCloseClick={ onDetailCloseClick }
        >
          { renderDetailPage() }
        </DetailModal>
      }

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
