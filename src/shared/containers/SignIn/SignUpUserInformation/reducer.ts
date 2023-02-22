// type
import {
  UserInformationTypes,
  USER_UPDATED,
  COMPANY_NAME_ERRORS,
  COMPANY_ATTACHED,
} from "Containers/SignIn/SignUpUserInformation/actions";

// state
const initialState = {
  userUpdated: false,
  companyAttached: false,
  companyNameErrors: {},
};

export const UserInformationReducer = (state = initialState, action: UserInformationTypes) => {
  switch (action.type) {
    case USER_UPDATED:
      return {
        ...state,
        userUpdated: action.payload,
      };
    case COMPANY_ATTACHED:
      return {
        ...state,
        companyAttached: action.payload,
      };
    case COMPANY_NAME_ERRORS:
      return {
        ...state,
        companyNameErrors: action.payload,
      };
    default:
      return state;
  }
};
