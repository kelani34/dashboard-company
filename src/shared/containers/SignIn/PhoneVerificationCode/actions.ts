export const CODE_VERIFIED = "CODE_VERIFIED";

interface ActionTypes {
  CODE_VERIFIED: boolean;
}

export interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type PhoneVerificationCodeTypes = MessageAction;
