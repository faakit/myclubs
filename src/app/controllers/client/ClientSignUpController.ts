import { HttpStatusCode } from '@/app/enums/HttpStatusCode';
import { BasicHttpError } from '@/app/errors/BasicHttpError';
import { IController } from '@/app/interfaces/IController';
import { makeCreateClient } from '@/app/services/implementations/clients/CreateClient';
import { makeFindClientByEmailOrDoc } from '@/app/services/implementations/clients/FindClientByEmailOrDoc';
import { makeTransactionCreator } from '@/app/services/implementations/TransactionCreator';
import { ICreateClient } from '@/app/services/interfaces/clients/ICreateClient';
import { IFindClientByEmailOrDoc } from '@/app/services/interfaces/clients/IFindClientByEmailOrDoc';
import { ITransactionCreator } from '@/app/services/interfaces/ITransactionCreator';
import { HttpRequest } from '@/app/types/HttpRequest';
import { HttpResponse } from '@/app/types/HttpResponse';
import { createdResponse } from '@/app/utils/http';

export namespace ClientSignUpController {
  export type Request = HttpRequest & {
    body: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      cpf: string;
    };
  };
}

export class ClientSignUpController implements IController {
  constructor(
    private readonly transactionCreator: ITransactionCreator,
    private readonly createClient: ICreateClient,
    private readonly findClientByEmailOrDoc: IFindClientByEmailOrDoc,
  ) {}

  async handle(
    httpRequest: ClientSignUpController.Request,
  ): Promise<HttpResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password: _, ...client } = httpRequest.body;
    const transaction = await this.transactionCreator.run();

    try {
      const alreadyExists = await this.findClientByEmailOrDoc.run({
        cpf: client.cpf,
        email: client.email,
        transaction,
      });

      if (alreadyExists.data) {
        throw new BasicHttpError(
          'EMAIL_OR_CPF_ALREADY_REGISTERED',
          HttpStatusCode.UNPROCESSABLE_ENTITY,
        );
      }

      const { data } = await this.createClient.run({
        client,
        transaction,
      });

      delete data.password_hash;

      await transaction.commit();

      return createdResponse(data, 'client');
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }
}

export const makeClientSignUpController = new ClientSignUpController(
  makeTransactionCreator,
  makeCreateClient,
  makeFindClientByEmailOrDoc,
);
