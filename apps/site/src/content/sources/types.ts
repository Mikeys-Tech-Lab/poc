export interface DirectSourceEntry {
  readonly id: string;
  readonly label: string;
  readonly title: string;
  readonly href: string;
  readonly supports: string;
  readonly limits: string;
}

export interface FurtherReadingEntry {
  readonly id: string;
  readonly title: string;
  readonly href: string;
  readonly note: string;
}
