import {
  CUSTOM_LEVEL_CREATED,
  CUSTOM_LEVEL_UPDATED,
  CUSTOM_LEVEL_DELETED,
  CREATE_CUSTOM_LEVEL_ERRORS,
  EDIT_CUSTOM_LEVEL_ERRORS,
  customLevels,
} from './actions';

const initialState = {
  customLevelCreated: false,
  customLevelUpdated: false,
  customLevelDeleted: false,
  createCustomLevelErrors: {},
  editCustomLevelErrors: {},
};

export const customLevelReducer = (state = initialState, action: customLevels) => {
  const { type, payload } = action;

  switch (type) {
    case CUSTOM_LEVEL_CREATED:
      return {
        ...state,
        customLevelCreated: payload,
      };
    case CUSTOM_LEVEL_UPDATED:
      return {
        ...state,
        customLevelUpdated: payload,
      };
    case CUSTOM_LEVEL_DELETED:
      return {
        ...state,
        customLevelDeleted: payload,
      };
    case CREATE_CUSTOM_LEVEL_ERRORS:
      return {
        ...state,
        createCustomLevelErrors: payload,
      };
    case EDIT_CUSTOM_LEVEL_ERRORS:
      return {
        ...state,
        editCustomLevelErrors: payload,
      };
    default:
      return state;
  }
};
