export const enum Language {
  FRENCH = 'FRENCH',
  ENGLISH = 'ENGLISH',
  SPANISH = 'SPANISH'
}

export interface INativeWord {
  id?: string;
  word?: string;
  lang?: Language;
}

export const defaultValue: Readonly<INativeWord> = {};
