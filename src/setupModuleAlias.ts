import moduleAlias from 'module-alias';
import { resolve } from 'path';

moduleAlias.addAliases({
  '@': __dirname,
  '@tests': resolve(__dirname, '..', '__tests__'),
});
