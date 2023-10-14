import { Role } from '@/app/enums/Role';
import { User } from '@/app/models/User';
import { Hashing } from '@/app/utils/hashing';

import {
  CreateUserData,
  CreateUserParams,
  ICreateUser,
} from '../../interfaces/users/ICreateUser';

export class CreateUser implements ICreateUser {
  async run({
    transaction,
    user: { email, name, password, role = Role.Admin },
  }: CreateUserParams): Promise<CreateUserData> {
    const password_hash = await Hashing.parse(password);

    const data = (
      await User.create(
        {
          name,
          email,
          password_hash,
          role,
        },
        { transaction },
      )
    ).toJSON();

    return { data };
  }
}

export const makeCreateUser = new CreateUser();
