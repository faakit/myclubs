import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';

import { HttpStatusCode } from '../enums/HttpStatusCode';

export type ValidationType = 'body' | 'headers' | 'params' | 'query';

export const validator = (
  schema: Schema,
  type: ValidationType = 'body',
  allowUnknown = false,
  transform?: boolean,
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req[type], {
      abortEarly: false,
      allowUnknown,
    });

    if (transform) req[type] = value;

    if (error) {
      const details = error.details.map(detail => ({
        field: detail.context.label,
        message:
          detail.type === 'any.required'
            ? req.t('MISSING_PARAMS')
            : req.t('INVALID_PARAMS'),
      }));

      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        details,
        error,
      });
      return;
    }
    next();
  };
};
