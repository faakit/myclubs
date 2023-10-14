import { Client } from '@/app/models/Client';
import { Hashing } from '@/app/utils/hashing';

import {
  ICreateClient,
  CreateClientParams,
  CreateClientData,
} from '../../interfaces/clients/ICreateClient';

export class CreateClient implements ICreateClient {
  async run({
    transaction,
    client,
  }: CreateClientParams): Promise<CreateClientData> {
    const password_hash = await Hashing.parse(client.password);
    delete client.password;

    const data = (
      await Client.create(
        {
          ...client,
          password_hash,
        },
        { transaction },
      )
    ).toJSON();

    return { data };
  }
}

export const makeCreateClient = new CreateClient();
