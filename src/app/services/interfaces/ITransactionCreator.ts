import { Transaction } from 'sequelize';

export interface ITransactionCreator {
  run(): Promise<Transaction>;
}
