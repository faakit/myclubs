import { Request, Response, NextFunction } from 'express';
import Polyglot from 'node-polyglot';

import { localeStrings } from '../utils/localeStrings';

export const internationalization = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const polyglot = new Polyglot({
    phrases:
      localeStrings[req.headers['accept-language']] || localeStrings['pt-Br'],
  });

  req.t = (phrase: string, options?: Record<string, string>) =>
    polyglot.t(phrase, options);

  next();
};
