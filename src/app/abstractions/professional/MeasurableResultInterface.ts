import type { EntityInterface } from '../../interfaces/EntityInterface.ts';
import type { MeasurableUnitInterface } from '../MeasurableUnitInterface.ts';

// "0% downtime after migration"
// "~12 TB of migrated files (clinical compliance data, user-generated files, usage and telemetry logs)"
export interface MeasurableResultInterface extends EntityInterface {
  unit: MeasurableUnitInterface | null;
  useFullUnit: boolean;
  spaceBeforeUnit: boolean;
  value: number;
  starterText?: string | null | undefined;
  descriptorPrefix: string;
  unitDescriptor: string;
  approxValue?: boolean;
}
