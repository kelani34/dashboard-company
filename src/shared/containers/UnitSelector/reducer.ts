import { SET_UNITS, setUnitActionTypes } from "./actions";

const initialState = {
  units: [],
};

export const unitsReducer = (state = initialState, action: setUnitActionTypes) => {
  switch (action.type) {
    case SET_UNITS:
      // The use of set will remove the duplicates that are returning from the api.
      return {
        ...state,
        units: action.payload,
      };
    default:
      return state;
  }
};
