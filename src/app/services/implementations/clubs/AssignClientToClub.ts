import { HttpNotFoundError } from '@/app/errors/HttpNotFoundError';
import { Client } from '@/app/models/Client';
import { ClubClient } from '@/app/models/ClubClient';

import {
  AssignClientToClubData,
  AssignClientToClubParams,
  IAssignClientToClub,
} from '../../interfaces/clubs/IAssignClientToClub';

export class AssignClientToClub implements IAssignClientToClub {
  async run(params: AssignClientToClubParams): Promise<AssignClientToClubData> {
    const { client_id, club_id, card_number, transaction } = params;

    const clientExists = await Client.findOne({
      where: {
        id: client_id,
      },
      transaction,
    });

    if (!clientExists) {
      throw new HttpNotFoundError('Client', 'Cliente');
    }

    const data = await ClubClient.create(
      {
        client_id,
        club_id,
        active: true,
        card_number: card_number || String(client_id),
      },
      { transaction },
    );

    return { data };
  }
}

export const makeAssignClientToClub = new AssignClientToClub();
