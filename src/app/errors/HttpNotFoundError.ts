import { HttpStatusCode } from '../enums/HttpStatusCode';
import { HttpError } from './HttpError';

export class HttpNotFoundError extends HttpError {
  constructor(model_en: string, model_pt: string) {
    super('NOT_FOUND', { model_en, model_pt }, HttpStatusCode.NOT_FOUND);
  }
}
