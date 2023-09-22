/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace Express {
  type Phrase = keyof typeof import('../../utils/localeStrings')['localeStrings']['pt-Br'];

  export interface Request {
    t?: (value: Phrase, options?: Record<string, string>) => string;
    page_number: number;
    page_size: number;
  }
}
