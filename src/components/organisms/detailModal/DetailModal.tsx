import type { ComponentType } from 'react';
import type { DetailModalPropsInterface } from './DetailModalPropsInterface.ts';
import { DetailPageEducation } from '../../molecules/detailPageEducation/DetailPageEducation.tsx';
import { dialoguesKeys, type DialoguesKeysType } from '../../../app/enums/dialoguesKeys.ts';
import type {
  DetailPageEducationPropsInterface
} from '../../molecules/detailPageEducation/DetailPageEducationPropsInterface.ts';
import type { CurriculumVitaeInterface } from '../../../app/abstractions/curriculumVitae/CurriculumVitaeInterface.ts';
import { getPrevAndNextTitles } from '../../../app/utils/reactUtils.tsx';

const detailPages: Partial<Record<DialoguesKeysType, ComponentType<DetailPageEducationPropsInterface>>> = {
  [dialoguesKeys.education]: DetailPageEducation
};

export function DetailModal({ dialogueKey, title, curriculum }: DetailModalPropsInterface) {
  const DetailPageComponent = detailPages[dialogueKey] ?? null;
  const cvKey = dialogueKey as keyof CurriculumVitaeInterface;
  const cvKeys = Object.keys(curriculum);
  const prevAndNextTitles = getPrevAndNextTitles(dialogueKey, cvKeys, curriculum);

  return (
    <div className="modal d-flex align-items-center justify-content-center vh-100 w-100 test-border-green">
      <div className="book">
        <div className="page page-left text-light test-border-red align-content-between">
          <div className="title with-footer">
            <h2 className="m-0">{ curriculum[cvKey].subTitle || 'Charlie\'s' }</h2>
            <h1 className="m-0">{ title }</h1>
            <h3 className="m-0">A Short Version</h3>
          </div>

          {
            prevAndNextTitles && <footer className="">
              { prevAndNextTitles.prev && <a
                href="#"
                title={ prevAndNextTitles.prev.toUpperCase() }
                className="text-light"
              >
                [previous]
              </a> }

              { prevAndNextTitles.next && <a
                href="#"
                title={ prevAndNextTitles.next.toUpperCase() }
                className="text-light"
              >
                [next]
              </a> }

              | <a href="#" title="GO BACK TO MY LITTLE OFFICE" className="text-light">[close]</a>
            </footer>
          }
        </div>

        <div className="page page-right text-dark test-border-red">
          { DetailPageComponent && <DetailPageComponent data={ curriculum[cvKey].data }/> }
        </div>
      </div>
    </div>
  );
}
