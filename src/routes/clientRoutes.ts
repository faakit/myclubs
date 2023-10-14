import { Router } from 'express';

import { expressControllerAdapter } from '@/adapters/expressControllerAdapter';
import { makeClientSignUpController } from '@/app/controllers/client/ClientSignUpController';
import { schemaValidator } from '@/app/middleware/schemaValidator';
import { clientSignUpSchema } from '@/app/schemas/clientSchemas';

export const clientRoutes = Router();

clientRoutes.post(
  '/register',
  schemaValidator(clientSignUpSchema),
  expressControllerAdapter(makeClientSignUpController),
);
