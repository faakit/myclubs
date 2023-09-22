import '../../setupEnvs';

import { Dialect, OperatorsAliases } from 'sequelize';

const instanceConnectionConfig = process.env.INSTANCE_CONNECTION_NAME
  ? {
      dialectOptions: {
        socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
      },
      host: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    }
  : {};

const storageConfig =
  process.env.DB_DIALECT === 'sqlite'
    ? { storage: './__tests__/database.sqlite' }
    : {};

export = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT as unknown) as number,
  dialect: (process.env.DB_DIALECT || 'mysql') as Dialect,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  operatorsAliases: ('0' as unknown) as OperatorsAliases,
  define: {
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
  ...storageConfig,
  ...instanceConnectionConfig,
};
