export const preloadableObjects = {
  image: 'image',
  tilemapTiledJSON: 'tilemapTiledJSON',
  json: 'json',
  atlas: 'atlas',
  animations: 'animations'
};

export type PreloadableObjectType = typeof preloadableObjects[keyof typeof preloadableObjects];
