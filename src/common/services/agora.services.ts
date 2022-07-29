import { RtcRole, RtcTokenBuilder } from 'agora-access-token';

import { CONFIG } from '@/configs/config';

export const createAgoraUserToken = (channelName: string, user: string, expiration: number, suscriber?: boolean) => {
  return RtcTokenBuilder.buildTokenWithAccount(
    CONFIG.agora.appId,
    CONFIG.agora.appCertificate,
    channelName,
    user,
    suscriber ? RtcRole.SUBSCRIBER : RtcRole.PUBLISHER,
    expiration,
  );
};
