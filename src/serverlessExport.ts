import './setupEnvs';
import './setupModuleAlias';

import { Server } from './server';

const server = new Server();
export default server.getExpressInstance();
