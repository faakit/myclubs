import './setupEnvs';
import './setupModuleAlias';

import { Server } from './server';

const main = async (): Promise<void> => {
  const app = new Server();
  app.listen(process.env.PORT || 9000);
};

main();
