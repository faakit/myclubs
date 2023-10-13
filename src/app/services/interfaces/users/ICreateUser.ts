import { Transaction } from 'sequelize';

import { IUser } from '@/app/entities/IUser';
import { Role } from '@/app/enums/Role';

export type CreateUserParams = {
  user: {
    name: string;
    email: string;
    password: string;
    role?: Role;
  };
  transaction: Transaction;
};

export type CreateUserData = {
  data: IUser;
};

export interface ICreateUser {
  run(params: CreateUserParams): Promise<CreateUserData>;
}
