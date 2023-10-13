import { Club } from '@/app/models/Club';
import { ClubUser } from '@/app/models/ClubUser';

import {
  CreateClubData,
  CreateClubParams,
  ICreateClub,
} from '../../interfaces/clubs/ICreateClub';

export class CreateClub implements ICreateClub {
  async run(params: CreateClubParams): Promise<CreateClubData> {
    const { club, first_admin_id, transaction } = params;

    const data = await Club.create(
      {
        name: club.name,
        active: true,
      },
      { transaction, raw: true },
    );

    await ClubUser.create(
      {
        club_id: data.id,
        user_id: first_admin_id,
      },
      {
        transaction,
        raw: true,
      },
    );

    return { data };
  }
}

export const makeCreateClub = new CreateClub();
