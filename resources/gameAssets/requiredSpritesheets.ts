import type { SpritesheetDefinitionInterface } from '../../src/app/interfaces/SpritesheetDefinitionInterface.ts';

export const requiredSpritesheets: Record<string, SpritesheetDefinitionInterface> = {
  candidate: {
    asset: '/assets/lpc/mc_sprite.png',
    frameConfig: { frameWidth: 64, frameHeight: 64 }
  }
};
