import { Transaction } from 'sequelize';

import { IClub } from '@/app/entities/IClub';

export type CreateClubParams = {
  club: {
    name: string;
  };
  first_admin_id: number;
  transaction: Transaction;
};

export type CreateClubData = {
  data: IClub;
};

export interface ICreateClub {
  run(params: CreateClubParams): Promise<CreateClubData>;
}
