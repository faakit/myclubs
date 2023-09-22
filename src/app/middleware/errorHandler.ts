import { NextFunction, Response, ErrorRequestHandler, Request } from 'express';
import { ValidationError } from 'joi';

import { HttpStatusCode } from '../enums/HttpStatusCode';
import { HttpError } from '../errors/HttpError';

export const errorHandler = (
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (error instanceof HttpError) {
    res.status(error.statusCode).json({
      success: false,
      message: req.t(error.message, error.messageOptions),
    });

    return;
  }

  if (error instanceof ValidationError) {
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

  res.status(HttpStatusCode.INTERNAL_ERROR).json({
    success: false,
    message: req.t('INTERNAL_SERVER_ERROR'),
  });

  console.error(error);
  next(error);
};
