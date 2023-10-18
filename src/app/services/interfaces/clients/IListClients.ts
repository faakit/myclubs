import { IClient } from '@/app/entities/IClient';
import { HttpResponse } from '@/app/types/HttpResponse';
import { IPaginate } from '@/app/types/Paginate';

export type ListClientsParams = {
  name?: string;
  cpf?: string;
  email?: string;
  club_id?: number;
  paginate: IPaginate;
};

export type ListClientsData = {
  data: IClient[];
  meta: HttpResponse.Meta;
};

export interface IListClients {
  run(params: ListClientsParams): Promise<ListClientsData>;
}
