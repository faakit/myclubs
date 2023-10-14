import { Transaction } from 'sequelize';

import { IClubClient } from '@/app/entities/IClubClient';

export type AssignClientToClubParams = {
  client_id?: number;
  club_id?: number;
  transaction?: Transaction;
};

export type AssignClientToClubData = {
  data: IClubClient;
};

export interface IAssignClientToClub {
  run(params: AssignClientToClubParams): Promise<AssignClientToClubData>;
}
