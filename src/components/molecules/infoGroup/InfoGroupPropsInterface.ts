import type { OrganizationalEntryInterface } from '../../../app/abstractions/OrganizationalEntryInterface.ts';

export interface InfoGroupPropsInterface {
  title: string;
  group: OrganizationalEntryInterface[];
  subTitleKey?: string | null;
}
