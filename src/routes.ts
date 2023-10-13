import { Router } from 'express';

import { clubRoutes } from './routes/clubRoutes';
import { userRoutes } from './routes/userRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/clubs', clubRoutes);

export default routes;
