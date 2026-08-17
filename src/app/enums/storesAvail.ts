export const storesAvail = {
  ui: 'ui',
  user: 'user',
  session: 'session',
  dialogues: 'dialogues',
  sports: 'sports',
  countries: 'countries',
  cities: 'cities',
  playerObjectives: 'playerObjectives',
  gameState: 'gameState',
  educationHeader: 'educationHeader',
  educationExperiences: 'educationExperiences',
  experiences: 'experiences'
};

export type StoresAvailType = typeof storesAvail[keyof typeof storesAvail];
