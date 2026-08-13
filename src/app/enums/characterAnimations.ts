export const characterAnimations = {
  idleUp: 'idleUp',
  idleRight: 'idleRight',
  idleDown: 'idleDown',
  idleLeft: 'idleLeft',
  walkUp: 'walkUp',
  walkRight: 'walkRight',
  walkDown: 'walkDown',
  walkLeft: 'walkLeft'
};

export type CharacterAnimationsType = typeof characterAnimations[keyof typeof characterAnimations];
