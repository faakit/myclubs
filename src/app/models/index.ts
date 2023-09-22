import { Sequelize } from 'sequelize';

import config from '../configs/database';

const database = new Sequelize(config);

export default database;
