import {
  ClaimActionTypes,
  CLAIMS,
  CLAIM,
  CLAIM_CREATED,
  CLAIM_UPDATED,
  FETCH_CLAIM_TYPES,
  CLAIM_CREATE_ERRORS,
  CLAIM_DELETED,
} from './actions';

const initialState = {
  claims: [],
  claim: undefined,
  claimCreated: false,
  claimUpdated: false,
  claimTypes: [],
  claimCreateErrors: undefined,
  claimDeleted: false,
};

export const claimsReducer = (state = initialState, action: ClaimActionTypes) => {
  const { type, payload } = action;
  switch (type) {
    case CLAIMS:
      return {
        ...state,
        claims: payload,
      };
    case CLAIM:
      return {
        ...state,
        claim: payload,
      };
    case CLAIM_CREATED:
      return {
        ...state,
        claimCreated: payload,
      };
    case CLAIM_UPDATED:
      return {
        ...state,
        claimUpdated: payload,
      };
    case FETCH_CLAIM_TYPES:
      return {
        ...state,
        claimTypes: payload,
      };
    case CLAIM_CREATE_ERRORS:
      return {
        ...state,
        claimCreateErrors: payload,
      };
    case CLAIM_DELETED:
      return {
        ...state,
        claimDeleted: payload,
      };
    default:
      return state;
  }
};
