import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('client', {
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
  await queryInterface.dropTable('client');
}
