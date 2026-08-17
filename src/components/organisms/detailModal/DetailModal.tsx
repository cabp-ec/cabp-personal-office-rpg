import { type ReactNode, useState } from 'react';
import type { DetailModalPropsInterface } from './DetailModalPropsInterface.ts';
import type { CurriculumVitaeInterface } from '../../../app/abstractions/curriculumVitae/CurriculumVitaeInterface.ts';
import type { EducationEntryInterface } from '../../../app/abstractions/education/EducationEntryInterface.ts';
import type {
  ProfessionalExperienceInterface
} from '../../../app/abstractions/professional/ProfessionalExperienceInterface.ts';
import { DetailPageEducation } from '../../molecules/detailPageEducation/DetailPageEducation.tsx';
import DetailPageProfessionalHistory
  from '../../molecules/detailPageProfessionalHistory/DetailPageProfessionalHistory.tsx';
import { dialoguesKeys } from '../../../app/enums/dialoguesKeys.ts';

function DetailModal({ dialogueKey, curriculum, onCloseClick }: DetailModalPropsInterface) {
  const [showPager, setShowPager] = useState<boolean>(false);
  const cvKey = dialogueKey as keyof CurriculumVitaeInterface;

  const renderDetailPage = (): ReactNode => {
    switch (cvKey) {
      case (dialoguesKeys.education):
        return <DetailPageEducation
          data={ curriculum[cvKey].data as EducationEntryInterface[] }
        />;
      case (dialoguesKeys.professionalHistory):
        return <DetailPageProfessionalHistory
          data={ curriculum[cvKey].data as ProfessionalExperienceInterface[] }
          showExperiencePager={ curriculum[cvKey].data.length > 1 }
        />;
    }

    return null;
  };

  return (
    <div className="modal d-flex align-items-center justify-content-center vh-100 w-100 test-border-green">
      <div className="book">
        <div className="page page-left text-light test-border-red align-content-between">
          <div className="title with-footer">
            <h2 className="m-0">{ curriculum[cvKey].subTitle || 'Charlie\'s' }</h2>
            <h1 className="m-0">{ curriculum[cvKey].title }</h1>
            <h3 className="m-0">A Short Version</h3>
          </div>

          <footer className="">
            <a href="#" onClick={ onCloseClick } title="GO BACK TO MY LITTLE OFFICE" className="text-light">[close]</a>
          </footer>
        </div>

        <div className="page page-right text-dark test-border-red">
          { renderDetailPage() }
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
