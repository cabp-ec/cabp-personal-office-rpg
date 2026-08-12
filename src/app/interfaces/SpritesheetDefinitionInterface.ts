import type { Types } from 'phaser';
import type { AssetDefinitionInterface } from './gameAssets/AssetDefinitionInterface.ts';

export interface SpritesheetDefinitionInterface extends AssetDefinitionInterface {
  frameConfig: Types.Loader.FileTypes.ImageFrameConfig;
}
