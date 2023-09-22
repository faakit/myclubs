/* eslint-disable import-helpers/order-imports */
import { QueryInterface } from 'sequelize';

import { Role } from '../../../app/enums/Role';
import { User } from '../../../app/models/User';
import { Hashing } from '../../../app/utils/hashing';

import { appConfigs } from '../../../app/configs/appConfigs';

const {
  firstUserEmail: email = 'super@admin.com',
  firstUserPassword = 'super@admin',
} = appConfigs;

export async function up(queryInterface: QueryInterface): Promise<void> {
  const password_hash = await Hashing.parse(firstUserPassword);

  await queryInterface.insert(new User(), 'user', {
    id: 1,
    name: 'Super admin',
    email,
    password_hash,
    role: Role.SuperAdmin,
    created_at: new Date().toISOString(),
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('user');
}
