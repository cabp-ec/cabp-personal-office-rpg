import { useRef, useEffect } from 'react';

import FApp from './app';

function ReactApp() {
  const gameWrapper = useRef<HTMLDivElement | null>(null);

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
      <div ref={ gameWrapper } className="game-wrapper vh-100 w-100 z-0 test-border-green"/>
    </>
  );
}

export default ReactApp;
