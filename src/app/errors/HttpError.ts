import { HttpStatusCode } from '../enums/HttpStatusCode';
import { Phrase } from '../types/Phrase';

export class HttpError extends Error {
  message: Phrase;
  messageOptions: Record<string, string>;
  statusCode: HttpStatusCode;

  constructor(
    message: Phrase,
    messageOptions: Record<string, string> = {},
    statusCode = HttpStatusCode.BAD_REQUEST,
  ) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
    this.statusCode = statusCode;
    this.name = 'HttpError';
    this.messageOptions = messageOptions;
  }
}
