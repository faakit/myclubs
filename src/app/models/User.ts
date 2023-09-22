import { DataTypes, Model } from 'sequelize';

import database from '.';
import { IUser } from '../entities/IUser';
import { Role } from '../enums/Role';

export class User extends Model implements IUser {
  id?: number;
  name?: string;
  role?: Role;
  email?: string;
  password_hash?: string;

  created_at?: Date | string;
  updated_at?: Date | string;
}

User.init(
  {
    id: {
      type: DataTypes.BIGINT({ unsigned: true }),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      allowNull: false,
      type: DataTypes.TINYINT(),
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    password_hash: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    created_at: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'user',
    sequelize: database,
  },
);
