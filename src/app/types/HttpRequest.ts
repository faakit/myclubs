import { Role } from '../enums/Role';
import { Phrase } from './Phrase';

export namespace HttpRequest {
  export type QueryParams = {
    [key: string]: unknown;
    page_number?: number;
    page_size?: number;
  };
  export type Headers = {
    role?: Role;
    user_id?: string;
    admin?: string[];
    clubs?: string[];
    [key: string]: unknown;
  };
}

export type HttpRequest = {
  method?: string;
  path?: string;
  body?: Record<string, unknown>;
  params?: Record<string, string>;
  queryParams?: HttpRequest.QueryParams;
  headers?: HttpRequest.Headers;
  t?: (value: Phrase, options?: Record<string, string>) => string;
};
