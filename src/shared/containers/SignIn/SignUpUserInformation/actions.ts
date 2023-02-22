export const USER_UPDATED = "USER_UPDATED";
export const COMPANY_ATTACHED = "COMPANY_ATTACHED";
export const COMPANY_NAME_ERRORS = "COMPANY_NAME_ERRORS";

interface ActionTypes {
  USER_UPDATED: boolean;
  COMPANY_ATTACHED: boolean;
  COMPANY_NAME_ERRORS: object;
}

export interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type UserInformationTypes = MessageAction;
