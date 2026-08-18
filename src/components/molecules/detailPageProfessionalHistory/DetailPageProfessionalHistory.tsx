import FApp from '../../../app';
import type { EducationInfoGroupsInterface } from '../../../app/services/CurriculumService.ts';
import { capitalizeFirst, getXyzStatement } from '../../../app/utils/reactUtils.tsx';
import type {
  ProfessionalExperienceInterface
} from '../../../app/abstractions/professional/ProfessionalExperienceInterface.ts';

function DetailPageProfessionalHistory() {
  const renderData = FApp.curriculumService.getProfessionalExperiences();
  console.warn('renderData', renderData);

  return (
    <>
      <div className="content text-dark w-100 test-border-red">
        {
          renderData.map((experience, ei) => {
            const roleSub = [
              experience.seniority,
              experience.contractor ? 'Contractor':'',
              experience.remote ? 'Remote':''
            ];

            return (
              <div key={ `key_ei_${ ei }` } className="info-group">
                <header>
                  <h2 className="m-0">{ capitalizeFirst(experience.organization) }</h2>
                  <h3 className="m-0">{ capitalizeFirst(experience.name) }</h3>
                  <h5 className="m-0">{ roleSub.join(' | ') }</h5>
                </header>

                <div className="entry-list">
                  {
                    experience.projects.map((project, pi) => {
                      const sd = `${ project.startDate!.year }-${ project.startDate!.month }`;
                      const ed = `${ project.endDate!.year }-${ project.endDate!.month }`;

                      return (
                        <div key={ `key_pi_${ pi }` } className="mb-2">
                          <h4 className="m-0">{ project.name }</h4>
                          <p className="fs-13">Customer: { project.organization } ({ `${ sd } / ${ ed }` })</p>
                          <p className="fs-13">Fixed-Term: yes</p>
                          <ul className="fs-12">
                            {
                              project.stars.map((star, psi) => {
                                return (
                                  <li key={ `key_peps_${ psi }` }>
                                    { getXyzStatement(star) }
                                  </li>
                                );
                              })
                            }
                          </ul>
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

      <footer>
        <div>
          <a href="#" title="PREVIOUS EXPERIENCE" className="text-dark">[↶]</a>
          <a href="#" title="PREVIOUS PROJECT" className="text-dark">[←]</a>
        </div>
        <div>
          <a href="#" title="NEXT PROJECT" className="text-dark">[→]</a>
          <a href="#" title="NEXT EXPERIENCE" className="text-dark">[↷]</a>
        </div>
      </footer>
    </>
  );
}

/*
import { useState } from 'react';
import type { DetailPageProfessionalHistoryPropsInterface } from './DetailPageProfessionalHistoryPropsInterface.ts';
import { getDateRange, getXyzStatement } from '../../../app/utils/reactUtils.tsx';
import type {
  ProfessionalExperienceInterface
} from '../../../app/abstractions/professional/ProfessionalExperienceInterface.ts';
import type { ProjectInterface } from '../../../app/abstractions/project/ProjectInterface.ts';

function DetailPageProfessionalHistory({ data, showExperiencePager }: DetailPageProfessionalHistoryPropsInterface) {
  const [experienceIndex, setExperienceIndex] = useState<number>(0);
  const [projectIndex, setProjectIndex] = useState<number>(0);
  const [experience, setExperience] = useState<ProfessionalExperienceInterface>(data[experienceIndex]);
  const [project, setProject] = useState<ProjectInterface>(experience.projects[projectIndex]);
  const [showProjectPager, setShowProjectPager] = useState<boolean>(experience.projects.length > 1);
  const dateRange = getDateRange(experience);

  const onPrevProjectClick = (): void => {
    const index = projectIndex - 1;

    if (index < 0) {
      return;
    }

    setProjectIndex(index);
    setProject(experience.projects[index]);
  };

  const onNextProjectClick = (): void => {
    const index = projectIndex + 1;

    if (index > experience.projects.length - 1) {
      return;
    }

    setProjectIndex(index);
    setProject(experience.projects[index]);
  };

  return (
    <>
      <div className="content w-100">
        <div className="info-group">
          <header>
            <h2 className="m-0">{ experience.organization }</h2>
            <h3 className="m-0">{ experience.name }</h3>
            { dateRange && <h5 title={ dateRange.tooltip! } className="">{ dateRange.range }</h5> }
          </header>

          <div className="entry-list">
            <div>
              <header className="m-0">
                <h4 className="m-0">{ project.name }</h4>
                <h5 className="m-0">Customer: { project.organization }</h5>
              </header>

              <ul className="fs-12">
                {
                  project.stars.map((star, psi) => {
                    return (
                      <li key={ `key_peps_${ psi }` }>
                        { getXyzStatement(star) }
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="">
        <div>
          { showExperiencePager &&
            <a href="#" title="PREVIOUS EXPERIENCE" className="text-dark">[↶]</a>
          }
          { showProjectPager &&
            <a href="#" onClick={ onPrevProjectClick } title="PREVIOUS PROJECT" className="text-dark">[←]</a>
          }
        </div>
        <div>
          { showProjectPager &&
            <a href="#" onClick={ onNextProjectClick } title="NEXT PROJECT" className="text-dark">[→]</a>
          }
          { showExperiencePager &&
            <a href="#" title="NEXT EXPERIENCE" className="text-dark">[↷]</a>
          }
        </div>
      </footer>
    </>
  );
}

export default DetailPageProfessionalHistory;
*/

export default DetailPageProfessionalHistory;
