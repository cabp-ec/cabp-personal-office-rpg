import type { MouseEvent, ReactNode } from 'react';

export interface DetailModalPropsInterface {
  title: string;
  children: ReactNode;
  onCloseClick: (e: MouseEvent<HTMLAnchorElement>) => void;
  subTitle?: string;
}
