import { Request } from 'express';
import morgan from 'morgan';

export const logger = morgan((tokens, request: Request, response) => {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    '|',
    JSON.stringify(request.body),
    '- Response Time',
    tokens['response-time'](request, response),
    'ms',
  ].join(' ');
});
