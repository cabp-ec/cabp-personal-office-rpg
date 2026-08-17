import type { EducationInfoGroupsInterface } from '../../../app/services/CurriculumService.ts';
import { capitalizeFirst } from '../../../app/utils/reactUtils.tsx';
import FApp from '../../../app';

export function DetailPageEducation() {
  const renderData = FApp.curriculumService.getEducationRenderData();

  return (
    <div className="content text-dark w-100 test-border-red">
      {
        Object.keys(renderData).map((groupKey, i) => {
          const group = renderData[groupKey as keyof EducationInfoGroupsInterface];

          return (
            <div key={ `key_ig_${ i }` } className="info-group">
              <header>
                <h2 className="m-0">{ capitalizeFirst(group.title) }</h2>
              </header>

              <div className="entry-list">
                {
                  group.data.map((entry, ii) => {
                    return (
                      <div key={ `key_if_${ ii }` } className="mb-2">
                        <h3 className="m-0">{ entry.name }, { entry.endDate!.year }</h3>
                        <p>{ entry.organization }, { entry.country.name }</p>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          );
        })
      }
    </div>
  );
}
