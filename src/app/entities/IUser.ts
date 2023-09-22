import { Role } from '../enums/Role';
import { IClub } from './IClub';

export type IUser = {
  id?: number;
  name?: string;
  role?: Role;
  email?: string;
  password_hash?: string;
  created_at?: Date | string;
  updated_at?: Date | string;

  clubs?: IClub[];
};
