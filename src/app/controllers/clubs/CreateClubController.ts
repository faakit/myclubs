import { HttpStatusCode } from '@/app/enums/HttpStatusCode';
import { Role } from '@/app/enums/Role';
import { BasicHttpError } from '@/app/errors/BasicHttpError';
import { IController } from '@/app/interfaces/IController';
import { makeCreateClub } from '@/app/services/implementations/clubs/CreateClub';
import { makeTransactionCreator } from '@/app/services/implementations/TransactionCreator';
import { makeCreateUser } from '@/app/services/implementations/users/CreateUser';
import { makeGetUserByEmail } from '@/app/services/implementations/users/GetUserByEmail';
import { ICreateClub } from '@/app/services/interfaces/clubs/ICreateClub';
import { ITransactionCreator } from '@/app/services/interfaces/ITransactionCreator';
import { ICreateUser } from '@/app/services/interfaces/users/ICreateUser';
import { IGetUserByEmail } from '@/app/services/interfaces/users/IGetUserByEmail';
import { HttpRequest } from '@/app/types/HttpRequest';
import { HttpResponse } from '@/app/types/HttpResponse';
import { createdResponse } from '@/app/utils/http';

export namespace CreateClubController {
  export type Request = HttpRequest & {
    body: {
      user: {
        name: string;
        email: string;
        password: string;
      };
      club: {
        name: string;
      };
    };
  };
}

export class CreateClubController implements IController {
  constructor(
    private readonly transactionCreator: ITransactionCreator,
    private readonly createUser: ICreateUser,
    private readonly getUserByEmail: IGetUserByEmail,
    private readonly createClub: ICreateClub,
  ) {}

  async handle(
    httpRequest: CreateClubController.Request,
  ): Promise<HttpResponse> {
    const { user, club } = httpRequest.body;
    const transaction = await this.transactionCreator.run();

    try {
      const { data } = await this.getUserByEmail.run({
        email: user.email,
      });

      if (data) {
        throw new BasicHttpError(
          'EMAIL_ALREADY_REGISTERED',
          HttpStatusCode.BAD_REQUEST,
        );
      }

      const { data: createdUser } = await this.createUser.run({
        user: {
          name: user.name,
          email: user.email,
          password: user.password,
          role: Role.Admin,
        },
        transaction,
      });

      const { data: clubData } = await this.createClub.run({
        club,
        first_admin_id: createdUser.id,
        transaction,
      });

      await transaction.commit();

      return createdResponse({ user: createdUser, club: clubData }, 'club');
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }
}

export const makeCreateClubController = new CreateClubController(
  makeTransactionCreator,
  makeCreateUser,
  makeGetUserByEmail,
  makeCreateClub,
);
