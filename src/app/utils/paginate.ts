import { HttpResponse } from '../types/HttpResponse';

type MakeHttpResponseMetaParams = {
  page_number: number;
  page_size: number;
  page_records: number;
  total_records: number;
};
export const makeHttpResponseMeta = (
  params: MakeHttpResponseMetaParams,
): HttpResponse.Meta => {
  const { page_number, page_records, page_size, total_records } = params;

  const total_pages = Math.ceil(total_records / page_size);
  const first_page = total_records === 0 ? true : page_number === 1;
  const last_page = total_records === 0 ? true : page_number === total_pages;

  return {
    current_page: page_number,
    current_page_records: page_records,
    first_page,
    last_page,
    total_pages,
    total_records,
  };
};

type MakeOffsetParams = {
  page_number: number;
  page_size: number;
};
export const makeOffset = (params: MakeOffsetParams): number => {
  const { page_size, page_number } = params;

  return page_size * (page_number - 1);
};
