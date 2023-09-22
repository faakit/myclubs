import { HttpRequest } from '../types/HttpRequest';
import { HttpResponse } from '../types/HttpResponse';

export interface IController {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
