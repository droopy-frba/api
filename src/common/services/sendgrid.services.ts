import { Logger } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';

import { CONFIG } from '@/configs/config';
import { IEmail } from '@/interfaces/sendgrid.interfaces';

sendgrid.setApiKey(CONFIG.sendgrid.apiKey);

const mailerService = async (emailData: IEmail) => {
  try {
    await sendgrid.send(emailData);
    return true;
  } catch (error) {
    Logger.error('Error sending sendgrid email', error);
    throw error;
  }
};

export default mailerService;
