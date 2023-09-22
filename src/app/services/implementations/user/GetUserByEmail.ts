import { User } from '@/app/models/User';

import {
  GetUserByEmailData,
  GetUserByEmailParams,
  IGetUserByEmail,
} from '../../interfaces/user/IGetUserByEmail';

export class GetUserByEmail implements IGetUserByEmail {
  async run(params: GetUserByEmailParams): Promise<GetUserByEmailData> {
    const { email } = params;

    const data = await User.findOne({ where: { email } });

    return { data };
  }
}
