import { Includeable, WhereOptions } from 'sequelize';

import { Client } from '@/app/models/Client';
import { makeHttpResponseMeta, makeOffset } from '@/app/utils/paginate';

import {
  IListClients,
  ListClientsData,
  ListClientsParams,
} from '../../interfaces/clients/IListClients';

export class ListClients implements IListClients {
  async run(params: ListClientsParams): Promise<ListClientsData> {
    const { name, cpf, email, club_id, paginate } = params;
    const { page_number, page_size } = paginate;

    const offset = makeOffset({ page_number, page_size });

    const where: WhereOptions = {};

    if (name) {
      where.first_name = { iLike: `%${name}%` };
      where.last_name = { iLike: `%${name}%` };
    }
    if (cpf) where.cpf = cpf;
    if (email) where.email = { iLike: `%${email}%` };

    const include: Includeable[] = [
      { association: 'clubs', through: { attributes: [] } },
    ];

    if (club_id) {
      // todo
    }

    const { rows: clients, count } = await Client.findAndCountAll({
      where,
      offset,
      order: [['updated_at', 'DESC']],
      limit: page_size,
      include,
    });

    const meta = makeHttpResponseMeta({
      page_number,
      page_records: clients.length,
      total_records: count,
      page_size,
    });

    return { data: clients, meta };
  }
}
