import { createRoot } from 'react-dom/client';
import ReactApp from '../../ReactApp.tsx';
import { select } from '@ngneat/elf';
import type { DialoguesSetType } from '../interfaces/DialogueSetType.ts';
import FApp from '../index.ts';
import type { EducationEntryInterface } from '../abstractions/education/EducationEntryInterface.ts';
import type { ProfessionalExperienceInterface } from '../abstractions/professional/ProfessionalExperienceInterface.ts';
import type { MeasurableResultInterface } from '../abstractions/professional/MeasurableResultInterface.ts';
import type { StarInterface } from '../abstractions/professional/StarInterface.ts';

export function renderReactApp() {
  const elRoot = document.getElementById('root');

  createRoot(elRoot!).render(
    // <StrictMode>
    <ReactApp/>
    // </StrictMode>
  );
}

export function getDialoguesSet() {
  return FApp.store.dialogues.pipe(
    select((state: DialoguesSetType) => state)
  );
}

export function separateEducationEntries(values: EducationEntryInterface[]): {
  formal: EducationEntryInterface[];
  others: EducationEntryInterface[];
} {
  return values.reduce(
    (groups, entry) => {
      if (entry.type === 'formal') {
        groups.formal.push(entry);
      } else {
        groups.others.push(entry);
      }

      return groups;
    },
    {
      formal: [],
      others: []
    } as {
      formal: EducationEntryInterface[];
      others: EducationEntryInterface[];
    }
  );
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function getMonthName(monthNumber: number, threeLetters: boolean = true): string | null {
  if (monthNumber < 0 || monthNumber > 11) {
    return null;
  }

  return threeLetters ? months[monthNumber].slice(0, 3).toUpperCase() : months[monthNumber];
}

export function getDateRange(experience: ProfessionalExperienceInterface): {
  range: string | null,
  tooltip: string | null
} | null {
  const startDateHasY = (experience.startDate && experience.startDate.year);
  const startDateHasM = (experience.startDate && experience.startDate.month);
  const startDateY = startDateHasY ? experience.startDate!.year : null;
  const startDateM = (startDateHasY && startDateHasM) ? experience.startDate!.month : null;
  const startDate = (startDateY && startDateM) ? `${ getMonthName(startDateM) } ${ startDateY }` : null;
  const startDateTooltip = (startDateY && startDateM) ? `${ getMonthName(startDateM, false) } ${ startDateY }` : null;

  const endDateHasY = (experience.endDate && experience.endDate.year);
  const endDateHasM = (experience.endDate && experience.endDate.month);
  const endDateY = endDateHasY ? experience.endDate!.year : null;
  const endDateM = (endDateHasY && endDateHasM) ? experience.endDate!.month : null;
  const endDate = (endDateY && endDateM) ? `${ getMonthName(endDateM) } ${ endDateY }` : null;
  const endDateTooltip = (endDateY && endDateM) ? `${ getMonthName(endDateM, false) } ${ endDateY }` : null;

  const range = (startDate && endDate) ? `${ startDate } - ${ endDate }` : null;
  const tooltip = range ? `From ${ startDateTooltip } to ${ endDateTooltip }` : null;

  return range ? { range, tooltip } : null;
}

export function capitalizeFirst(value: string) {
  return `${ String(value).charAt(0).toUpperCase() }${ String(value).slice(1) }`;
}

export function getSingleMuStatement(mu: MeasurableResultInterface): string {
  const unit = mu.unit
    ? mu.useFullUnit ? `${ mu.unit.name } (${ mu.unit.symbol })` : mu.unit.symbol
    : '';
  const unitSpace = (unit && mu.spaceBeforeUnit === true) ? ' ' : '';
  let output = '';

  output += `${ mu.descriptorPrefix } `;
  output += `${ mu.approxValue ? '~' : '' }${ mu.value }`;
  output += `${ unitSpace }${ unit }`;
  output += ` ${ mu.unitDescriptor }`;

  return output.trim();
}

export function getMuStatement(mus: MeasurableResultInterface[], separator: string = 'and'): string {
  const output: string[] = [];
  mus.forEach(mu => output.push(getSingleMuStatement(mu)));

  return output.join(` ${ separator } `).trim();
}

export function getActionStatement(actions: string[], closer: string = 'and'): string {
  const lastSegment = actions.pop();
  return `${ actions.join(', ') } ${ closer } ${ lastSegment }`;
}

export function getXyzStatement(star: StarInterface): string {
  let output = '';

  output += getMuStatement(star.results);
  output += ' by ';
  output += getActionStatement(star.actions);
  output += '.';

  return capitalizeFirst(output.trim());
}
