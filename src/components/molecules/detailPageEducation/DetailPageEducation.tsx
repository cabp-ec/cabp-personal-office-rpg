import type { DetailPageEducationPropsInterface } from './DetailPageEducationPropsInterface.ts';
import { separateEducationEntries } from '../../../app/utils/reactUtils.tsx';
import { InfoGroup } from '../infoGroup/InfoGroup.tsx';

export function DetailPageEducation({ data }: DetailPageEducationPropsInterface) {
  const groups = separateEducationEntries(data);
  const groupTitles = ['Formal Education', 'Other'];
  const groupSubTitles = [false, true];

  return (
    <div className="content w-100 test-border-red">
      {
        Object.keys(groups).map((groupKey, i) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          const g = groups[groupKey];
          const s = groupSubTitles[i];

          return (
            <InfoGroup
              key={ `key_ig_${ i }` }
              title={ groupTitles[i] }
              group={ g }
              subTitleKey={ s ? 'type' : null }
            />
          );
        })
      }
    </div>
  );
}
