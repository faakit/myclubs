import { DataTypes, Model } from 'sequelize';

import { IClub } from '@/app/entities/IClub';

import database from '.';

export class Club extends Model<IClub> {
  id?: number;
  name?: string;
  updated_at?: Date | string;
  created_at?: Date | string;
}

Club.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT({ unsigned: true }),
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    active: {
      allowNull: false,
      defaultValue: true,
      type: DataTypes.BOOLEAN,
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
    tableName: 'club',
    sequelize: database,
  },
);
