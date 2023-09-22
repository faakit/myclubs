import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('user', {
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
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('user');
}
