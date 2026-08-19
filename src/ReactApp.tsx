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
import RecentHistory from './components/molecules/RecentHistory.tsx';
import ProfessionalHistory from './components/molecules/detailPageProfessionalHistory/ProfessionalHistory.tsx';
import CurrentActivities from './components/molecules/CurrentActivities.tsx';
import Achievements from './components/molecules/Achievements.tsx';
import Services from './components/molecules/Services.tsx';

function ReactApp() {
  const gameWrapper = useRef<HTMLDivElement | null>(null);
  const dialoguesSet = useElfSelector<DialoguesSetType>(getDialoguesSet);
  const [currentDialogKey, setCurrentDialogKey] = useState<DialoguesKeysType | null>(null);
  const [currentDetailKey, setCurrentDetailKey] = useState<DialoguesKeysType | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
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
    else if (value.modalKey && value.modalKey.length) {
      setCurrentDetailKey(value.modalKey as DialoguesKeysType);
      setShowDetailModal(true);
      FApp.store.ui.setProperty<boolean>('mapTriggersLocked', false);
    }
  };

  const onDetailCloseClick = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setShowDetailModal(false);
    setCurrentDetailKey(null);
  };

  const getPageTitle = (): string => {
    switch (currentDetailKey) {
      case dialoguesKeys.education:
        return 'Education';
      case dialoguesKeys.professionalHistory:
        return 'Professional History';
      case dialoguesKeys.recentHistory:
        return 'Recent History';
      case dialoguesKeys.whatImDoingNow:
        return 'Current Projects';
      case dialoguesKeys.professionalAchievements:
        return 'Professional Achievements';
      case dialoguesKeys.myHobbies:
        return 'Hobbies';
    }

    return '';
  };

  const renderDetailPage = (): ReactNode => {
    switch (currentDetailKey) {
      case dialoguesKeys.education:
        return <DetailPageEducation/>;
      case dialoguesKeys.professionalHistory:
        return <ProfessionalHistory/>;
      case dialoguesKeys.recentHistory:
        return <RecentHistory/>;
      case dialoguesKeys.whatImDoingNow:
        return <CurrentActivities/>;
      case dialoguesKeys.professionalAchievements:
        return <Achievements/>;
      case dialoguesKeys.productsAndServices:
        return <Services/>;
    }

    return null;
  };

  useEffect(() => {
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
  }, []);

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
      {
        (showDetailModal === true) && <DetailModal title={ getPageTitle() } onCloseClick={ onDetailCloseClick }>
          { renderDetailPage() }
        </DetailModal>
      }

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
