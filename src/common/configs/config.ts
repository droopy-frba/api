export const CONFIG = {
  env: process.env.NODE_ENV,
  nest: {
    port: process.env.PORT,
    prefix: process.env.PREFIX,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET,
    expiresIn: Number(process.env.EXPIRES_IN || '0'),
  },
};
