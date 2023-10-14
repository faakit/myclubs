import { Router } from 'express';

import { expressControllerAdapter } from '@/adapters/expressControllerAdapter';
import { makeAssignClientToClubController } from '@/app/controllers/clubs/AssignClientToClubController';
import { makeCreateClubController } from '@/app/controllers/clubs/CreateClubController';
import { Role } from '@/app/enums/Role';
import { authorization } from '@/app/middleware/authorization';
import { schemaValidator } from '@/app/middleware/schemaValidator';
import { assignClientToClubSchema } from '@/app/schemas/clientSchemas';
import { createClubSchema } from '@/app/schemas/clubSchemas';

export const clubRoutes = Router();

clubRoutes.post(
  '/new',
  authorization([Role.SuperAdmin]),
  schemaValidator(createClubSchema),
  expressControllerAdapter(makeCreateClubController),
);

clubRoutes.post(
  '/assign-client',
  authorization([Role.SuperAdmin, Role.Admin]),
  schemaValidator(assignClientToClubSchema),
  expressControllerAdapter(makeAssignClientToClubController),
);
