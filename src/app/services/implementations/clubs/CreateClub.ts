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

    const data = (
      await Club.create(
        {
          name: club.name,
          active: true,
        },
        { transaction },
      )
    ).toJSON();

    await ClubUser.create(
      {
        club_id: data.id,
        user_id: first_admin_id,
      },
      {
        transaction,
      },
    );

    return { data };
  }
}

export const makeCreateClub = new CreateClub();
