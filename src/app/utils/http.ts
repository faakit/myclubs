/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// regra do eslint comentada pois esse tipos devem ser any

import { HttpStatusCode } from '../enums/HttpStatusCode';
import { HttpResponse } from '../types/HttpResponse';

export const okResponse = (
  data: any,
  dataName: string,
  meta?: HttpResponse.Meta,
): HttpResponse => ({
  statusCode: HttpStatusCode.OK,
  body: {
    success: true,
    [dataName]: data,
    meta,
  },
});

export const noContentResponse = (): HttpResponse => ({
  statusCode: HttpStatusCode.OK,
  body: {
    success: true,
  },
});

export const createdResponse = (data: any, dataName: string): HttpResponse => ({
  statusCode: HttpStatusCode.CREATED,
  body: {
    success: true,
    [dataName]: data,
  },
});
