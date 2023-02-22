// type
import { PhoneVerificationTypes, SMS_SENT, USER_PHONE_UPDATED } from 'Containers/SignIn/PhoneVerification/actions';

// state
const initialState = { smsSent: false, userPhoneUpdated: false };

export const PhoneVerificationReducer = (state = initialState, action: PhoneVerificationTypes) => {
  switch (action.type) {
    case SMS_SENT:
      return {
        smsSent: action.payload,
      };
    case USER_PHONE_UPDATED:
      return {
        userPhoneUpdated: action.payload,
      };
    default:
      return state;
  }
};
