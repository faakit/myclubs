import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('club_client', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT({ unsigned: true }),
    },
    user_id: {
      allowNull: false,
      type: DataTypes.BIGINT({ unsigned: true }),
      references: {
        model: 'user',
        key: 'id',
      },
    },
    club_id: {
      allowNull: false,
      type: DataTypes.BIGINT({ unsigned: true }),
      references: {
        model: 'club',
        key: 'id',
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
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('club_client');
}
