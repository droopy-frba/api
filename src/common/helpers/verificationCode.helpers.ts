import { CONFIG } from '@/configs/config';

export const generateVerificationCode = () => {
  const { digits } = CONFIG.userVerification;
  const min = 10 ** (digits - 1);
  const max = Number('9'.repeat(digits));
  return {
    code: min + Math.floor(Math.random() * max),
    expiration: new Date(Date.now() + CONFIG.userVerification.expirationMinutes * 60000),
  };
};
