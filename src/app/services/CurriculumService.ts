import type { ServiceInterface } from '../interfaces/ServiceInterface.ts';
import type { EducationEntryInterface } from '../abstractions/education/EducationEntryInterface.ts';
import type { EducationCvEntryInterface } from '../abstractions/education/EducationCvEntryInterface.ts';
import type { ProfessionalExperienceInterface } from '../abstractions/professional/ProfessionalExperienceInterface.ts';
import { StoreService } from './StoreService.ts';

export interface EducationInfoGroupsInterface {
  formal: EducationCvEntryInterface;
  other: EducationCvEntryInterface;
}

export class CurriculumService implements ServiceInterface {
  #initialized = false;
  #store: StoreService;

  constructor(store: StoreService) {
    this.#store = store;
  }

  public getEducationRenderData(): EducationInfoGroupsInterface {
    const data = this.#store.educationExperiences.state<EducationEntryInterface>();
    const formal: EducationEntryInterface[] = [];
    const other: EducationEntryInterface[] = [];

    data.ids.forEach((id) => {
      const entity = data.entities[id];

      if (entity.type === 'formal') {
        formal.push(entity);
      } else {
        other.push(entity);
      }
    });

    return {
      formal: { title: 'formal', data: formal },
      other: { title: 'other', data: other }
    };
  }

  public getProfessionalExperiences(): ProfessionalExperienceInterface[] {
    return this.#store.experiences.getAllEntities<ProfessionalExperienceInterface>();
  }

  /**
   * @inheritDoc
   */
  public initialized(): boolean {
    return this.#initialized;
  }
}
