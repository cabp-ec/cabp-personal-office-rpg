export const characterAnimations = {
  idleDown: 'idle_down',
  walkDown: 'walk_down'
};

export type CharacterAnimationsType = typeof characterAnimations[keyof typeof characterAnimations];
