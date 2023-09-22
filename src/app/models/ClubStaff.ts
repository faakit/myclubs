import { DataTypes, Model } from 'sequelize';

import database from '.';
import { IClubStaff } from '../entities/IClubStaff';
import { Club } from './Club';
import { User } from './User';

export class ClubStaff extends Model implements IClubStaff {
  id?: number;
  club_id?: number;
  user_id?: number;
  updated_at?: Date | string;
  created_at?: Date | string;
}

ClubStaff.init(
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
    user_id: {
      allowNull: false,
      type: DataTypes.BIGINT({ unsigned: true }),
      references: {
        key: 'id',
        model: User,
      },
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
    tableName: 'club_Staff',
    sequelize: database,
  },
);
