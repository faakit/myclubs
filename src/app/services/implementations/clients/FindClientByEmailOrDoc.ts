import { Client } from '@/app/models/Client';

import {
  FindClientByEmailOrDocData,
  FindClientByEmailOrDocParams,
  IFindClientByEmailOrDoc,
} from '../../interfaces/clients/IFindClientByEmailOrDoc';

export class FindClientByEmailOrDoc implements IFindClientByEmailOrDoc {
  async run(
    params: FindClientByEmailOrDocParams,
  ): Promise<FindClientByEmailOrDocData> {
    const { email, cpf, transaction } = params;

    const data = (
      await Client.findOne({
        where: {
          email,
          cpf,
        },
        transaction,
      })
    ).toJSON();

    return {
      data,
    };
  }
}

export const makeFindClientByEmailOrDoc = new FindClientByEmailOrDoc();
