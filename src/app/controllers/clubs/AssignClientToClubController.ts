import { Role } from '@/app/enums/Role';
import { HttpNotFoundError } from '@/app/errors/HttpNotFoundError';
import { IController } from '@/app/interfaces/IController';
import { makeAssignClientToClub } from '@/app/services/implementations/clubs/AssignClientToClub';
import { makeTransactionCreator } from '@/app/services/implementations/TransactionCreator';
import { IAssignClientToClub } from '@/app/services/interfaces/clubs/IAssignClientToClub';
import { ITransactionCreator } from '@/app/services/interfaces/ITransactionCreator';
import { HttpRequest } from '@/app/types/HttpRequest';
import { HttpResponse } from '@/app/types/HttpResponse';
import { createdResponse } from '@/app/utils/http';

export namespace ClientSignUpController {
  export type Request = HttpRequest & {
    body: {
      club_id: number;
      client_id: number;
      card_number?: string;
    };
  };
}

export class AssignClientToClubController implements IController {
  constructor(
    private readonly transactionCreator: ITransactionCreator,
    private readonly assignClientToClub: IAssignClientToClub,
  ) {}

  async handle(
    httpRequest: ClientSignUpController.Request,
  ): Promise<HttpResponse> {
    const { club_id, card_number, client_id } = httpRequest.body;
    const { admin, role } = httpRequest.headers;
    const transaction = await this.transactionCreator.run();

    if (role === Role.Admin) {
      const isAdmin = admin.includes(String(club_id));

      if (!isAdmin) {
        throw new HttpNotFoundError('Club', 'Clube');
      }
    }

    try {
      const { data } = await this.assignClientToClub.run({
        club_id,
        client_id,
        card_number,
        transaction,
      });

      await transaction.commit();

      return createdResponse(data, 'client_club');
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  }
}

export const makeAssignClientToClubController =
  new AssignClientToClubController(
    makeTransactionCreator,
    makeAssignClientToClub,
  );
