import { IUser } from '@/app/entities/IUser';

export type GetUserByEmailParams = {
  email: string;
};

export type GetUserByEmailData = {
  data: IUser;
};

export interface IGetUserByEmail {
  run(params: GetUserByEmailParams): Promise<GetUserByEmailData>;
}
