import '../../setupEnvs';

const {
  SECRET,
  NODE_ENV,
  AUTH_TOKEN_LIFE_TIME,
  REFRESH_TOKEN_LIFE_TIME,
  FIRST_USER_EMAIL,
  FIRST_USER_PASSWORD,
} = process.env;

const envs = {
  SECRET,
  NODE_ENV,
  AUTH_TOKEN_LIFE_TIME,
  REFRESH_TOKEN_LIFE_TIME,
};

for (const env in envs) {
  if (!envs[env]) {
    throw new Error(`${env} is not provided`);
  }
}

export const appConfigs = {
  nodeEnv: NODE_ENV,
  secret: SECRET,
  accessTokenLifeTime: Number(AUTH_TOKEN_LIFE_TIME || 86400), // 1 day
  refreshTokenLifeTime: Number(REFRESH_TOKEN_LIFE_TIME || 2592000), // 30 days
  firstUserPassword: FIRST_USER_EMAIL,
  firstUserEmail: FIRST_USER_PASSWORD,
};
