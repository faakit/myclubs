import { NextFunction, Request, Response } from 'express';

export const paginateHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { page_number, page_size } = req.query;
  req.page_number = Number(page_number) || 1;
  req.page_size = Number(page_size) || 50;

  next();
};
