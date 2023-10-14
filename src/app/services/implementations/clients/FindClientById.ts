import { Client } from '@/app/models/Client';

import {
  FindClientByIdData,
  FindClientByIdParams,
  IFindClientById,
} from '../../interfaces/clients/IFindClientById';

export class FindClientById implements IFindClientById {
  async run(params: FindClientByIdParams): Promise<FindClientByIdData> {
    const { id, transaction } = params;

    const data = (
      await Client.findOne({
        where: {
          id,
        },
        transaction,
      })
    ).toJSON();

    return {
      data,
    };
  }
}

export const makeFindClientById = new FindClientById();
