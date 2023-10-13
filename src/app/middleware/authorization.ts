import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';

import { HttpStatusCode } from '../enums/HttpStatusCode';
import { Role } from '../enums/Role';
import { AccessTokenData, JWT } from '../utils/jwt';

export const authorization =
  (roles: Role[] = []) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        details: [
          {
            field: 'authorization',
            message: req.t('MISSING_PARAMS'),
          },
        ],
      });

      return;
    }

    const [prefix, token] = authorization.split(' ');

    if (prefix.toLowerCase() !== 'bearer') {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        details: [
          {
            field: 'authorization',
            message: req.t('INVALID_PARAMS'),
          },
        ],
      });

      return;
    }

    try {
      const { id, role, admin, clubs } = JWT.verify<AccessTokenData>(token);

      if (!roles.includes(role)) {
        res.status(HttpStatusCode.FORBIDDEN).json({
          success: false,
          details: [
            {
              field: 'authorization',
              message: req.t('NOT_ALLOWED'),
            },
          ],
        });

        return;
      }

      req.headers.role = String(role);
      req.headers.user_id = String(id);
      if (admin) req.headers.admin = admin.map(id => String(id));
      if (clubs) req.headers.clubs = clubs.map(id => String(id));

      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        res.status(401).json({
          success: false,
          details: [
            {
              field: 'authorization',
              message: req.t('EXPIRED_ACCESS_TOKEN'),
            },
          ],
        });
        return;
      }
      throw error;
    }
  };
