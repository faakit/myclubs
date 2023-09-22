import { HttpStatusCode } from '../enums/HttpStatusCode';

export namespace HttpResponse {
  export type Meta = {
    current_page: number;
    current_page_records: number;
    first_page: boolean;
    last_page: boolean;
    total_pages: number;
    total_records: number;
  };

  export type Body = {
    success: boolean;
    [key: string]: unknown;
    message?: string;
    meta?: HttpResponse.Meta;
  };
}

export type HttpResponse = {
  statusCode: HttpStatusCode;
  body?: HttpResponse.Body;
};
