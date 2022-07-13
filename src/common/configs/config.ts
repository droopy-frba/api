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
  userVerification: {
    digits: Number(process.env.USER_VERIFICATION_TOKEN_DIGITS || '0'),
    expirationMinutes: Number(process.env.USER_VERIFICATION_TOKEN_EXPIRATION_MINS || '10'),
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
  },
  email: {
    from: process.env.EMAIL_FROM,
    name: process.env.EMAIL_NAME,
  },
};
