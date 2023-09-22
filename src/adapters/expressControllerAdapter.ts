import { Request, Response } from 'express';

import { HttpStatusCode } from '@/app/enums/HttpStatusCode';
import { IController } from '@/app/interfaces/IController';

export const expressControllerAdapter = (controller: IController) => {
  return async (request: Request, response: Response): Promise<void> => {
    Object.keys(request.params).forEach(key => {
      if (isNaN(Number(request.params[key]))) {
        response.status(HttpStatusCode.BAD_REQUEST).json({
          success: false,
          message: request.t('ROUTE_INVALID_PARAMS'),
        });
        return;
      }
    });
    const { statusCode, body } = await controller.handle({
      headers: {
        ...(request.headers as Record<string, unknown>),
        user_id: Number(request.headers.user_id),
      },
      body: request.body,
      method: request.method,
      path: request.path,
      params: request.params,
      queryParams: {
        ...request.query,
        page_number: request.page_number,
        page_size: request.page_size,
      },
      t: request.t,
    });

    response.status(statusCode).json(body);
  };
};
