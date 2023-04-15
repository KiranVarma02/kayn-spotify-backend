/**
 * Environments variables declared here.
 */

/* eslint-disable node/no-process-env */


export default {
  NodeEnv: (process.env.NODE_ENV ?? ''),
  Port: (process.env.PORT ?? 0),
  CookieProps: {
    Key: 'ExpressGeneratorTs',
    Secret: (process.env.COOKIE_SECRET ?? ''),
    // Casing to match express cookie options
    Options: {
      httpOnly: true,
      signed: true,
      path: (process.env.COOKIE_PATH ?? ''),
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      domain: (process.env.COOKIE_DOMAIN ?? ''),
      secure: (process.env.SECURE_COOKIE === 'true'),
    },
  },
  Jwt: {
    Secret: (process.env.JWT_SECRET ?? ''),
    Exp: (process.env.COOKIE_EXP ?? ''), // exp at the same time as the cookie
  },
  AppEnv: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REDIRECT_URL: process.env.REDIRECT_URL,
    STATE_KEY: process.env.STATE_KEY,
    TOKEN_URL: process.env.TOKEN_URL,
  }
} as const;
