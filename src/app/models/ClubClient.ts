import { DataTypes, Model } from 'sequelize';

import database from '.';
import { IClubClient } from '../entities/IClubClient';
import { Client } from './Client';
import { Club } from './Club';

export class ClubClient extends Model<IClubClient> {
  id?: number;
  club_id: number;
  client_id: number;
  card_number: string;
  active?: boolean;
  updated_at?: Date | string;
  created_at?: Date | string;
}

ClubClient.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT({ unsigned: true }),
    },
    club_id: {
      allowNull: false,
      type: DataTypes.BIGINT({ unsigned: true }),
      references: {
        key: 'id',
        model: Club,
      },
    },
    client_id: {
      allowNull: false,
      type: DataTypes.BIGINT({ unsigned: true }),
      references: {
        key: 'id',
        model: Client,
      },
    },
    card_number: {
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
    tableName: 'club_client',
    sequelize: database,
  },
);
