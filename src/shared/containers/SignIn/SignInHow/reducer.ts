// types
import { VALIDATE_EMAIL, SET_VALIDATED, GET_BASIC_COMPANY_INFO, EmailTypes, BasicCompanyInfoTypes } from './actions';

// state
const initialEmailCheckState = {
  registered: undefined,
  email: '',
  validated: false,
};
const initialCompanyInfoState = {
  companyId: undefined,
  name: '',
  logoUrl: '',
  countryAlpha: '',
};

export const SignInHowEmailCheckReducer = (state = initialEmailCheckState, action: EmailTypes) => {
  switch (action.type) {
    case VALIDATE_EMAIL:
      const { registered, email } = action.payload;
      return { registered, email };
    // @ts-ignore  We don't need a payload and Typescript wants a type.
    case SET_VALIDATED:
      return {
        ...state,
        validated: action.payload,
      };
    default:
      return state;
  }
};

export const SignInHowCompanyInviteReducer = (state = initialCompanyInfoState, action: BasicCompanyInfoTypes) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BASIC_COMPANY_INFO:
      const { id, name, logo_url: logoUrl, country_alpha_2: countryAlpha } = payload;
      return {
        ...state,
        companyId: id,
        name,
        logoUrl,
        countryAlpha,
      };
    default:
      return state;
  }
};
