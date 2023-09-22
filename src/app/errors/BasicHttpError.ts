import { HttpStatusCode } from '../enums/HttpStatusCode';
import { Phrase } from '../types/Phrase';
import { HttpError } from './HttpError';

export class BasicHttpError extends HttpError {
  constructor(message: Phrase, statusCode: HttpStatusCode) {
    super(message, {}, statusCode);
  }
}
