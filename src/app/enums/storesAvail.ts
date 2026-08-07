export const storesAvail = {
  ui: 'ui',
  user: 'user',
  session: 'session',
  sports: 'sports',
  countries: 'countries',
  cities: 'cities',
  playerObjectives: 'playerObjectives',
  gameState: 'gameState',
};

export type StoresAvailType = typeof storesAvail[keyof typeof storesAvail];
