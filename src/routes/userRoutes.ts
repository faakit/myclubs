import { Router } from 'express';

import { expressControllerAdapter } from '@/adapters/expressControllerAdapter';
import { makeUserLoginController } from '@/app/controllers/users/UserLoginController';
import { schemaValidator } from '@/app/middleware/schemaValidator';
import { userLoginSchema } from '@/app/schemas/userSchemas';

export const userRoutes = Router();

userRoutes.post(
  '/login',
  schemaValidator(userLoginSchema),
  expressControllerAdapter(makeUserLoginController),
);
