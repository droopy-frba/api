import { CONFIG } from '@/configs/config';
import { EMAIL_TEXTS } from '@/constants/email.constants';
import { IEmail } from '@/interfaces/sendgrid.interfaces';

export const generateVerifyUserEmail = (to: string[], token: number): IEmail => {
  return {
    to,
    from: {
      email: CONFIG.email.from,
      name: CONFIG.email.name,
    },
    subject: EMAIL_TEXTS.verifyUser.subject,
    text: EMAIL_TEXTS.verifyUser.text,
    html: `
    <p style="text-align: center;">Tu codigo de verificacion de usuario es:</p>
    <p style="text-align: center; font-size: 45px;"><strong>${token}</strong></p
    `,
  };
};
