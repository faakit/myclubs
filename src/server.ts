import 'express-async-errors';

import cors from 'cors';
import express, { Application } from 'express';

import { errorHandler } from './app/middleware/errorHandler';
import { internationalization } from './app/middleware/internationalization';
import { logger } from './app/middleware/logger';
import routes from './routes';

export class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.app.use(errorHandler);
  }

  middlewares(): void {
    if (process.env.NODE_ENV !== 'test') {
      this.app.use(logger);
    }

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(internationalization);
  }

  routes(): void {
    this.app.use(routes);
  }

  listen(port: number | string): void {
    this.app.listen(port);
    console.log('Server run on ' + port);
  }

  getExpressInstance(): Application {
    return this.app;
  }
}
