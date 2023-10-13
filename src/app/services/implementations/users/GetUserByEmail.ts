import { User } from '@/app/models/User';

import {
  GetUserByEmailData,
  GetUserByEmailParams,
  IGetUserByEmail,
} from '../../interfaces/users/IGetUserByEmail';

export class GetUserByEmail implements IGetUserByEmail {
  async run(params: GetUserByEmailParams): Promise<GetUserByEmailData> {
    const { email } = params;

    try {
      const data = (
        await User.findOne({
          where: { email },
          include: [
            {
              association: 'clubs',
              through: { attributes: [] },
              attributes: ['id', 'name'],
            },
          ],
        })
      ).toJSON();

      return { data };
    } catch (error) {
      return { data: null };
    }
  }
}

export const makeGetUserByEmail = new GetUserByEmail();
