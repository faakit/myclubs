import { DataTypes, Model } from 'sequelize';

import { IClient } from '@/app/entities/IClient';

import database from '.';

export class Client extends Model implements IClient {
  id?: number;
  cpf?: string;
  f_name?: string;
  l_name?: string;
  updated_at?: Date | string;
  created_at?: Date | string;
}

Client.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT({ unsigned: true }),
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    cpf: {
      allowNull: false,
      type: DataTypes.STRING(11),
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
    tableName: 'client',
    sequelize: database,
  },
);
