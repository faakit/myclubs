import { Transaction } from 'sequelize';

import { IClient } from '@/app/entities/IClient';

export type FindClientByIdParams = {
  id?: number;
  transaction?: Transaction;
};

export type FindClientByIdData = {
  data: IClient;
};

export interface IFindClientById {
  run(params: FindClientByIdParams): Promise<FindClientByIdData>;
}
