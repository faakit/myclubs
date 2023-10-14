import { Router } from 'express';

import { clientRoutes } from './routes/clientRoutes';
import { clubRoutes } from './routes/clubRoutes';
import { userRoutes } from './routes/userRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/clubs', clubRoutes);
routes.use('/clients', clientRoutes);

export default routes;
