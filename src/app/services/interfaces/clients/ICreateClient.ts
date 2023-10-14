import { Transaction } from 'sequelize';

import { IClient } from '@/app/entities/IClient';

export type CreateClientParams = {
  client: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    cpf: string;
  };
  transaction: Transaction;
};

export type CreateClientData = {
  data: IClient;
};

export interface ICreateClient {
  run(params: CreateClientParams): Promise<CreateClientData>;
}
