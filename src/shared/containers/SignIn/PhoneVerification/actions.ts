export const SMS_SENT = 'SMS_SENT';
export const USER_PHONE_UPDATED = 'USER_PHONE_UPDATED';

interface ActionTypes {
  SMS_SENT: boolean;
  USER_PHONE_UPDATED: boolean;
}

export interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type PhoneVerificationTypes = MessageAction;
