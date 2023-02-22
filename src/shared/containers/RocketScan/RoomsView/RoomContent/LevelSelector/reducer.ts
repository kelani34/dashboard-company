import { SET_DEFAULT_LEVEL, SET_LEVEL_TYPES, setLevelActionTypes } from './actions';

const initialState = {
  levels: [],
  defaultLevel: undefined,
};

export const levelTypesReducer = (state = initialState, action: setLevelActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SET_LEVEL_TYPES:
      return {
        ...state,
        levels: payload,
      };
    case SET_DEFAULT_LEVEL:
      return {
        ...state,
        defaultLevel: payload,
      };
    default:
      return state;
  }
};
