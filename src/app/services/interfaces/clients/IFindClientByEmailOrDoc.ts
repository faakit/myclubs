import { Transaction } from 'sequelize';

import { IClient } from '@/app/entities/IClient';

export type FindClientByEmailOrDocParams = {
  email?: string;
  cpf?: string;
  transaction?: Transaction;
};

export type FindClientByEmailOrDocData = {
  data: IClient;
};

export interface IFindClientByEmailOrDoc {
  run(
    params: FindClientByEmailOrDocParams,
  ): Promise<FindClientByEmailOrDocData>;
}
