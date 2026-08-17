import type { ExperienceContextInterface } from './ExperienceContextInterface.ts';
import type { EntityInterface } from '../../interfaces/EntityInterface.ts';
import type { MeasurableResultInterface } from './MeasurableResultInterface.ts';

export interface StarInterface extends EntityInterface {
  context: ExperienceContextInterface;
  actions: string[];
  results: MeasurableResultInterface[];
}
