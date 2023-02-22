import {
  SET_PROPERTY_DATA,
  EDIT_PROPERTY_DATA_ERRORS,
  PROPERTY_DATA_EDITED,
  SET_ASBESTOS_STATUSES,
  propertyDataActionTypes,
} from './actions';

const initialState = {
  propertyData: {},
  propertyDataEdited: false,
  asbestosStatuses: [],
};

export const propertyDataReducer = (state = initialState, action: propertyDataActionTypes) => {
  const { type, payload } = action;
  switch (type) {
    case SET_PROPERTY_DATA:
      return {
        ...state,
        propertyData: payload,
      };
    case EDIT_PROPERTY_DATA_ERRORS:
      return {
        ...state,
        editPropertyDataErrors: payload,
      };
    case PROPERTY_DATA_EDITED:
      return {
        ...state,
        propertyDataEdited: payload,
      };
    case SET_ASBESTOS_STATUSES:
      return {
        ...state,
        asbestosStatuses: payload,
      };

    default:
      return state;
  }
};
