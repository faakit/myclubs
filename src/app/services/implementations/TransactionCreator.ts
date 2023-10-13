import { Transaction } from 'sequelize';

import sequelize from '@/app/models';

import { ITransactionCreator } from '../interfaces/ITransactionCreator';

export class TransactionCreator implements ITransactionCreator {
  async run(): Promise<Transaction> {
    return sequelize.transaction();
  }
}

export const makeTransactionCreator = new TransactionCreator();
