// type
import { PhoneVerificationCodeTypes, CODE_VERIFIED } from "Containers/SignIn/PhoneVerificationCode/actions";

// state
const initialState = { codeVerified: false };

export const PhoneVerificationCodeReducer = (state = initialState, action: PhoneVerificationCodeTypes) => {
  switch (action.type) {
    case CODE_VERIFIED:
      return {
        codeVerified: action.payload,
      };
    default:
      return state;
  }
};
