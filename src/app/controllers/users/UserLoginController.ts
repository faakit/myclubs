import { FieldValidationError } from '@/app/errors/FieldValidationError';
import { makeGetUserByEmail } from '@/app/services/implementations/users/GetUserByEmail';
import { IGetUserByEmail } from '@/app/services/interfaces/users/IGetUserByEmail';
import { Hashing } from '@/app/utils/hashing';
import { okResponse } from '@/app/utils/http';
import { JWT } from '@/app/utils/jwt';

import { IController } from '../../interfaces/IController';
import { HttpRequest } from '../../types/HttpRequest';
import { HttpResponse } from '../../types/HttpResponse';

export namespace UserLoginController {
  export type Request = HttpRequest & {
    body: {
      email: string;
      password: string;
    };
  };
}

// STILL MUST SEE THIS LOGIN LATER TO INCLUDE CLUBS

export class UserLoginController implements IController {
  constructor(private readonly getUserByEmailService: IGetUserByEmail) {}

  async handle(
    httpRequest: UserLoginController.Request,
  ): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;

    const { data } = await this.getUserByEmailService.run({
      email,
    });

    if (data) {
      const { password_hash, ...user } = data;
      const matches = await Hashing.match(password, password_hash);

      const club_ids = data.clubs.map(club => club.id);

      delete data.password_hash;

      if (matches) {
        const { access_token, refresh_token } = JWT.sign(
          { id: user.id, admin: club_ids },
          user.role,
        );

        return okResponse({ access_token, refresh_token, user }, 'auth');
      }
    }

    throw new FieldValidationError([
      { field: 'password', message: httpRequest.t('INVALID_CREDENTIALS') },
    ]);
  }
}

export const makeUserLoginController = new UserLoginController(
  makeGetUserByEmail,
);
