export const imagesKeys = {
  house: 'house',
  office: 'office'
};

export type imagesKeysType = typeof imagesKeys[keyof typeof imagesKeys];
